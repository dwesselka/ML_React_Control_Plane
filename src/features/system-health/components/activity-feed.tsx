"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/format";
import type { ActivityEvent } from "../types";
import {
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  RefreshCw,
  ArrowLeftRight,
  Clock,
} from "lucide-react";

const typeConfig = {
  incident: {
    icon: AlertCircle,
    bg: "bg-destructive/10 text-destructive",
    label: "Incident",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-warning/10 text-warning",
    label: "Warning",
  },
  degraded: {
    icon: ShieldAlert,
    bg: "bg-orange-500/10 text-orange-500",
    label: "Degraded",
  },
  failover: {
    icon: ArrowLeftRight,
    bg: "bg-blue-500/10 text-blue-500",
    label: "Failover",
  },
  retry: {
    icon: RefreshCw,
    bg: "bg-purple-500/10 text-purple-500",
    label: "Retry",
  },
};

const severityBorder = {
  critical: "border-l-destructive",
  high: "border-l-warning",
  medium: "border-l-orange-500",
  low: "border-l-muted-foreground/30",
};

function ActivityItem({ event }: { event: ActivityEvent }) {
  const type = typeConfig[event.type];
  const Icon = type.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-l-4 bg-card p-3 transition-all duration-200 hover:shadow-md",
        severityBorder[event.severity],
      )}
    >
      <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg shrink-0", type.bg)}>
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium truncate">{event.title}</span>
          <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase", type.bg)}>
            {type.label}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{event.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] text-muted-foreground/60">{event.source}</span>
          <span className="text-[11px] text-muted-foreground/40">·</span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(event.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}

interface ActivityFeedProps {
  events: ActivityEvent[];
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <div className="space-y-2">
      {events.map((event) => (
        <ActivityItem key={event.id} event={event} />
      ))}
    </div>
  );
}
