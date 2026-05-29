"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sparkline } from "./sparkline";
import type { ProviderHealth, HealthStatus } from "../types";

const statusConfig: Record<HealthStatus, { label: string; dot: string; bg: string }> = {
  healthy: {
    label: "Healthy",
    dot: "bg-success shadow-[0_0_6px] shadow-success/50",
    bg: "bg-success/10 text-success",
  },
  degraded: {
    label: "Degraded",
    dot: "bg-warning shadow-[0_0_6px] shadow-warning/50",
    bg: "bg-warning/10 text-warning",
  },
  down: {
    label: "Down",
    dot: "bg-destructive shadow-[0_0_6px] shadow-destructive/50",
    bg: "bg-destructive/10 text-destructive",
  },
  warning: {
    label: "Warning",
    dot: "bg-orange-500 shadow-[0_0_6px] shadow-orange-500/50",
    bg: "bg-orange-500/10 text-orange-500",
  },
};

function ProviderCard({ provider }: { provider: ProviderHealth }) {
  const s = statusConfig[provider.status];

  return (
    <div className="group rounded-xl border bg-card p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary uppercase">
            {provider.name.slice(0, 2)}
          </div>
          <span className="text-sm font-medium">{provider.name}</span>
        </div>
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium", s.bg)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
          {s.label}
        </span>
      </div>

      <div className="mb-3">
        <Sparkline data={provider.history} color={provider.status === "healthy" ? "hsl(var(--success))" : "hsl(var(--warning))"} height={24} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Latency</span>
          <span className="font-medium tabular-nums">{provider.latency}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Throughput</span>
          <span className="font-medium tabular-nums">{provider.throughput}/s</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tokens/s</span>
          <span className="font-medium tabular-nums">{provider.tokensPerSecond.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Error Rate</span>
          <span className={cn("font-medium tabular-nums", provider.errorRate > 0.2 ? "text-destructive" : "text-success")}>
            {provider.errorRate.toFixed(2)}%
          </span>
        </div>
        <div className="col-span-2 flex justify-between pt-1 border-t border-border/50 mt-1">
          <span className="text-muted-foreground">Requests</span>
          <span className="font-medium tabular-nums">{provider.requestsPerMin.toLocaleString()}/min</span>
        </div>
      </div>
    </div>
  );
}

interface ProviderHealthGridProps {
  providers: ProviderHealth[];
}

export function ProviderHealthGrid({ providers }: ProviderHealthGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
