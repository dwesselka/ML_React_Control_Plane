export interface MetricPoint {
  timestamp: string;
  value: number;
  label?: string;
}

export interface MetricSeries {
  id: string;
  name: string;
  data: MetricPoint[];
  color?: string;
  unit?: string;
}

export interface DashboardStats {
  activeModels: number;
  runningExperiments: number;
  activeDeployments: number;
  pipelineRuns: number;
  avgLatency: number;
  errorRate: number;
  throughput: number;
  totalPredictions: number;
}

export type TimeRange = "1h" | "6h" | "24h" | "7d" | "30d" | "custom";
