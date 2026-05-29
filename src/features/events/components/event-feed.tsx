"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/format";
import type { RealtimeEvent, EventSeverity, EventCategory } from "../types";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Activity,
  ArrowLeftRight,
  RefreshCw,
  Clock,
  Rocket,
  Box,
  HardDrive,
  Shield,
} from "lucide-react";

const severityConfig: Record<
  EventSeverity,
  { icon: React.ReactNode; border: string; bg: string; label: string }
> = {
  critical: {
    icon: <AlertCircle className="h-4 w-4" />,
    border: "border-l-destructive",
    bg: "bg-destructive/10 text-destructive",
    label: "Critical",
  },
  high: {
    icon: <AlertTriangle className="h-4 w-4" />,
    border: "border-l-warning",
    bg: "bg-warning/10 text-warning",
    label: "High",
  },
  medium: {
    icon: <Activity className="h-4 w-4" />,
    border: "border-l-orange-500",
    bg: "bg-orange-500/10 text-orange-500",
    label: "Medium",
  },
  low: {
    icon: <Info className="h-4 w-4" />,
    border: "border-l-blue-500",
    bg: "bg-blue-500/10 text-blue-500",
    label: "Low",
  },
  info: {
    icon: <Info className="h-4 w-4" />,
    border: "border-l-muted-foreground/30",
    bg: "bg-muted/50 text-muted-foreground",
    label: "Info",
  },
};

const categoryIcon: Record<EventCategory, React.ReactNode> = {
  latency: <Clock className="h-3 w-3" />,
  failover: <ArrowLeftRight className="h-3 w-3" />,
  retry: <RefreshCw className="h-3 w-3" />,
  timeout: <AlertCircle className="h-3 w-3" />,
  queue: <Activity className="h-3 w-3" />,
  degraded: <AlertTriangle className="h-3 w-3" />,
  deployment: <Rocket className="h-3 w-3" />,
  model: <Box className="h-3 w-3" />,
  resource: <HardDrive className="h-3 w-3" />,
  security: <Shield className="h-3 w-3" />,
};

const categoryLabel: Record<EventCategory, string> = {
  latency: "Latency",
  failover: "Failover",
  retry: "Retry",
  timeout: "Timeout",
  queue: "Queue",
  degraded: "Degraded",
  deployment: "Deploy",
  model: "Model",
  resource: "Resource",
  security: "Security",
};

interface EventItemProps {
  event: RealtimeEvent;
  onAcknowledge: (id: string) => void;
}

function EventItem({ event, onAcknowledge }: EventItemProps) {
  const sev = severityConfig[event.severity];

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 rounded-lg border border-l-4 bg-card p-3 transition-all duration-300",
        "animate-in slide-in-from-left-2 fade-in duration-300",
        sev.border,
        event.acknowledged && "opacity-60",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg shrink-0",
          sev.bg,
        )}
      >
        {sev.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-sm font-medium truncate">{event.title}</span>
          <span
            className={cn(
              "shrink-0 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
              sev.bg,
            )}
          >
            {sev.label}
          </span>
          <span className="shrink-0 text-[10px] text-muted-foreground/60">
            {event.provider}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {event.description}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/50">
            {categoryIcon[event.category]}
            {categoryLabel[event.category]}
          </span>
          <span className="text-[10px] text-muted-foreground/30">·</span>
          <span className="text-[10px] text-muted-foreground/50">
            {formatRelativeTime(event.timestamp)}
          </span>

          {!event.acknowledged && (
            <button
              onClick={() => onAcknowledge(event.id)}
              className="ml-auto text-[10px] text-primary/60 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
            >
              Acknowledge
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface EventFeedProps {
  events: RealtimeEvent[];
  onAcknowledge: (id: string) => void;
  onAcknowledgeAll: () => void;
  latestRef: React.RefObject<HTMLDivElement | null>;
}

export function EventFeed({
  events,
  onAcknowledge,
  onAcknowledgeAll,
  latestRef,
}: EventFeedProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">
          {events.filter((e) => !e.acknowledged).length} unacknowledged
        </span>
        <button
          onClick={onAcknowledgeAll}
          className="text-xs text-primary hover:text-primary/80 transition-colors"
        >
          Acknowledge all
        </button>
      </div>
      <div className="space-y-2" ref={latestRef}>
        {events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            onAcknowledge={onAcknowledge}
          />
        ))}
      </div>
    </div>
  );
}

export function EventFeedSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg border bg-card p-3 animate-pulse"
        >
          <div className="h-8 w-8 rounded-lg bg-primary/5 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
              <div className="h-4 w-48 bg-primary/5 rounded" />
              <div className="h-4 w-14 bg-primary/5 rounded-full" />
            </div>
            <div className="h-3 w-64 bg-primary/5 rounded" />
            <div className="flex gap-3">
              <div className="h-3 w-16 bg-primary/5 rounded" />
              <div className="h-3 w-20 bg-primary/5 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
