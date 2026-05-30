"use client";

import * as React from "react";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import {
  KPICards,
  ProviderHealthGrid,
  InfrastructureStatus,
  ActivityFeed,
  KPICardsSkeleton,
  ProviderGridSkeleton,
  InfrastructureSkeleton,
  ActivitySkeleton,
} from "@/features/system-health";
import { useSystemHealth } from "@/features/system-health/hooks/use-system-health";
import { RefreshCw } from "lucide-react";

export default function SystemHealthPage() {
  const { data } = useSystemHealth(5000);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <WorkspaceContainer size="wide">
        <div className="flex flex-col gap-6">
          <DashboardHeader heading="System Health" text="Monitor the health and status of your ML infrastructure" />
          <KPICardsSkeleton />
          <ProviderGridSkeleton />
          <InfrastructureSkeleton />
          <ActivitySkeleton />
        </div>
      </WorkspaceContainer>
    );
  }

  return (
    <WorkspaceContainer size="wide">
      <div className="flex flex-col gap-6">
        <DashboardHeader heading="System Health" text="Monitor the health and status of your ML infrastructure">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-3 w-3 animate-spin" />
            Live
          </div>
        </DashboardHeader>

        {/* KPI Cards */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Overview</h2>
          </div>
          <KPICards kpis={data.kpis} />
        </section>

        {/* Provider Health */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Provider Health</h2>
          </div>
          <ProviderHealthGrid providers={data.providers} />
        </section>

        {/* Infrastructure Status + Activity */}
        <div className="grid gap-6 xl:grid-cols-3">
          <section className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Infrastructure Status</h2>
            </div>
            <InfrastructureStatus components={data.infrastructure} />
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Activity Feed</h2>
              <span className="text-xs text-muted-foreground">{data.activity.length} events</span>
            </div>
            <ActivityFeed events={data.activity} />
          </section>
        </div>
      </div>
    </WorkspaceContainer>
  );
}
