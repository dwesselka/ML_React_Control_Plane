"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import type { Column } from "@/components/ui/data-table";
import { formatLatency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Box, Globe, Activity, Gauge } from "lucide-react";
import type {
  ModelRegistryEntry,
  ModelRegistrySort,
  ModelRegistryPagination,
  ModelDeployment,
} from "../types";
import type { SortDirection } from "@/components/ui/data-table";
import { ModelActions } from "./model-actions";

const statusConfig: Record<string, { variant: "success" | "warning" | "secondary" | "destructive"; label: string }> = {
  active: { variant: "success", label: "Active" },
  inactive: { variant: "warning", label: "Inactive" },
  draft: { variant: "secondary", label: "Draft" },
  archived: { variant: "destructive", label: "Archived" },
};

const deploymentStatusConfig: Record<string, { variant: "success" | "warning" | "destructive" | "secondary"; label: string; dot: string }> = {
  running: { variant: "success", label: "Running", dot: "bg-success" },
  deploying: { variant: "warning", label: "Deploying", dot: "bg-warning animate-pulse" },
  pending: { variant: "secondary", label: "Pending", dot: "bg-muted-foreground" },
  stopped: { variant: "secondary", label: "Stopped", dot: "bg-muted-foreground" },
  failed: { variant: "destructive", label: "Failed", dot: "bg-destructive" },
  rollback: { variant: "destructive", label: "Rollback", dot: "bg-destructive" },
};

function ProviderLogo({ provider }: { provider: string }) {
  const colors: Record<string, string> = {
    OpenAI: "bg-green-500/10 text-green-600",
    Anthropic: "bg-purple-500/10 text-purple-600",
    Google: "bg-blue-500/10 text-blue-600",
    Meta: "bg-indigo-500/10 text-indigo-600",
    Mistral: "bg-orange-500/10 text-orange-600",
    DeepSeek: "bg-cyan-500/10 text-cyan-600",
    Cohere: "bg-yellow-500/10 text-yellow-600",
    HuggingFace: "bg-pink-500/10 text-pink-600",
    Azure: "bg-sky-500/10 text-sky-600",
    Amazon: "bg-amber-500/10 text-amber-600",
    Custom: "bg-muted text-muted-foreground",
  };
  return (
    <span className={cn("inline-flex items-center justify-center h-6 w-6 rounded text-[10px] font-bold", colors[provider] ?? "bg-muted text-muted-foreground")}>
      {provider.slice(0, 2).toUpperCase()}
    </span>
  );
}

function EnvBadge({ env }: { env: ModelDeployment["environment"] }) {
  const envColors: Record<string, string> = {
    development: "bg-muted text-muted-foreground border-border",
    staging: "bg-warning/10 text-warning border-warning/20",
    production: "bg-success/10 text-success border-success/20",
  };
  return (
    <span className={cn("inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium", envColors[env])}>
      {env === "development" ? "DEV" : env === "staging" ? "STG" : "PROD"}
    </span>
  );
}

function getDepCfg(status: string) {
  return deploymentStatusConfig[status] ?? deploymentStatusConfig.pending!;
}

function ExpandedDeployments({ model }: { model: ModelRegistryEntry }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Deployments</p>
      {model.deployments.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">No deployments</p>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {model.deployments.map((dep) => {
            const depCfg = getDepCfg(dep.status);
            return (
              <div key={dep.id} className="rounded-lg border bg-card p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <EnvBadge env={dep.environment} />
                  <Badge variant={depCfg.variant as "success" | "warning" | "secondary" | "destructive"} size="sm">
                    <span className={cn("mr-1 h-1.5 w-1.5 rounded-full", depCfg.dot)} />
                    {depCfg.label}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground truncate" title={dep.endpointUrl}>
                  {dep.endpointUrl}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Gauge className="h-3 w-3" />
                    {formatLatency(dep.latency.p95Ms)} p95
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {dep.replicas} replicas
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {dep.provider}
                  </span>
                </div>
                {dep.rollout && (
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">
                      {dep.rollout.strategy}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${dep.rollout.currentTrafficPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {dep.rollout.currentTrafficPercent}%
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface ModelTableProps {
  models: ModelRegistryEntry[];
  pagination: ModelRegistryPagination;
  sort: ModelRegistrySort;
  onSort: (field: string, direction: SortDirection) => void;
  onPageChange: (page: number) => void;
  onSelect: (model: ModelRegistryEntry) => void;
  isLoading?: boolean;
}

export function ModelTable({
  models,
  pagination,
  sort,
  onSort,
  onPageChange,
  onSelect,
  isLoading,
}: ModelTableProps) {
  const columns: Column<ModelRegistryEntry>[] = [
    {
      key: "name",
      header: "Model",
      sortable: true,
      width: "22%",
      render: (model) => (
        <div className="flex items-center gap-3">
          <Box className="h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="font-medium text-sm">{model.name}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
              {model.description}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      width: "10%",
      render: (model) => {
        const cfg = statusConfig[model.status] ?? statusConfig.draft!;
        return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
      },
    },
    {
      key: "provider",
      header: "Provider",
      sortable: true,
      width: "10%",
      render: (model) => (
        <div className="flex items-center gap-2">
          <ProviderLogo provider={model.provider} />
          <span className="text-xs">{model.provider}</span>
        </div>
      ),
    },
    {
      key: "currentVersion",
      header: "Version",
      sortable: true,
      width: "8%",
      render: (model) => (
        <span className="text-xs font-mono text-muted-foreground">
          {model.currentVersion}
        </span>
      ),
    },
    {
      key: "framework",
      header: "Framework",
      sortable: true,
      width: "10%",
      render: (model) => <span className="text-xs text-muted-foreground">{model.framework}</span>,
    },
    {
      key: "latency",
      header: "Latency (p95)",
      sortable: true,
      width: "10%",
      render: (model) => (
        <span className="text-xs font-mono">{formatLatency(model.latency.p95Ms)}</span>
      ),
    },
    {
      key: "cost",
      header: "Monthly Cost",
      sortable: true,
      width: "10%",
      render: (model) => (
        <span className="text-xs font-mono">${formatNumber(model.cost)}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      width: "5%",
      cellClassName: "text-right",
      headerClassName: "text-right",
      render: (model) => (
        <ModelActions
          model={model}
          onView={onSelect}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={models}
      keyExtractor={(m) => m.id}
      sortField={sort.field}
      sortDirection={sort.direction}
      onSort={onSort}
      page={pagination.page}
      pageSize={pagination.pageSize}
      total={pagination.total}
      totalPages={pagination.totalPages}
      onPageChange={onPageChange}
      onRowClick={onSelect}
      expandableRender={(model) => <ExpandedDeployments model={model} />}
      isLoading={isLoading}
      emptyMessage="No models match the current filters"
    />
  );
}
