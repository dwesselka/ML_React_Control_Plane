export type EventSeverity = "critical" | "high" | "medium" | "low" | "info";

export type EventCategory =
  | "latency"
  | "failover"
  | "retry"
  | "timeout"
  | "queue"
  | "degraded"
  | "deployment"
  | "model"
  | "resource"
  | "security";

export type EventProvider =
  | "OpenAI"
  | "Claude"
  | "Gemini"
  | "Ollama"
  | "DeepSeek"
  | "AWS"
  | "GCP"
  | "Azure"
  | "System";

export interface RealtimeEvent {
  id: string;
  type: EventCategory;
  severity: EventSeverity;
  title: string;
  description: string;
  provider: EventProvider;
  category: EventCategory;
  metadata: Record<string, string>;
  timestamp: string;
  acknowledged: boolean;
}

export interface EventFilter {
  severity: EventSeverity[];
  category: EventCategory[];
  provider: EventProvider[];
}

export interface EventSummary {
  total: number;
  critical: number;
  high: number;
  unacknowledged: number;
  byCategory: Partial<Record<EventCategory, number>>;
}
