"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

interface ProviderLatencyItem {
  name: string;
  latency: number;
  status: "healthy" | "degraded" | "down" | "warning";
}

const statusColors: Record<string, string> = {
  healthy: "hsl(var(--success))",
  degraded: "hsl(var(--warning))",
  down: "hsl(var(--destructive))",
  warning: "hsl(24 95% 53%)",
};

interface ProviderLatencyChartProps {
  data: ProviderLatencyItem[];
  height?: number;
}

export function ProviderLatencyChart({
  data,
  height = 250,
}: ProviderLatencyChartProps) {
  const sorted = React.useMemo(
    () => [...data].sort((a, b) => b.latency - a.latency),
    [data],
  );

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={sorted} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
          horizontal={false}
        />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={false}
          unit="ms"
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          width={80}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
            fontSize: 12,
          }}
          formatter={(value) => [`${value}ms`, "Latency"]}
        />
        <Bar dataKey="latency" radius={[0, 4, 4, 0]} maxBarSize={20}>
          {sorted.map((entry, i) => (
            <Cell key={i} fill={statusColors[entry.status] ?? "hsl(var(--muted-foreground))"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
