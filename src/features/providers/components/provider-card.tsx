"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProviderModel } from "../types";
import { StatusBadge } from "./status-badge";
import { MetricRow } from "./metric-row";

function Sparkline({ data, color = "hsl(var(--primary))", height = 28 }: { data: number[]; color?: string; height?: number }) {
  const width = 72;
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p}`).join(" ");

  return (
    <svg width={width} height={height} className="shrink-0 overflow-visible">
      <defs>
        <linearGradient id={`sparkline-grad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={`${pathD} L${width},${height} L0,${height} Z`} fill={`url(#sparkline-grad)`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1]!.split(",")[0]} cy={points[points.length - 1]!.split(",")[1]} r="2" fill={color} stroke="hsl(var(--background))" strokeWidth="1.5" />
    </svg>
  );
}

const iconLabels: Record<string, string> = {
  brain: "🧠",
  sparkles: "✨",
  sparkle: "⭐",
  container: "📦",
  search: "🔍",
};

interface ProviderCardProps {
  provider: ProviderModel;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-card p-5 transition-all duration-200",
        "hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg">
            {iconLabels[provider.icon] ?? "🤖"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{provider.name}</span>
              <span className="text-[10px] text-muted-foreground">{provider.region}</span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {provider.modelCount} models
            </span>
          </div>
        </div>
        <StatusBadge status={provider.status} />
      </div>

      {/* Sparkline */}
      <div className="mb-3 flex justify-center">
        <Sparkline
          data={provider.history}
          color={
            provider.status === "healthy"
              ? "hsl(var(--success))"
              : "hsl(var(--warning))"
          }
        />
      </div>

      {/* Metrics grid */}
      <div className="space-y-0.5">
        <MetricRow
          label="Requests/min"
          value={provider.requestsPerMin.toLocaleString()}
          trend={
            provider.requestsPerMin > 2000 ? "up" : provider.requestsPerMin < 1000 ? "down" : "neutral"
          }
        />
        <MetricRow
          label="Avg Latency"
          value={`${provider.avgLatency}ms`}
          trend={provider.avgLatency > 500 ? "down" : "up"}
          color={provider.avgLatency > 500 ? "warning" : provider.avgLatency > 300 ? "default" : "success"}
        />
        <MetricRow
          label="Throughput"
          value={`${provider.throughput}/s`}
          trend={provider.throughput > 1000 ? "up" : "down"}
        />
        <MetricRow
          label="Tokens/s"
          value={provider.tokensPerSecond.toLocaleString()}
          trend={provider.tokensPerSecond > 4000 ? "up" : "neutral"}
        />
        <MetricRow
          label="Fallback Rate"
          value={`${provider.fallbackRate.toFixed(1)}%`}
          trend={provider.fallbackRate > 2 ? "down" : "up"}
          color={provider.fallbackRate > 3 ? "destructive" : provider.fallbackRate > 1 ? "warning" : "success"}
        />
        <MetricRow
          label="Error Rate"
          value={`${provider.errorRate.toFixed(2)}%`}
          trend={provider.errorRate > 0.2 ? "down" : "up"}
          color={provider.errorRate > 0.3 ? "destructive" : provider.errorRate > 0.1 ? "warning" : "success"}
        />
        <div className="border-t border-border/50 pt-1.5 mt-1.5">
          <MetricRow
            label="Uptime"
            value={`${provider.uptime.toFixed(2)}%`}
            trend={provider.uptime > 99.9 ? "up" : provider.uptime > 99 ? "neutral" : "down"}
            color={provider.uptime > 99.9 ? "success" : provider.uptime > 99 ? "default" : "destructive"}
          />
        </div>
      </div>
    </div>
  );
}
