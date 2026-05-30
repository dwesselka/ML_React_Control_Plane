export type AgentStatus = "running" | "success" | "failed" | "pending" | "paused";

export type AgentCategory = "code" | "documentation" | "analysis" | "monitoring" | "automation";

export interface AgentStep {
  id: string;
  label: string;
  description: string;
  status: "pending" | "running" | "completed" | "failed";
  duration: number;
  details?: string;
}

export interface AgentRun {
  id: string;
  agentName: string;
  agentIcon: string;
  category: AgentCategory;
  status: AgentStatus;
  steps: AgentStep[];
  input: string;
  output: string;
  model: string;
  tokens: number;
  cost: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
  branch?: string;
}

export interface AgentDefinition {
  id: string;
  name: string;
  description: string;
  category: AgentCategory;
  icon: string;
  model: string;
  runs: number;
  successRate: number;
  avgLatency: number;
  avgCost: number;
  isActive: boolean;
}
