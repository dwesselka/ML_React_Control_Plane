"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { MetricSeries } from "../types";

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

function formatTimestamp(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

interface MetricsTimeSeriesProps {
  series: MetricSeries[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  timeFormatter?: (ts: string) => string;
}

export function MetricsTimeSeries({
  series,
  height = 300,
  showGrid = true,
  showLegend = true,
  timeFormatter = formatTimestamp,
}: MetricsTimeSeriesProps) {
  const mergedData = React.useMemo(() => {
    const timestamps = new Set<string>();
    series.forEach((s) => s.data.forEach((p) => timestamps.add(p.timestamp)));
    const sorted = Array.from(timestamps).sort();
    return sorted.map((ts) => {
      const point: Record<string, string | number | null> = { timestamp: ts };
      series.forEach((s) => {
        const match = s.data.find((p) => p.timestamp === ts);
        point[s.name] = match?.value ?? null;
      });
      return point;
    });
  }, [series]);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={mergedData}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
        )}
        <XAxis
          dataKey="timestamp"
          tickFormatter={timeFormatter}
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
            fontSize: 12,
          }}
          labelFormatter={(label) =>
            typeof label === "string" ? timeFormatter(label) : label
          }
        />
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            iconType="circle"
            iconSize={6}
          />
        )}
        {series.map((s, i) => (
          <Line
            key={s.id}
            type="monotone"
            dataKey={s.name}
            stroke={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
