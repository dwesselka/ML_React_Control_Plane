import type { JsonValue } from "./common";

export interface ModelMetadata {
  id: string;
  name: string;
  version: string;
  description?: string;
  framework: string;
  task: string;
  tags: string[];
  metrics: Record<string, number>;
  artifactUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExperimentRun {
  id: string;
  experimentId: string;
  runNumber: number;
  status: "running" | "completed" | "failed" | "cancelled";
  metrics: Record<string, number>;
  params: Record<string, JsonValue>;
  artifacts: string[];
  startedAt: string;
  finishedAt?: string;
  duration?: number;
}

export interface Deployment {
  id: string;
  modelId: string;
  modelName: string;
  version: string;
  status: "active" | "inactive" | "failed" | "rolling";
  endpoint: string;
  replicas: number;
  targetReplicas?: number;
  strategy: "canary" | "blue-green" | "rolling";
  createdAt: string;
  updatedAt: string;
}

export interface Pipeline {
  id: string;
  name: string;
  description?: string;
  status: "idle" | "running" | "completed" | "failed";
  stages: PipelineStage[];
  createdAt: string;
  updatedAt: string;
}

export interface PipelineStage {
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  duration?: number;
  error?: string;
}

export interface Dataset {
  id: string;
  name: string;
  description?: string;
  version: string;
  size: number;
  rowCount: number;
  columnCount: number;
  schema: DatasetColumn[];
  storagePath: string;
  createdAt: string;
  updatedAt: string;
}

export interface DatasetColumn {
  name: string;
  type: "string" | "number" | "boolean" | "date" | "categorical" | "embedding";
  nullable: boolean;
  description?: string;
}
