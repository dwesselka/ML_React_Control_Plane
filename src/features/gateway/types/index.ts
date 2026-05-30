export type TaskType =
  | "code_generation"
  | "text_generation"
  | "chat"
  | "summarization"
  | "classification"
  | "extraction"
  | "analysis"
  | "translation";

export type Complexity = "low" | "medium" | "high" | "critical";

export type RouterStrategy =
  | "auto"
  | "cost_optimized"
  | "performance"
  | "fallback"
  | "manual";

export type ProviderId =
  | "deepseek-v4"
  | "gpt-4o"
  | "claude-4"
  | "gemini-2"
  | "llama-4"
  | "mistral-large"
  | "custom";

export type TraceStatus = "pending" | "classified" | "routed" | "streaming" | "completed" | "failed";

export interface PlaygroundRequest {
  prompt: string;
  strategy: RouterStrategy;
  provider?: ProviderId;
  temperature?: number;
  maxTokens?: number;
}

export interface RequestAnalysis {
  taskType: TaskType;
  complexity: Complexity;
  estimatedCost: number;
  estimatedTokens: number;
  estimatedLatency: number;
}

export interface RoutingDecision {
  selectedProvider: ProviderId;
  reasoning: string;
  confidence: number;
  alternatives: { provider: ProviderId; reason: string; costDiff: number }[];
}

export interface TraceEvent {
  timestamp: string;
  label: string;
  description: string;
  duration: number;
  status: TraceStatus;
}

export interface PlaygroundResponse {
  id: string;
  request: PlaygroundRequest;
  analysis: RequestAnalysis;
  decision: RoutingDecision;
  traces: TraceEvent[];
  output: string;
  generatedAt: string;
}

export interface RoutingRule {
  id: string;
  name: string;
  description: string;
  strategy: RouterStrategy;
  priority: number;
  conditions: {
    taskTypes: TaskType[];
    maxCost?: number;
    maxLatency?: number;
    providers?: ProviderId[];
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RequestTrace {
  id: string;
  promptPreview: string;
  taskType: TaskType;
  selectedProvider: ProviderId;
  latency: number;
  cost: number;
  tokens: number;
  status: TraceStatus;
  timestamp: string;
  events: TraceEvent[];
}
