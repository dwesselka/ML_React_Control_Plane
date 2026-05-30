"use client";

import * as React from "react";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import {
  ProviderHealthGrid,
  ProviderCardsSkeleton,
} from "@/features/providers";
import { useProviderHealth } from "@/features/providers/hooks/use-provider-health";
import { Activity } from "lucide-react";

export default function ProvidersPage() {
  const { data } = useProviderHealth(4000);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <WorkspaceContainer size="wide">
        <div className="flex flex-col gap-6">
          <DashboardHeader
            heading="Providers"
            text="Monitor realtime health of your AI model providers"
          />
          <ProviderCardsSkeleton />
        </div>
      </WorkspaceContainer>
    );
  }

  return (
    <WorkspaceContainer size="wide">
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Providers"
          text="Monitor realtime health of your AI model providers"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="h-3 w-3 text-success animate-pulse-soft" />
            Live
          </div>
        </DashboardHeader>

        <ProviderHealthGrid
          providers={data.providers}
          summary={data.summary}
        />
      </div>
    </WorkspaceContainer>
  );
}
