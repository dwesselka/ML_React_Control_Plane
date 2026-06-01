"use client";

import { useQuery } from "@tanstack/react-query";
import type { SystemHealthData } from "../types";
import { mockSystemHealthData } from "../mocks";

function generateSimulatedData(): SystemHealthData {
  return {
    kpis: mockSystemHealthData.kpis.map((kpi) => ({
      ...kpi,
      value: kpi.label === "Avg Latency"
        ? `${Math.round(25 + Math.random() * 10)}ms`
        : kpi.label === "Requests/min"
          ? `${Math.round(2200 + Math.random() * 500).toLocaleString()}`
          : kpi.label === "Success Rate"
            ? `${(99.8 + Math.random() * 0.2).toFixed(2)}%`
            : kpi.label === "Token Throughput"
              ? `${(11 + Math.random() * 3).toFixed(1)}K/s`
              : kpi.label === "Availability"
                ? `${(99.94 + Math.random() * 0.05).toFixed(2)}%`
                : kpi.value,
      history: [...kpi.history.slice(1), Math.round(20 + Math.random() * 10)],
    })),
    providers: mockSystemHealthData.providers.map((p) => ({
      ...p,
      latency: Math.round(p.latency + (Math.random() - 0.5) * 40),
      throughput: Math.round(p.throughput + (Math.random() - 0.5) * 100),
      tokensPerSecond: Math.round(p.tokensPerSecond + (Math.random() - 0.5) * 400),
      errorRate: Math.max(0, +(p.errorRate + (Math.random() - 0.5) * 0.1).toFixed(2)),
      history: [...p.history.slice(1), Math.round(p.latency + (Math.random() - 0.5) * 40)],
    })),
    infrastructure: mockSystemHealthData.infrastructure.map((inf) => ({
      ...inf,
      usage: Math.min(100, Math.max(0, inf.usage + Math.round((Math.random() - 0.5) * 6))),
    })),
    activity: mockSystemHealthData.activity,
  };
}

export function useSystemHealth(refreshMs = 5000) {
  const { data, isLoading } = useQuery({
    queryKey: ["system-health"],
    queryFn: generateSimulatedData,
    refetchInterval: refreshMs,
    initialData: mockSystemHealthData,
  });

  return { data: data!, isLoading };
}
