"use client";

import {
  Box,
  Activity,
  Gauge,
  DollarSign,
  GitBranch,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber, formatLatency, formatPercentage } from "@/lib/format";
import type { ModelRegistrySummary } from "../types";

interface SummaryChipProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  color?: string;
}

function SummaryChip({ icon, label, value, subtext, color }: SummaryChipProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card px-3.5 py-2.5 transition-colors hover:border-primary/20",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg",
          color ?? "bg-primary/10 text-primary",
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold tracking-tight">{value}</span>
        {subtext && (
          <span className="text-[10px] text-muted-foreground">{subtext}</span>
        )}
      </div>
    </div>
  );
}

interface ModelSummaryBarProps {
  summary: ModelRegistrySummary;
}

export function ModelSummaryBar({ summary }: ModelSummaryBarProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      <SummaryChip
        icon={<Box className="h-4 w-4" />}
        label="Total Models"
        value={formatNumber(summary.totalModels)}
        subtext={`${formatNumber(summary.activeModels)} active`}
      />
      <SummaryChip
        icon={<Activity className="h-4 w-4" />}
        label="Active Models"
        value={formatNumber(summary.activeModels)}
        subtext={formatPercentage(summary.activeModels / summary.totalModels * 100, 0)}
        color="bg-success/10 text-success"
      />
      <SummaryChip
        icon={<Gauge className="h-4 w-4" />}
        label="Avg P95 Latency"
        value={formatLatency(summary.avgLatencyP95)}
        subtext="across all models"
        color="bg-info/10 text-info"
      />
      <SummaryChip
        icon={<DollarSign className="h-4 w-4" />}
        label="Monthly Cost"
        value={`$${formatNumber(summary.totalMonthlyCost)}`}
        subtext="estimated"
        color="bg-warning/10 text-warning"
      />
      <SummaryChip
        icon={<GitBranch className="h-4 w-4" />}
        label="In Rollout"
        value={formatNumber(summary.modelsInRollout)}
        subtext="active rollouts"
        color="bg-primary/10 text-primary"
      />
      <SummaryChip
        icon={<AlertTriangle className="h-4 w-4" />}
        label="Failed Deployments"
        value={formatNumber(summary.failedDeployments)}
        subtext="need attention"
        color="bg-destructive/10 text-destructive"
      />
      <SummaryChip
        icon={<FileText className="h-4 w-4" />}
        label="Tokens (30d)"
        value={formatNumber(summary.totalTokens30d)}
        subtext="total throughput"
        color="bg-secondary text-secondary-foreground"
      />
    </div>
  );
}
