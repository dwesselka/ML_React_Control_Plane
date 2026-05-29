"use client";

import * as React from "react";
import type { ProviderHealthData } from "../types";
import { mockProviderHealthData } from "../mocks";

function simulateProviderData(data: ProviderHealthData): ProviderHealthData {
  return {
    ...data,
    summary: {
      ...data.summary,
      avgLatency: Math.round(data.summary.avgLatency + (Math.random() - 0.5) * 20),
      totalRequests: data.summary.totalRequests + Math.round(Math.random() * 50),
    },
    providers: data.providers.map((p) => ({
      ...p,
      requestsPerMin: Math.round(p.requestsPerMin + (Math.random() - 0.5) * 80),
      avgLatency: Math.round(p.avgLatency + (Math.random() - 0.5) * 30),
      throughput: Math.round(p.throughput + (Math.random() - 0.5) * 40),
      tokensPerSecond: Math.round(p.tokensPerSecond + (Math.random() - 0.5) * 200),
      errorRate: Math.max(0, +(p.errorRate + (Math.random() - 0.5) * 0.05).toFixed(2)),
      history: [...p.history.slice(1), Math.round(p.avgLatency + (Math.random() - 0.5) * 30)],
    })),
  };
}

export function useProviderHealth(refreshMs = 4000) {
  const [data, setData] = React.useState<ProviderHealthData>(mockProviderHealthData);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => simulateProviderData(prev));
    }, refreshMs);
    return () => clearInterval(interval);
  }, [refreshMs]);

  return { data };
}
