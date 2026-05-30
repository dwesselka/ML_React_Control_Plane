"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { RoutingRulesTable } from "@/features/gateway/components/routing-rules-table";
import { mockRoutingRules } from "@/features/gateway/mocks";
import type { RoutingRule } from "@/features/gateway/types";
import { Plus, Info } from "lucide-react";
import { toast } from "sonner";

function RoutingSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-6 space-y-1.5">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="px-6">
        <div className="rounded-xl border bg-card">
          <div className="p-4 border-b">
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>
          <div className="p-4 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-5 w-16 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-72" />
                </div>
                <Skeleton className="h-5 w-12 rounded-md" />
                <Skeleton className="h-5 w-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoutingRulesPage() {
  const [mounted, setMounted] = React.useState(false);
  const [rules, setRules] = React.useState<RoutingRule[]>(mockRoutingRules);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = React.useCallback((id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)),
    );
    const rule = rules.find((r) => r.id === id);
    if (rule) {
      toast.success(`Rule "${rule.name}" ${!rule.isActive ? "activated" : "deactivated"}`);
    }
  }, [rules]);

  if (!mounted) {
    return (
      <WorkspaceContainer>
        <RoutingSkeleton />
      </WorkspaceContainer>
    );
  }

  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Routing Rules"
          text="Configure how requests are distributed across AI providers"
        >
          <button
            onClick={() => toast.success("New rule dialog opened (simulated)")}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Rule
          </button>
        </DashboardHeader>

        <div className="rounded-xl border bg-card">
          <div className="p-4 border-b">
            <div className="flex items-start gap-3">
              <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="text-xs text-muted-foreground">
                Rules are evaluated in priority order (highest first). The first matching rule determines the routing strategy and provider selection.
              </div>
            </div>
          </div>
          <div className="p-4">
            <RoutingRulesTable rules={rules} onToggle={handleToggle} />
          </div>
        </div>
      </div>
    </WorkspaceContainer>
  );
}
