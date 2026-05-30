export interface Pipeline {
  id: string;
  name: string;
  description: string | null;
  status: "idle" | "running" | "completed" | "failed" | "paused";
  stages: PipelineStage[];
  schedule: string | null;
  lastRunAt: string | null;
  lastRunStatus: "success" | "failure" | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PipelineStage {
  name: string;
  type: "training" | "evaluation" | "deployment" | "data-processing" | "custom";
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  duration: number | null;
  error: string | null;
  startedAt: string | null;
  completedAt: string | null;
}

export interface PipelineRun {
  id: string;
  pipelineId: string;
  runNumber: number;
  status: "running" | "completed" | "failed" | "cancelled";
  stages: PipelineStage[];
  triggeredBy: "schedule" | "manual" | "webhook";
  startedAt: string;
  finishedAt: string | null;
  duration: number | null;
}

export interface PipelineListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  sort?: string;
  order?: "asc" | "desc";
}
