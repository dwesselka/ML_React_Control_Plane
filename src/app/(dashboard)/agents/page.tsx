"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { AgentRunsList } from "@/features/agents/components/agent-runs-list";
import { mockAgentRuns, mockAgents } from "@/features/agents/mocks";
import { Cpu, BarChart3 } from "lucide-react";

function AgentsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-6 space-y-1.5">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid gap-4 px-6 grid-cols-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-12" />
          </div>
        ))}
      </div>
      <div className="px-6 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-64" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const totalCost = React.useMemo(
    () => mockAgentRuns.reduce((acc, r) => acc + r.cost, 0),
    [],
  );
  const successCount = React.useMemo(
    () => mockAgentRuns.filter((r) => r.status === "success").length,
    [],
  );

  if (!mounted) {
    return (
      <WorkspaceContainer>
        <AgentsSkeleton />
      </WorkspaceContainer>
    );
  }

  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Agent Runs"
          text="Monitor and review autonomous AI agent executions"
        />

        {/* Stats */}
        <div className="grid gap-4 px-6 grid-cols-3 sm:grid-cols-4">
          {[
            { label: "Total Runs", value: mockAgentRuns.length.toString(), icon: Cpu },
            { label: "Successful", value: successCount.toString(), icon: BarChart3, color: "text-success" },
            { label: "Active Agents", value: mockAgents.filter((a) => a.isActive).length.toString(), icon: Cpu },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <stat.icon className={`h-4 w-4 ${stat.color ?? "text-primary"}`} />
              </div>
              <div className="text-xl font-bold tabular-nums">{stat.value}</div>
            </div>
          ))}
          <div className="rounded-xl border bg-card p-4">
            <div className="text-xs text-muted-foreground mb-1">Total Cost</div>
            <div className="text-xl font-bold tabular-nums">${totalCost.toFixed(3)}</div>
          </div>
        </div>

        <AgentRunsList runs={mockAgentRuns} />
      </div>
    </WorkspaceContainer>
  );
}
