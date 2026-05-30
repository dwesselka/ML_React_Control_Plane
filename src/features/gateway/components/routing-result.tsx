"use client";

import * as React from "react";
import { CheckCircle, Zap, DollarSign, Cpu, BarChart3, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlaygroundResponse } from "../types";

const providerIcons: Record<string, typeof Cpu> = {
  "deepseek-v4": BrainCircuit,
  "gpt-4o": Zap,
  "claude-4": BarChart3,
};

interface RoutingResultProps {
  response: PlaygroundResponse;
}

export function RoutingResult({ response }: RoutingResultProps) {
  const { analysis, decision, traces, output } = response;
  const ProviderIcon = providerIcons[decision.selectedProvider] ?? Cpu;

  return (
    <div className="space-y-4 animate-in">
      {/* Request Analysis */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-primary" />
          Request Analysis
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <div className="text-[11px] text-muted-foreground">Task Type</div>
            <div className="text-sm font-medium capitalize mt-0.5">{analysis.taskType.replace("_", " ")}</div>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">Complexity</div>
            <div className="text-sm font-medium capitalize mt-0.5">{analysis.complexity}</div>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">Est. Cost</div>
            <div className="text-sm font-medium mt-0.5 tabular-nums">${analysis.estimatedCost.toFixed(3)}</div>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">Est. Latency</div>
            <div className="text-sm font-medium mt-0.5 tabular-nums">{analysis.estimatedLatency}ms</div>
          </div>
        </div>
      </div>

      {/* Routing Decision */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <CheckCircle className="h-4 w-4 text-success" />
          Routing Decision
        </h3>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ProviderIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-medium flex items-center gap-2">
              {decision.selectedProvider.replace("-", " ").toUpperCase()}
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                {(decision.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{decision.reasoning}</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-[11px] text-muted-foreground font-medium">Alternatives</div>
          {decision.alternatives.map((alt, i) => {
            const AltIcon = providerIcons[alt.provider] ?? Cpu;
            return (
              <div key={i} className="flex items-center gap-2.5 rounded-lg bg-muted/50 p-2.5">
                <AltIcon className="h-3.5 w-3.5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium">{alt.provider.replace("-", " ").toUpperCase()}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{alt.reason}</div>
                </div>
                <div className={cn(
                  "text-[11px] tabular-nums font-medium",
                  alt.costDiff > 0 ? "text-destructive" : "text-success",
                )}>
                  {alt.costDiff > 0 ? "+" : ""}${Math.abs(alt.costDiff).toFixed(3)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-primary" />
          Timeline
        </h3>
        <div className="relative space-y-0">
          {traces.map((event, i) => {
            const time = new Date(event.timestamp);
            return (
              <div key={i} className="flex gap-3 pb-3 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "h-2 w-2 rounded-full mt-1.5",
                    event.status === "completed" ? "bg-success" : "bg-muted-foreground",
                  )} />
                  {i < traces.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{event.label}</span>
                    <span className="text-[10px] text-muted-foreground tabular-nums">
                      {time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{event.description}</div>
                  {event.duration > 0 && (
                    <div className="text-[10px] text-muted-foreground/60 mt-0.5 tabular-nums">
                      +{event.duration}ms
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Output */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <DollarSign className="h-4 w-4 text-primary" />
          Generated Output
        </h3>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
          <code>{output}</code>
        </pre>
      </div>
    </div>
  );
}
