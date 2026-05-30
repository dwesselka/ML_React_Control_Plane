export interface Model {
  id: string;
  name: string;
  description: string | null;
  version: string;
  framework: string;
  task: string;
  status: "active" | "inactive" | "archived" | "draft";
  tags: string[];
  metrics: Record<string, number>;
  artifactUrl: string;
  createdAt: string;
  updatedAt: string;
  lastDeployedAt: string | null;
}

export interface ModelListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  framework?: string;
  task?: string;
  status?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export interface ModelMetrics {
  modelId: string;
  accuracy: number;
  latency: number;
  throughput: number;
  errorRate: number;
  memoryUsage: number;
  cpuUsage: number;
  predictions: number;
  timestamp: string;
}

export interface ModelVersion {
  id: string;
  modelId: string;
  version: string;
  status: "active" | "staged" | "archived";
  metrics: Record<string, number>;
  createdAt: string;
}
