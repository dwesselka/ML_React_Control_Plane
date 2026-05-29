export type ProviderStatus = "healthy" | "degraded" | "down" | "warning";

export interface ProviderModel {
  id: string;
  name: string;
  icon: string;
  status: ProviderStatus;
  requestsPerMin: number;
  avgLatency: number;
  throughput: number;
  fallbackRate: number;
  tokensPerSecond: number;
  uptime: number;
  errorRate: number;
  history: number[];
  region: string;
  modelCount: number;
  lastIncident: string | null;
}

export interface ProviderMetricsSummary {
  totalProviders: number;
  healthyCount: number;
  degradedCount: number;
  downCount: number;
  totalRequests: number;
  avgLatency: number;
  totalTokensPerSecond: number;
  overallUptime: number;
}

export interface ProviderHealthData {
  providers: ProviderModel[];
  summary: ProviderMetricsSummary;
}
