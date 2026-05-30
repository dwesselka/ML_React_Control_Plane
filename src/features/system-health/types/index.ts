export type HealthStatus = "healthy" | "degraded" | "down" | "warning";

export interface KpiMetric {
  label: string;
  value: string;
  trend: "up" | "down" | "stable";
  change: string;
  icon: string;
  history: number[];
}

export interface ProviderHealth {
  id: string;
  name: string;
  status: HealthStatus;
  latency: number;
  throughput: number;
  tokensPerSecond: number;
  requestsPerMin: number;
  errorRate: number;
  history: number[];
}

export interface InfrastructureComponent {
  id: string;
  name: string;
  type: "gpu" | "queue" | "cache" | "vector-db" | "inference";
  status: HealthStatus;
  usage: number;
  capacity: string;
  description: string;
}

export interface ActivityEvent {
  id: string;
  type: "incident" | "warning" | "degraded" | "failover" | "retry";
  title: string;
  description: string;
  timestamp: string;
  severity: "critical" | "high" | "medium" | "low";
  source: string;
}

export interface SystemHealthData {
  kpis: KpiMetric[];
  providers: ProviderHealth[];
  infrastructure: InfrastructureComponent[];
  activity: ActivityEvent[];
}
