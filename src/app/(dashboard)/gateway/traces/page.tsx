"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { TracesTable } from "@/features/gateway/components/traces-table";
import { mockRequestTraces } from "@/features/gateway/mocks";
import type { RequestTrace } from "@/features/gateway/types";
import { RefreshCw, Filter } from "lucide-react";

function TracesSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-6 space-y-1.5">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="px-6 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-2 w-2 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-3 w-72" />
              </div>
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RequestTracesPage() {
  const [mounted, setMounted] = React.useState(false);
  const [traces] = React.useState<RequestTrace[]>(mockRequestTraces);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const totalCost = React.useMemo(
    () => traces.reduce((acc, t) => acc + t.cost, 0),
    [traces],
  );

  if (!mounted) {
    return (
      <WorkspaceContainer>
        <TracesSkeleton />
      </WorkspaceContainer>
    );
  }

  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Request Traces"
          text="Detailed trace of all AI gateway requests and routing decisions"
        >
          <div className="flex items-center gap-2">
            <div className="rounded-lg border bg-card px-3 py-1.5 text-xs tabular-nums text-muted-foreground">
              {traces.length} requests · ${totalCost.toFixed(3)} total
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>
        </DashboardHeader>

        <TracesTable traces={traces} />
      </div>
    </WorkspaceContainer>
  );
}
