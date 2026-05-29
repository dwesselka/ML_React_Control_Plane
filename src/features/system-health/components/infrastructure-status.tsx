"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { InfrastructureComponent, HealthStatus } from "../types";
import { Cpu, RefreshCw, Database, FileStack, Zap } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  gpu: <Cpu className="h-4 w-4" />,
  queue: <RefreshCw className="h-4 w-4" />,
  cache: <Database className="h-4 w-4" />,
  "vector-db": <FileStack className="h-4 w-4" />,
  inference: <Zap className="h-4 w-4" />,
};

const typeColors: Record<string, string> = {
  gpu: "bg-purple-500/10 text-purple-500",
  queue: "bg-blue-500/10 text-blue-500",
  cache: "bg-amber-500/10 text-amber-500",
  "vector-db": "bg-emerald-500/10 text-emerald-500",
  inference: "bg-rose-500/10 text-rose-500",
};

const statusConfig: Record<HealthStatus, string> = {
  healthy: "bg-success",
  degraded: "bg-warning",
  down: "bg-destructive",
  warning: "bg-orange-500",
};

function InfrastructureCard({ component }: { component: InfrastructureComponent }) {
  const usageColor =
    component.usage > 85 ? "bg-destructive" : component.usage > 70 ? "bg-warning" : "bg-success";

  return (
    <div className="group rounded-xl border bg-card p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", typeColors[component.type])}>
            {iconMap[component.type]}
          </div>
          <span className="text-sm font-medium">{component.name}</span>
        </div>
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium", statusConfig[component.status])}>
          <span className={cn("h-1.5 w-1.5 rounded-full shadow-[0_0_6px]", statusConfig[component.status])} />
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Usage</span>
          <span className="font-medium tabular-nums">{component.usage}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", usageColor)}
            style={{ width: `${component.usage}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Capacity</span>
          <span className="font-medium">{component.capacity}</span>
        </div>
      </div>

      <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
        {component.description}
      </p>
    </div>
  );
}

interface InfrastructureStatusProps {
  components: InfrastructureComponent[];
}

export function InfrastructureStatus({ components }: InfrastructureStatusProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {components.map((component) => (
        <InfrastructureCard key={component.id} component={component} />
      ))}
    </div>
  );
}
