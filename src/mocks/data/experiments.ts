import type { Experiment, ExperimentRun } from "@/features/experiments/types";
import type { JsonValue } from "@/types/common";

export const mockExperiments: Experiment[] = [
  {
    id: "exp-001",
    name: "sentiment-v3-hyperopt",
    description: "Hyperparameter optimization for sentiment analysis v3",
    project: "nlp-platform",
    status: "active",
    runCount: 24,
    tags: ["hyperopt", "bert", "nlp"],
    createdAt: "2026-05-01T08:00:00Z",
    updatedAt: "2026-05-29T09:00:00Z",
  },
  {
    id: "exp-002",
    name: "fraud-threshold-tuning",
    description: "Finding optimal probability threshold for fraud detection",
    project: "fraud-detection",
    status: "active",
    runCount: 15,
    tags: ["threshold", "fraud", "optimization"],
    createdAt: "2026-05-15T10:00:00Z",
    updatedAt: "2026-05-28T16:00:00Z",
  },
  {
    id: "exp-003",
    name: "recommendation-arch-search",
    description: "Neural architecture search for recommendation model",
    project: "recommendations",
    status: "completed",
    runCount: 48,
    tags: ["nas", "recommendation", "pytorch"],
    createdAt: "2026-04-01T08:00:00Z",
    updatedAt: "2026-05-20T12:00:00Z",
  },
];

export const mockExperimentRuns: ExperimentRun[] = [
  {
    id: "run-001",
    experimentId: "exp-001",
    runNumber: 24,
    status: "running",
    metrics: { accuracy: 0.945, loss: 0.023, f1: 0.938 },
    params: { learning_rate: 2e-5 as JsonValue, batch_size: 16 as JsonValue, epochs: 5 as JsonValue },
    artifacts: ["model.pt", "metrics.json"],
    startedAt: "2026-05-29T08:30:00Z",
    finishedAt: null,
    duration: null,
  },
  {
    id: "run-002",
    experimentId: "exp-001",
    runNumber: 23,
    status: "completed",
    metrics: { accuracy: 0.942, loss: 0.025, f1: 0.935 },
    params: { learning_rate: 3e-5 as JsonValue, batch_size: 32 as JsonValue, epochs: 5 as JsonValue },
    artifacts: ["model.pt", "metrics.json"],
    startedAt: "2026-05-29T07:00:00Z",
    finishedAt: "2026-05-29T08:15:00Z",
    duration: 4500,
  },
];
