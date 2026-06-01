"use client";

import * as React from "react";
import { formatDate, formatLatency, formatNumber } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Box,
  Globe,
  GitBranch,
  Gauge,
  DollarSign,
  FileText,
  Shield,
  Clock,
  User,
  Layers,
  Tag,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ModelRegistryEntry, ModelRegistryVersion, ModelDeployment } from "../types";

const statusConfig: Record<string, { variant: "success" | "warning" | "secondary" | "destructive"; label: string }> = {
  active: { variant: "success", label: "Active" },
  inactive: { variant: "warning", label: "Inactive" },
  draft: { variant: "secondary", label: "Draft" },
  archived: { variant: "destructive", label: "Archived" },
};

function DeploymentCard({ deployment }: { deployment: ModelDeployment }) {
  return (
    <div className="rounded-lg border bg-card p-3.5 space-y-2">
      <div className="flex items-center justify-between">
        <Badge variant={deployment.environment === "production" ? "success" : deployment.environment === "staging" ? "warning" : "secondary"} size="sm">
          {deployment.environment}
        </Badge>
        <Badge
          variant={
            deployment.status === "running" ? "success"
            : deployment.status === "deploying" ? "warning"
            : deployment.status === "failed" ? "destructive"
            : "secondary"
          }
          size="sm"
        >
          {deployment.status}
        </Badge>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Globe className="h-3 w-3 shrink-0" />
        <span className="truncate">{deployment.endpointUrl}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Gauge className="h-3 w-3 shrink-0" />
          <span>P50: {formatLatency(deployment.latency.p50Ms)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Gauge className="h-3 w-3 shrink-0" />
          <span>P95: {formatLatency(deployment.latency.p95Ms)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Gauge className="h-3 w-3 shrink-0" />
          <span>P99: {formatLatency(deployment.latency.p99Ms)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Box className="h-3 w-3 shrink-0" />
          <span>{deployment.replicas} replicas</span>
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground">
        Deployed {formatDate(deployment.deployedAt)}
      </div>
      {deployment.rollout && (
        <div className="space-y-1.5 pt-1 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground uppercase tracking-wider">
              {deployment.rollout.strategy}
            </span>
            <span className="text-muted-foreground">{deployment.rollout.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${deployment.rollout.currentTrafficPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {deployment.rollout.currentTrafficPercent}% / {deployment.rollout.targetTrafficPercent}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function VersionRow({ version }: { version: ModelRegistryVersion }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-2">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Layers className="h-3.5 w-3.5" />
        </div>
        <div>
          <span className="text-sm font-mono font-medium">{version.version}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <Badge
              variant={version.status === "active" ? "success" : version.status === "staged" ? "warning" : "secondary"}
              size="sm"
            >
              {version.status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs text-muted-foreground">{formatDate(version.createdAt)}</span>
        {Object.keys(version.metrics).length > 0 && (
          <div className="flex gap-2 text-[10px] text-muted-foreground mt-0.5">
            {Object.entries(version.metrics).map(([k, v]) => (
              <span key={k}>
                {k}: {typeof v === "number" ? (v < 1 ? (v * 100).toFixed(0) : v.toFixed(2)) : v}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ModelDetailDrawerProps {
  model: ModelRegistryEntry | null;
  onClose: () => void;
}

export function ModelDetailDrawer({ model, onClose }: ModelDetailDrawerProps) {
  React.useEffect(() => {
    if (model) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [model]);

  if (!model) return null;

  const cfg = statusConfig[model.status] ?? { variant: "secondary" as const, label: "Unknown" };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative ml-auto h-full w-full max-w-[520px] bg-background border-l shadow-2xl overflow-y-auto animate-in slide-in-from-right">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Box className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">{model.name}</h2>
              <p className="text-[11px] text-muted-foreground">{model.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Status + Provider */}
          <div className="flex items-center gap-2">
            <Badge variant={cfg.variant}>{cfg.label}</Badge>
            <span className="text-xs text-muted-foreground">{model.framework}</span>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{model.task}</span>
          </div>

          {/* Lifecycle Pipeline */}
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Lifecycle Pipeline
            </p>
            <div className="flex items-center gap-0">
              {["development", "staging", "production", "deprecated", "archived"].map((stage, i, arr) => {
                const isActive =
                  (stage === "development" && model.deployments.some((d) => d.environment === "development")) ||
                  (stage === "staging" && model.deployments.some((d) => d.environment === "staging")) ||
                  (stage === "production" && model.deployments.some((d) => d.environment === "production")) ||
                  (stage === "deprecated" && (model.status === "inactive" || model.status === "archived")) ||
                  (stage === "archived" && model.status === "archived");
                const colors: Record<string, string> = {
                  development: "bg-blue-500 border-blue-500",
                  staging: "bg-amber-500 border-amber-500",
                  production: "bg-green-500 border-green-500",
                  deprecated: "bg-orange-500 border-orange-500",
                  archived: "bg-gray-500 border-gray-500",
                };
                const labels: Record<string, string> = {
                  development: "DEV",
                  staging: "STG",
                  production: "PROD",
                  deprecated: "DEP",
                  archived: "ARC",
                };
                return (
                  <React.Fragment key={stage}>
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "h-5 w-5 rounded-full border-2 flex items-center justify-center text-[8px] font-bold text-white",
                          isActive ? colors[stage] : "bg-muted border-muted-foreground/30 text-muted-foreground/50",
                        )}
                      >
                        {isActive ? "✓" : ""}
                      </div>
                      <span className={cn(
                        "text-[9px] mt-1",
                        isActive ? "text-foreground font-medium" : "text-muted-foreground/50",
                      )}>
                        {labels[stage]}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={cn(
                        "flex-1 h-px mx-1 mt-[-1.25rem]",
                        isActive || arr.slice(0, i + 1).some((s) =>
                          s === "development" && model.deployments.some((d) => d.environment === "development") ||
                          s === "staging" && model.deployments.some((d) => d.environment === "staging") ||
                          s === "production" && model.deployments.some((d) => d.environment === "production") ||
                          s === "deprecated" && (model.status === "inactive" || model.status === "archived") ||
                          s === "archived" && model.status === "archived"
                        ) ? "bg-primary" : "bg-border"
                      )} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {model.description ?? "No description"}
          </p>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-xs">
              <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Owner:</span>
              <span className="font-medium">{model.owner}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Monthly Cost:</span>
              <span className="font-medium">${formatNumber(model.cost)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Created:</span>
              <span className="font-medium">{formatDate(model.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <GitBranch className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Updated:</span>
              <span className="font-medium">{formatDate(model.updatedAt)}</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {model.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border bg-muted/30 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
              {model.complianceTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Latency Metrics */}
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Gauge className="h-3 w-3" />
              Latency Metrics
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "P50", value: formatLatency(model.latency.p50Ms) },
                { label: "P95", value: formatLatency(model.latency.p95Ms) },
                { label: "P99", value: formatLatency(model.latency.p99Ms) },
                { label: "Avg", value: formatLatency(model.latency.avgMs) },
              ].map((m) => (
                <div key={m.label} className="rounded-lg border bg-card p-2.5 text-center">
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                  <p className="text-sm font-semibold font-mono mt-0.5">{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Token Metrics */}
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="h-3 w-3" />
              Token Metrics
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Total", value: formatNumber(model.tokens.totalTokens) },
                { label: "Prompt", value: formatNumber(model.tokens.promptTokens) },
                { label: "Completion", value: formatNumber(model.tokens.completionTokens) },
                { label: "Cost", value: `$${model.tokens.totalCost.toFixed(2)}` },
              ].map((m) => (
                <div key={m.label} className="rounded-lg border bg-card p-2.5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                  <span className="text-sm font-semibold font-mono">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deployments */}
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Globe className="h-3 w-3" />
              Deployments
            </p>
            <div className="space-y-2">
              {model.deployments.length === 0
                ? <p className="text-xs text-muted-foreground italic">No active deployments</p>
                : model.deployments.map((dep) => (
                    <DeploymentCard key={dep.id} deployment={dep} />
                  ))}
            </div>
          </div>

          {/* Versions */}
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="h-3 w-3" />
              Versions ({model.versions.length})
            </p>
            <div className="space-y-1.5">
              {model.versions.map((ver) => (
                <VersionRow key={ver.id} version={ver} />
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Metadata
            </p>
            <div className="rounded-lg border bg-muted/20 p-3">
              <pre className="text-[10px] text-muted-foreground overflow-x-auto whitespace-pre-wrap font-mono">
                {JSON.stringify(
                  {
                    id: model.id,
                    currentVersion: model.currentVersion,
                    latestVersion: model.latestVersion,
                    requiresApproval: model.requiresApproval,
                    lastDeployedAt: model.lastDeployedAt,
                    lastInferenceAt: model.lastInferenceAt,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
