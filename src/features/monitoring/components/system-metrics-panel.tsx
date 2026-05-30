"use client";

import * as React from "react";
import { MetricsTimeSeries } from "./metrics-time-series";
import type { MetricSeries } from "../types";

function generateMockSeries(count: number, baseName: string, baseValue: number, variance: number): MetricSeries[] {
  return Array.from({ length: count }, (_, i) => {
    const now = Date.now();
    const points = Array.from({ length: 40 }, (_, j) => ({
      timestamp: new Date(now - (39 - j) * 60000).toISOString(),
      value: Math.round((baseValue + Math.sin(j * 0.3 + i) * variance + (Math.random() - 0.5) * variance * 0.3) * 10) / 10,
    }));
    return {
      id: `${baseName.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      name: `${baseName} ${i + 1}`,
      data: points,
    };
  });
}

const mockLatencySeries = generateMockSeries(3, "P95 Latency", 120, 40);
const mockThroughputSeries = generateMockSeries(2, "Throughput", 1800, 300);

interface SystemMetricsPanelProps {
  height?: number;
}

export function SystemMetricsPanel({ height }: SystemMetricsPanelProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold mb-1">Latency (P95)</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Response time percentiles across model endpoints
        </p>
        <MetricsTimeSeries series={mockLatencySeries} height={height ?? 260} />
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold mb-1">Throughput</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Requests per second across all providers
        </p>
        <MetricsTimeSeries series={mockThroughputSeries} height={height ?? 260} />
      </div>
    </div>
  );
}
