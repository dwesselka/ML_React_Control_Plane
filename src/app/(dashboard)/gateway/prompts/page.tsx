"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PromptsTable } from "@/features/prompts/components/prompts-table";
import { PromptDetail } from "@/features/prompts/components/prompt-detail";
import { mockPrompts } from "@/features/prompts/mocks";
import type { Prompt } from "@/features/prompts/types";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";

function PromptsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-6 space-y-1.5">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2 px-6">
        <div className="rounded-xl border bg-card">
          <div className="p-3 border-b">
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
          <div className="divide-y">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <div className="flex gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-12 rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card p-3 space-y-1.5">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function PromptRegistryPage() {
  const [mounted, setMounted] = React.useState(false);
  const [selected, setSelected] = React.useState<Prompt | null>(null);
  const [search, setSearch] = React.useState("");
  const [selectedVersion, setSelectedVersion] = React.useState<number>(0);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = React.useMemo(
    () => mockPrompts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  React.useEffect(() => {
    if (!selected && mockPrompts.length > 0) {
      setSelected(mockPrompts[0]!);
    }
  }, [selected]);

  React.useEffect(() => {
    if (selected) {
      setSelectedVersion(selected.currentVersion);
    }
  }, [selected?.id]);

  const handleSelect = React.useCallback((prompt: Prompt) => {
    setSelected(prompt);
    setSelectedVersion(prompt.currentVersion);
  }, []);

  const handleVersionSelect = React.useCallback((version: number) => {
    setSelectedVersion(version);
  }, []);

  if (!mounted) {
    return (
      <WorkspaceContainer>
        <PromptsSkeleton />
      </WorkspaceContainer>
    );
  }

  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Prompt Registry"
          text="Manage and version your AI system prompts across use cases"
        >
          <button
            onClick={() => toast.success("Prompt creation dialog opened (simulated)")}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Prompt
          </button>
        </DashboardHeader>

        <div className="grid gap-6 xl:grid-cols-2">
          {/* Left: Prompt list */}
          <div className="rounded-xl border bg-card">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search prompts..."
                  className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
            <PromptsTable
              prompts={filtered}
              selectedId={selected?.id ?? null}
              onSelect={handleSelect}
            />
          </div>

          {/* Right: Prompt detail */}
          <div>
            {selected ? (
              <PromptDetail
                prompt={selected}
                selectedVersion={selectedVersion}
                onVersionSelect={handleVersionSelect}
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl border bg-card p-12">
                <p className="text-sm text-muted-foreground">Select a prompt to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </WorkspaceContainer>
  );
}
