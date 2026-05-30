export type PromptStatus = "active" | "draft" | "archived";

export type PromptCategory =
  | "customer_support"
  | "fraud_detection"
  | "code_review"
  | "document_summarization"
  | "content_generation"
  | "data_extraction";

export interface PromptVersion {
  version: number;
  label: string;
  systemPrompt: string;
  userTemplate: string;
  model: string;
  temperature: number;
  tokens: number;
  accuracy: number;
  latency: number;
  cost: number;
  createdBy: string;
  createdAt: string;
  notes: string;
}

export interface Prompt {
  id: string;
  name: string;
  description: string;
  category: PromptCategory;
  status: PromptStatus;
  currentVersion: number;
  versions: PromptVersion[];
  tags: string[];
  updatedAt: string;
  createdAt: string;
}
