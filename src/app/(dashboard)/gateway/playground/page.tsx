"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PlaygroundForm } from "@/features/gateway/components/playground-form";
import { RoutingResult } from "@/features/gateway/components/routing-result";
import { mockPlaygroundResponse } from "@/features/gateway/mocks";
import type { RouterStrategy, PlaygroundResponse } from "@/features/gateway/types";
import { Sparkles, History } from "lucide-react";

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
            <Skeleton className="h-3 w-4/5" />
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
  const [history, setHistory] = React.useState<{ prompt: string; id: string }[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSimulate = React.useCallback((prompt: string, _strategy: RouterStrategy) => {
    setLoading(true);
    setResponse(null);

    setTimeout(() => {
      const result = mockPlaygroundResponse(prompt);
      setResponse(result);
      setLoading(false);
      setHistory((prev) => [{ prompt, id: result.id }, ...prev].slice(0, 10));
    }, 1200);
  }, []);

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
              <div className="flex items-center justify-center rounded-xl border bg-card p-12">
                <div className="flex flex-col items-center gap-3">
                  <Sparkles className="h-8 w-8 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground">Analyzing request and simulating routing...</p>
                </div>
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
