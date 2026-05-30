"use client";

import * as React from "react";
import {
  Box,
  Zap,
  Activity,
  CheckCircle,
  GitMerge,
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { KpiMetric } from "../types";
import { Sparkline } from "./sparkline";

const iconMap: Record<string, React.ReactNode> = {
  Box: <Box className="h-4 w-4" />,
  Zap: <Zap className="h-4 w-4" />,
  Activity: <Activity className="h-4 w-4" />,
  CheckCircle: <CheckCircle className="h-4 w-4" />,
  GitMerge: <GitMerge className="h-4 w-4" />,
  Shield: <Shield className="h-4 w-4" />,
};

const trendIcons = {
  up: <TrendingUp className="h-3 w-3 text-success" />,
  down: <TrendingDown className="h-3 w-3 text-destructive" />,
  stable: <Minus className="h-3 w-3 text-muted-foreground" />,
};

const trendColors = {
  up: "text-success",
  down: "text-destructive",
  stable: "text-muted-foreground",
};

function KpiCard({ kpi }: { kpi: KpiMetric }) {
  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") e.preventDefault(); }}
      className="group rounded-xl border bg-card p-5 transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {kpi.label}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {iconMap[kpi.icon]}
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-2xl font-bold tracking-tight">{kpi.value}</span>
        <span className={cn("flex items-center gap-0.5 text-xs font-medium", trendColors[kpi.trend])}>
          {trendIcons[kpi.trend]}
          {kpi.change}
        </span>
      </div>

      <Sparkline data={kpi.history} height={28} />
    </div>
  );
}

interface KPICardsProps {
  kpis: KpiMetric[];
}

export function KPICards({ kpis }: KPICardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </div>
  );
}
