"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MetricRowProps {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  color?: "default" | "success" | "destructive" | "warning";
}

const trendIcons = {
  up: "↑",
  down: "↓",
  neutral: "→",
};

const trendColors = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-muted-foreground",
};

const valueColors = {
  default: "text-foreground",
  success: "text-success",
  destructive: "text-destructive",
  warning: "text-warning",
};

export function MetricRow({ label, value, trend, color = "default" }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn("inline-flex items-center gap-1 text-xs font-medium tabular-nums", valueColors[color])}>
        {trend && (
          <span className={cn("text-[10px]", trendColors[trend])}>
            {trendIcons[trend]}
          </span>
        )}
        {value}
      </span>
    </div>
  );
}
