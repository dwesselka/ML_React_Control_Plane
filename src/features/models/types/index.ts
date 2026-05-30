export type Environment = "development" | "staging" | "production";

export type ProviderName =
  | "OpenAI"
  | "Anthropic"
  | "Google"
  | "Meta"
  | "Mistral"
  | "DeepSeek"
  | "Cohere"
  | "HuggingFace"
  | "Amazon"
  | "Azure"
  | "Custom";

export type DeploymentStatus =
  | "pending"
  | "deploying"
  | "running"
  | "stopped"
  | "failed"
  | "rollback";

export type RolloutStrategy = "canary" | "blue-green" | "rolling" | "recreate";

export type RolloutStepStatus = "pending" | "progressing" | "completed" | "failed" | "paused";

export interface RolloutStep {
  name: string;
  trafficPercent: number;
  status: RolloutStepStatus;
  startedAt: string;
  completedAt: string | null;
}

export interface RolloutInfo {
  strategy: RolloutStrategy;
  status: RolloutStepStatus;
  steps: RolloutStep[];
  currentTrafficPercent: number;
  targetTrafficPercent: number;
}

export interface LatencyMetrics {
  p50Ms: number;
  p95Ms: number;
  p99Ms: number;
  avgMs: number;
}

export interface TokenMetrics {
  totalTokens: number;
  promptTokens: number;
  completionTokens: number;
  totalCost: number;
}

export interface ModelDeployment {
  id: string;
  environment: Environment;
  status: DeploymentStatus;
  provider: ProviderName;
  modelVersion: string;
  endpointUrl: string;
  rollout: RolloutInfo | null;
  latency: LatencyMetrics;
  tokens: TokenMetrics;
  replicas: number;
  deployedAt: string;
  updatedAt: string;
}

export interface ModelRegistryVersion {
  id: string;
  version: string;
  status: "active" | "staged" | "archived";
  metrics: Record<string, number>;
  artifactUrl: string;
  createdAt: string;
  description?: string;
}

export interface ModelRegistryEntry {
  id: string;
  name: string;
  description: string | null;
  framework: string;
  task: string;
  status: "active" | "inactive" | "archived" | "draft";
  provider: ProviderName;
  owner: string;
  tags: string[];
  currentVersion: string;
  latestVersion: string;
  deployments: ModelDeployment[];
  versions: ModelRegistryVersion[];
  latency: LatencyMetrics;
  tokens: TokenMetrics;
  createdAt: string;
  updatedAt: string;
  lastDeployedAt: string | null;
  lastInferenceAt: string | null;
  complianceTags: string[];
  requiresApproval: boolean;
  cost: number;
}

export interface ModelRegistryFilters {
  search: string;
  status: ModelRegistryEntry["status"][];
  environment: Environment[];
  provider: ProviderName[];
  framework: string[];
}

export interface ModelRegistrySort {
  field: string;
  direction: "asc" | "desc";
}

export interface ModelRegistryPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export type { Model, ModelListParams, ModelMetrics, ModelVersion } from "./legacy";

export interface ModelRegistrySummary {
  totalModels: number;
  activeModels: number;
  avgLatencyP95: number;
  totalMonthlyCost: number;
  modelsInRollout: number;
  failedDeployments: number;
  totalTokens30d: number;
}
