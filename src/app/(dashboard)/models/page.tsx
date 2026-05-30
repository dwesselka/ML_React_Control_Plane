"use client";

import * as React from "react";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import {
  ModelSummaryBar,
  ModelFilters,
  ModelTable,
  ModelDetailDrawer,
  ModelSummarySkeleton,
  ModelTableSkeleton,
} from "@/features/models";
import { useModelRegistry } from "@/features/models/hooks/use-model-registry";
import { Box } from "lucide-react";

export default function ModelsPage() {
  const {
    models,
    summary,
    filters,
    sort,
    pagination,
    selectedModel,
    setSelectedModel,
    updateFilters,
    updateSort,
    goToPage,
    clearFilters,
  } = useModelRegistry();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <WorkspaceContainer size="wide">
        <div className="flex flex-col gap-6">
          <DashboardHeader
            heading="Model Registry"
            text="Govern and manage your AI models in production"
          />
          <ModelSummarySkeleton />
          <ModelTableSkeleton />
        </div>
      </WorkspaceContainer>
    );
  }

  return (
    <WorkspaceContainer size="wide">
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Model Registry"
          text="Govern and manage your AI models in production"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Box className="h-3 w-3 text-primary" />
            {pagination.total} models registered
          </div>
        </DashboardHeader>

        <section>
          <ModelSummaryBar summary={summary} />
        </section>

        <section>
          <ModelFilters
            filters={filters}
            onFilterChange={updateFilters}
            onClear={clearFilters}
          />
        </section>

        <section>
          <ModelTable
            models={models}
            pagination={pagination}
            sort={sort}
            onSort={updateSort}
            onPageChange={goToPage}
            onSelect={setSelectedModel}
          />
        </section>
      </div>

      <ModelDetailDrawer
        model={selectedModel}
        onClose={() => setSelectedModel(null)}
      />
    </WorkspaceContainer>
  );
}
