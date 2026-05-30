"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { RequestTrace, TraceStatus } from "../types";

const statusConfig: Record<TraceStatus, { label: string; dot: string }> = {
  pending: { label: "Pending", dot: "bg-muted-foreground/40" },
  classified: { label: "Classified", dot: "bg-info" },
  routed: { label: "Routed", dot: "bg-primary" },
  streaming: { label: "Streaming", dot: "bg-warning" },
  completed: { label: "Completed", dot: "bg-success" },
  failed: { label: "Failed", dot: "bg-destructive" },
};

interface TracesTableProps {
  traces: RequestTrace[];
}

export function TracesTable({ traces }: TracesTableProps) {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  return (
    <div className="space-y-2">
      {traces.map((trace) => {
        const s = statusConfig[trace.status];
        const isExpanded = expanded === trace.id;

        return (
          <div key={trace.id} className="rounded-xl border bg-card transition-all hover:border-primary/20">
            <button
              onClick={() => setExpanded(isExpanded ? null : trace.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(isExpanded ? null : trace.id); } }}
              className="flex w-full items-center gap-4 p-4 text-left"
              aria-expanded={isExpanded}
            >
              <div className={cn("h-2 w-2 shrink-0 rounded-full", s.dot)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">{trace.promptPreview}</span>
                  <span className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                    s.dot.replace("bg-", "bg-/10 text-").replace("bg-", ""),
                  )}>
                    {s.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground">
                  <span className="capitalize">{trace.taskType.replace("_", " ")}</span>
                  <span>{trace.selectedProvider.replace("-", " ").toUpperCase()}</span>
                  <span className="tabular-nums">{trace.latency}ms</span>
                  <span className="tabular-nums">${trace.cost.toFixed(3)}</span>
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground tabular-nums shrink-0">
                {new Date(trace.timestamp).toLocaleTimeString("pt-BR")}
              </div>
            </button>

            {isExpanded && (
              <div className="border-t px-4 py-3">
                <div className="relative space-y-0 pl-4">
                  {trace.events.map((event, i) => (
                    <div key={i} className="flex gap-3 pb-2.5 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 mt-1" />
                        {i < trace.events.length - 1 && <div className="w-px flex-1 bg-border" />}
                      </div>
                      <div>
                        <div className="text-xs font-medium">{event.label}</div>
                        <div className="text-[10px] text-muted-foreground">
                          +{event.duration}ms
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
