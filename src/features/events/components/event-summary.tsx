"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { EventSummary } from "../types";
import { AlertCircle, AlertTriangle, Activity, Info } from "lucide-react";

const summarySeverityIcons: Record<string, React.ReactNode> = {
  critical: <AlertCircle className="h-3.5 w-3.5" />,
  high: <AlertTriangle className="h-3.5 w-3.5" />,
  medium: <Activity className="h-3.5 w-3.5" />,
  info: <Info className="h-3.5 w-3.5" />,
};

interface EventSummaryBarProps {
  summary: EventSummary;
}

export function EventSummaryBar({ summary }: EventSummaryBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <SummaryChip label="All" value={summary.total} active />
      <SummaryChip
        label="Critical"
        value={summary.critical}
        icon={summarySeverityIcons.critical}
        className="text-destructive border-destructive/20"
      />
      <SummaryChip
        label="High"
        value={summary.high}
        icon={summarySeverityIcons.high}
        className="text-warning border-warning/20"
      />
      <SummaryChip
        label="Medium"
        value={
          Object.entries(summary.byCategory).reduce(
            (acc, [_, v]) => acc + (v ?? 0),
            0,
          ) -
          summary.critical -
          summary.high
        }
        icon={summarySeverityIcons.medium}
        className="text-orange-500 border-orange-500/20"
      />
      <SummaryChip
        label="Unacknowledged"
        value={summary.unacknowledged}
        className="text-primary border-primary/20"
      />
    </div>
  );
}

function SummaryChip({
  label,
  value,
  icon,
  className,
  active,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border bg-card px-2.5 py-1.5 text-xs font-medium transition-colors",
        active && "border-primary/30 bg-primary/5",
        className,
      )}
    >
      {icon}
      <span>{label}</span>
      <span className="font-bold tabular-nums">{value}</span>
    </div>
  );
}
