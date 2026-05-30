import type { JsonValue } from "@/types/common";

export interface Experiment {
  id: string;
  name: string;
  description: string | null;
  project: string;
  status: "active" | "completed" | "archived";
  runCount: number;
  tags: string[];
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
  finishedAt: string | null;
  duration: number | null;
}

export interface ExperimentListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  project?: string;
  sort?: string;
  order?: "asc" | "desc";
}
