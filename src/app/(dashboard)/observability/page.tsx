"use client";

import * as React from "react";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import {
  EventFeed,
  EventFeedSkeleton,
  EventSummaryBar,
  EventFilters,
} from "@/features/events";
import { useEventStream } from "@/features/events/hooks/use-event-stream";
import { mockEventSummary } from "@/features/events/mocks";
import type { EventSeverity, EventCategory } from "@/features/events/types";
import {
  Activity,
  Pause,
  Play,
  BarChart3,
  Gauge,
} from "lucide-react";
import { SystemMetricsPanel, ProviderLatencyChart } from "@/features/monitoring";

export default function ObservabilityPage() {
  const { events, paused, setPaused, acknowledge, acknowledgeAll, latestRef } =
    useEventStream(5000);
  const [mounted, setMounted] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [severityFilter, setSeverityFilter] = React.useState<EventSeverity[]>([]);
  const [categoryFilter, setCategoryFilter] = React.useState<EventCategory[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = React.useMemo(() => {
    let result = events;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.provider.toLowerCase().includes(q),
      );
    }
    if (severityFilter.length > 0) {
      result = result.filter((e) => severityFilter.includes(e.severity));
    }
    if (categoryFilter.length > 0) {
      result = result.filter((e) => categoryFilter.includes(e.category));
    }
    return result;
  }, [events, search, severityFilter, categoryFilter]);

  const visibleSummary = React.useMemo(
    () => ({
      total: filtered.length,
      critical: filtered.filter((e) => e.severity === "critical").length,
      high: filtered.filter((e) => e.severity === "high").length,
      unacknowledged: filtered.filter((e) => !e.acknowledged).length,
      byCategory: mockEventSummary.byCategory,
    }),
    [filtered],
  );

  if (!mounted) {
    return (
      <WorkspaceContainer size="wide">
        <div className="flex flex-col gap-6">
          <DashboardHeader
            heading="Observability"
            text="Monitor metrics, logs, and traces across your ML platform"
          />
          <EventFeedSkeleton />
        </div>
      </WorkspaceContainer>
    );
  }

  return (
    <WorkspaceContainer size="wide">
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Observability"
          text="Monitor metrics, logs, and traces across your ML platform"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5">
              <Activity
                className={`h-3.5 w-3.5 ${paused ? "text-muted-foreground" : "text-success animate-pulse-soft"}`}
              />
              <span className="text-xs tabular-nums text-muted-foreground">
                {events.length}
              </span>
            </div>
          </div>
        </DashboardHeader>

        <EventSummaryBar summary={visibleSummary} />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">System Metrics</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Latency and throughput over time</p>
            <SystemMetricsPanel height={200} />
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Provider Latency</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Average response time by provider</p>
            <ProviderLatencyChart
              data={[
                { name: "OpenAI", latency: 145, status: "healthy" },
                { name: "Anthropic", latency: 320, status: "degraded" },
                { name: "Google", latency: 98, status: "healthy" },
                { name: "Meta", latency: 210, status: "healthy" },
                { name: "Mistral", latency: 580, status: "down" },
                { name: "DeepSeek", latency: 165, status: "healthy" },
              ]}
              height={200}
            />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-4">
          {/* Filters sidebar */}
          <aside className="xl:col-span-1">
            <div className="sticky top-20 space-y-4">
              <EventFilters
                search={search}
                onSearchChange={setSearch}
                severity={severityFilter}
                onSeverityChange={setSeverityFilter}
                category={categoryFilter}
                onCategoryChange={setCategoryFilter}
              />

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setPaused(!paused)}
                  className="flex items-center justify-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {paused ? (
                    <>
                      <Play className="h-3.5 w-3.5" />
                      Resume live
                    </>
                  ) : (
                    <>
                      <Pause className="h-3.5 w-3.5" />
                      Pause feed
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-lg border bg-card p-3 space-y-2">
                <p className="text-xs font-medium">Live Stats</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Feed</span>
                    <span className="text-foreground">
                      {paused ? "Paused" : "Live"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interval</span>
                    <span className="text-foreground">5s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Buffer</span>
                    <span className="text-foreground tabular-nums">
                      {events.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unread</span>
                    <span className="text-foreground tabular-nums">
                      {events.filter((e) => !e.acknowledged).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Event feed */}
          <section className="xl:col-span-3">
            <EventFeed
              events={filtered}
              onAcknowledge={acknowledge}
              onAcknowledgeAll={acknowledgeAll}
              latestRef={latestRef}
            />
          </section>
        </div>
      </div>
    </WorkspaceContainer>
  );
}
