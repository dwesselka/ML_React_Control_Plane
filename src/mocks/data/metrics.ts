import type { MetricSeries, DashboardStats } from "@/features/monitoring/types";

export const mockMetricSeries: MetricSeries[] = [
  {
    id: "latency-p50",
    name: "P50 Latency",
    data: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: 10 + Math.random() * 8,
    })),
    color: "hsl(var(--chart-1))",
    unit: "ms",
  },
  {
    id: "latency-p95",
    name: "P95 Latency",
    data: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: 35 + Math.random() * 20,
    })),
    color: "hsl(var(--chart-2))",
    unit: "ms",
  },
  {
    id: "throughput",
    name: "Throughput",
    data: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: 800 + Math.random() * 600,
    })),
    color: "hsl(var(--chart-3))",
    unit: "req/s",
  },
  {
    id: "error-rate",
    name: "Error Rate",
    data: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: Math.random() * 3,
    })),
    color: "hsl(var(--destructive))",
    unit: "%",
  },
];

export const mockDashboardStats: DashboardStats = {
  activeModels: 12,
  runningExperiments: 8,
  activeDeployments: 5,
  pipelineRuns: 156,
  avgLatency: 28,
  errorRate: 1.5,
  throughput: 2450,
  totalPredictions: 895000,
};
