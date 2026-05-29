import type { Model } from "@/features/models/types";

let counter = 0;

export function createMockModel(overrides?: Partial<Model>): Model {
  counter++;
  const now = new Date().toISOString();
  return {
    id: `mod-${String(counter).padStart(3, "0")}`,
    name: `model-${counter}`,
    description: `Auto-generated mock model #${counter}`,
    version: "1.0.0",
    framework: "pytorch",
    task: "text-classification",
    status: "draft",
    tags: [],
    metrics: {},
    artifactUrl: `s3://models/model-${counter}/v1.0.0`,
    createdAt: now,
    updatedAt: now,
    lastDeployedAt: null,
    ...overrides,
  };
}

export function createMockModelList(count: number): Model[] {
  return Array.from({ length: count }, () => createMockModel());
}
