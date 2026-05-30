"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { AgentRun } from "../types";
import { CheckCircle2, XCircle, Loader2, ArrowDown, GitBranch, FileText, TestTube, Gauge, Database, GitPullRequest } from "lucide-react";

const statusColors = {
  pending: "text-muted-foreground",
  running: "text-primary",
  completed: "text-success",
  failed: "text-destructive",
};

const agentIcons: Record<string, typeof GitBranch> = {
  GitBranch, GitPullRequest, FileText, TestTube, Gauge, Database,
};

function AgentRunCard({ run }: { run: AgentRun }) {
  const AgentIcon = agentIcons[run.agentIcon] ?? GitBranch;
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="rounded-xl border bg-card transition-all hover:border-primary/20">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg",
          run.status === "success" ? "bg-success/10" :
          run.status === "failed" ? "bg-destructive/10" :
          run.status === "running" ? "bg-primary/10" :
          "bg-muted",
        )}>
          <AgentIcon className={cn(
            "h-5 w-5",
            run.status === "success" ? "text-success" :
            run.status === "failed" ? "text-destructive" :
            run.status === "running" ? "text-primary" :
            "text-muted-foreground",
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{run.agentName}</span>
            <span className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium",
              run.status === "success" ? "bg-success/10 text-success" :
              run.status === "failed" ? "bg-destructive/10 text-destructive" :
              run.status === "running" ? "bg-primary/10 text-primary" :
              "bg-muted text-muted-foreground",
            )}>
              {run.status}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
            <span className="truncate">{run.input}</span>
            <span className="text-[10px] text-muted-foreground/50">·</span>
            <span className="tabular-nums">{run.model}</span>
            <span className="text-[10px] text-muted-foreground/50">·</span>
            <span className="tabular-nums">${run.cost.toFixed(3)}</span>
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground tabular-nums shrink-0">
          {new Date(run.startedAt).toLocaleTimeString("pt-BR")}
        </div>
      </button>

      {expanded && (
        <div className="border-t px-4 py-5">
          {/* Pipeline diagram */}
          <div className="relative flex items-start justify-center gap-0 overflow-x-auto pb-2">
            {run.steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-1.5 min-w-0">
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                    step.status === "completed" ? "border-success bg-success/10" :
                    step.status === "running" ? "border-primary bg-primary/10 animate-pulse-soft" :
                    step.status === "failed" ? "border-destructive bg-destructive/10" :
                    "border-border bg-card",
                  )}>
                    {step.status === "running" ? (
                      <Loader2 className="h-4 w-4 text-primary animate-spin" />
                    ) : step.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : step.status === "failed" ? (
                      <XCircle className="h-4 w-4 text-destructive" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                    )}
                  </div>
                  <div className="text-[10px] font-medium text-center leading-tight max-w-[80px]">
                    {step.label}
                  </div>
                  {step.duration > 0 && (
                    <div className="text-[9px] text-muted-foreground/60 tabular-nums">
                      {step.duration}ms
                    </div>
                  )}
                </div>
                {i < run.steps.length - 1 && (
                  <div className="flex items-center pt-5 px-1">
                    <ArrowDown className={cn(
                      "h-3.5 w-3.5",
                      step.status === "completed" ? "text-success" : "text-muted-foreground/30",
                    )} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Details */}
          {run.steps.some((s) => s.details) && (
            <div className="mt-4 rounded-lg bg-muted/50 p-3 space-y-2">
              {run.steps.filter((s) => s.details).map((s) => (
                <div key={s.id} className="flex items-start gap-2 text-xs">
                  <div className={cn(
                    "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                    statusColors[s.status],
                  )} />
                  <div>
                    <span className="font-medium text-foreground/80">{s.label}:</span>{" "}
                    <span className="text-muted-foreground">{s.details}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {run.error && (
            <div className="mt-3 rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
              {run.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface AgentRunsListProps {
  runs: AgentRun[];
}

export function AgentRunsList({ runs }: AgentRunsListProps) {
  return (
    <div className="space-y-2">
      {runs.map((run) => (
        <AgentRunCard key={run.id} run={run} />
      ))}
    </div>
  );
}
