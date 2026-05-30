"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProviderStatus } from "../types";

const pulseColors: Record<ProviderStatus, string> = {
  healthy:
    "bg-success shadow-[0_0_0px] shadow-success/50 animate-pulse-soft",
  degraded:
    "bg-warning shadow-[0_0_0px] shadow-warning/50 animate-pulse-soft",
  down: "bg-destructive",
  warning:
    "bg-orange-500 shadow-[0_0_0px] shadow-orange-500/50 animate-pulse-soft",
};

const bgColors: Record<ProviderStatus, string> = {
  healthy: "bg-success/10 text-success",
  degraded: "bg-warning/10 text-warning",
  down: "bg-destructive/10 text-destructive",
  warning: "bg-orange-500/10 text-orange-500",
};

const labels: Record<ProviderStatus, string> = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
  warning: "Warning",
};

interface StatusDotProps {
  status: ProviderStatus;
}

export function StatusDot({ status }: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        pulseColors[status],
      )}
    />
  );
}

interface StatusBadgeProps {
  status: ProviderStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        bgColors[status],
        className,
      )}
    >
      <StatusDot status={status} />
      {labels[status]}
    </span>
  );
}
