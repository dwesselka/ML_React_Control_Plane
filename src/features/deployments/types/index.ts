export interface Deployment {
  id: string;
  modelId: string;
  modelName: string;
  version: string;
  status: "active" | "inactive" | "failed" | "rolling" | "canary";
  endpoint: string;
  replicas: number;
  targetReplicas: number | null;
  strategy: "canary" | "blue-green" | "rolling";
  health: "healthy" | "degraded" | "unhealthy";
  region: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeploymentListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  modelId?: string;
  strategy?: string;
  region?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export interface DeploymentMetrics {
  deploymentId: string;
  requestsPerSecond: number;
  latencyP50: number;
  latencyP95: number;
  latencyP99: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  activeConnections: number;
  timestamp: string;
}
