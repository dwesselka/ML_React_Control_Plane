"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProviderModel, ProviderMetricsSummary } from "../types";
import { ProviderCard } from "./provider-card";
import { StatusDot } from "./status-badge";

interface ProviderHealthGridProps {
  providers: ProviderModel[];
  summary: ProviderMetricsSummary;
}

export function ProviderHealthGrid({ providers, summary }: ProviderHealthGridProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <SummaryCard label="Total Providers" value={String(summary.totalProviders)} />
        <SummaryCard
          label="Healthy"
          value={String(summary.healthyCount)}
          className="text-success"
          dot="success"
        />
        <SummaryCard
          label="Degraded"
          value={String(summary.degradedCount)}
          className="text-warning"
          dot="warning"
        />
        <SummaryCard
          label="Total Requests"
          value={summary.totalRequests.toLocaleString()}
        />
        <SummaryCard label="Avg Latency" value={`${summary.avgLatency}ms`} />
        <SummaryCard label="Uptime" value={`${summary.overallUptime.toFixed(2)}%`} />
      </div>

      {/* Provider cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  className,
  dot,
}: {
  label: string;
  value: string;
  className?: string;
  dot?: "success" | "warning" | "destructive";
}) {
  return (
    <div className="rounded-lg border bg-card px-3 py-2.5">
      <div className="flex items-center gap-2 mb-0.5">
        {dot && <StatusDot status={dot === "success" ? "healthy" : dot === "warning" ? "degraded" : "down"} />}
        <span className="text-[11px] text-muted-foreground">{label}</span>
      </div>
      <span className={cn("text-base font-semibold tabular-nums", className)}>
        {value}
      </span>
    </div>
  );
}
