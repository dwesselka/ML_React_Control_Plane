"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PlaygroundForm } from "@/features/gateway/components/playground-form";
import { RoutingResult } from "@/features/gateway/components/routing-result";
import { mockPlaygroundResponse } from "@/features/gateway/mocks";
import type { RouterStrategy, PlaygroundResponse } from "@/features/gateway/types";
import { History, XCircle, Loader2, CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

const STAGES = [
  { key: "analyzing", label: "Analyzing request" },
  { key: "routing", label: "Routing to provider" },
  { key: "generating", label: "Generating response" },
] as const;

type Stage = (typeof STAGES)[number]["key"];

function PlaygroundSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-6 space-y-1.5">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3 px-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <Skeleton className="h-20 w-full rounded-lg" />
            <div className="grid gap-2 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-xl border bg-card p-4 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="rounded-xl border bg-card p-4 space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w/5" />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  const [mounted, setMounted] = React.useState(false);
  const [response, setResponse] = React.useState<PlaygroundResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [cancelled, setCancelled] = React.useState(false);
  const [stage, setStage] = React.useState<Stage | null>(null);
  const [streamingOutput, setStreamingOutput] = React.useState("");
  const [history, setHistory] = useLocalStorage<{ prompt: string; id: string }[]>("playground-history", []);
  const cancelRef = React.useRef(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cleanup = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  }, []);

  const handleCancel = React.useCallback(() => {
    cancelRef.current = true;
    cleanup();
    setLoading(false);
    setStage(null);
    setCancelled(true);
    toast.error("Request cancelled");
  }, [cleanup]);

  const handleSimulate = React.useCallback((prompt: string, _strategy: RouterStrategy) => {
    cancelRef.current = false;
    setCancelled(false);
    setLoading(true);
    setResponse(null);
    setStreamingOutput("");
    cleanup();
    toast.info("Routing request...");

    setTimeout(() => {
      if (cancelRef.current) return;
      setStage("analyzing");
    }, 50);

    setTimeout(() => {
      if (cancelRef.current) return;
      setStage("routing");
    }, 400);

    setTimeout(() => {
      if (cancelRef.current) return;
      setStage("generating");

      const result = mockPlaygroundResponse(prompt);
      const fullOutput = result.output;
      let idx = 0;

      intervalRef.current = setInterval(() => {
        if (cancelRef.current) { cleanup(); return; }
        idx += 3;
        if (idx >= fullOutput.length) {
          idx = fullOutput.length;
          cleanup();
          setStreamingOutput(fullOutput);
          setLoading(false);
          setStage(null);
          setResponse(result);
          toast.success(`Response received from ${result.decision.selectedProvider} (${result.analysis.estimatedLatency}ms)`);
          setHistory((prev) => [{ prompt, id: result.id }, ...prev].slice(0, 10));
          return;
        }
        setStreamingOutput(fullOutput.slice(0, idx));
      }, 30);
    }, 800);
  }, [cleanup]);

  if (!mounted) {
    return (
      <WorkspaceContainer>
        <PlaygroundSkeleton />
      </WorkspaceContainer>
    );
  }

  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="AI Playground"
          text="Test prompts and simulate routing decisions across providers"
        />

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-6">
            <PlaygroundForm onSimulate={handleSimulate} loading={loading} />

            {loading && (
              <div className="rounded-xl border bg-card p-6 space-y-5">
                <div className="space-y-3">
                  {STAGES.map((s) => {
                    const isActive = stage === s.key;
                    const isDone =
                      (stage === "routing" && s.key === "analyzing") ||
                      (stage === "generating" && (s.key === "analyzing" || s.key === "routing"));
                    return (
                      <div key={s.key} className="flex items-center gap-3">
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        ) : isActive ? (
                          <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                        )}
                        <span className={cn(
                          "text-sm",
                          isDone ? "text-muted-foreground" : isActive ? "text-foreground font-medium" : "text-muted-foreground/50",
                        )}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {stage === "generating" && streamingOutput && (
                  <div className="rounded-lg bg-muted p-4">
                    <pre className="text-xs leading-relaxed whitespace-pre-wrap">
                      <code>{streamingOutput}</code>
                      <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse" />
                    </pre>
                  </div>
                )}

                <button
                  onClick={handleCancel}
                  className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Cancel
                </button>
              </div>
            )}

            {cancelled && !loading && !response && (
              <div className="flex items-center justify-center rounded-xl border border-dashed bg-card p-12">
                <p className="text-sm text-muted-foreground">Request was cancelled. Try again with a new prompt.</p>
              </div>
            )}

            {response && !loading && <RoutingResult response={response} />}
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-xs font-semibold flex items-center gap-2 mb-3">
                <History className="h-3.5 w-3.5" />
                Recent Requests
              </h3>
              {history.length === 0 ? (
                <p className="text-xs text-muted-foreground">No requests yet. Try typing a prompt!</p>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-muted-foreground">Showing 10 most recent requests</p>
                    <button
                      onClick={() => setHistory([])}
                      className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                      Clear
                    </button>
                  </div>
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        const prompt = item.prompt;
                        handleSimulate(prompt, "auto");
                      }}
                      className="w-full rounded-lg px-2.5 py-2 text-left text-xs hover:bg-muted transition-colors"
                    >
                      <div className="truncate font-medium">{item.prompt}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.id}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border bg-card p-4 text-xs text-muted-foreground space-y-2">
              <h3 className="text-xs font-semibold text-foreground">About</h3>
              <p>
                The AI Playground simulates request routing across multiple LLM providers.
                Responses are simulated — no real API calls are made.
              </p>
              <p>
                Use this to test routing strategies before deploying to production.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </WorkspaceContainer>
  );
}
