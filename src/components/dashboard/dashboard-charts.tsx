"use client";

import * as React from "react";
import { SystemMetricsPanel, ProviderLatencyChart } from "@/features/monitoring";
import { useSystemHealth } from "@/features/system-health";

export function DashboardCharts() {
  const { data } = useSystemHealth(10000);

  const providerLatencyData = React.useMemo(
    () =>
      data.providers.map((p) => ({
        name: p.name,
        latency: p.latency,
        status: p.status,
      })),
    [data.providers],
  );

  return (
    <div className="grid gap-6 px-6 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <SystemMetricsPanel />
      </div>
      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold mb-1">Provider Latency</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Real-time latency by provider
        </p>
        <ProviderLatencyChart data={providerLatencyData} />
      </div>
    </div>
  );
}
