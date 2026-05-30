import type {
  PlaygroundResponse,
  RoutingRule,
  RequestTrace,
} from "../types";

function now(offsetMs = 0): string {
  return new Date(Date.now() + offsetMs).toISOString();
}

export function mockPlaygroundResponse(prompt: string): PlaygroundResponse {
  return {
    id: `play-${crypto.randomUUID().slice(0, 8)}`,
    request: {
      prompt,
      strategy: "auto",
    },
    analysis: {
      taskType: "code_generation",
      complexity: "medium",
      estimatedCost: 0.004,
      estimatedTokens: 450,
      estimatedLatency: 1200,
    },
    decision: {
      selectedProvider: "deepseek-v4",
      reasoning: "Best cost/performance ratio for code generation tasks. DeepSeek V4 offers 4x lower cost than GPT-4o with comparable code quality scores (92% vs 94% on HumanEval).",
      confidence: 0.94,
      alternatives: [
        { provider: "gpt-4o", reason: "Slightly higher code quality (+2%), but 4x more expensive", costDiff: 0.012 },
        { provider: "claude-4", reason: "Better for complex architectural decisions", costDiff: 0.008 },
        { provider: "llama-4", reason: "Comparable quality but higher latency (2.1s vs 1.2s)", costDiff: -0.001 },
      ],
    },
    traces: [
      { timestamp: now(0), label: "Request Received", description: "Incoming request queued for processing", duration: 0, status: "completed" },
      { timestamp: now(50), label: "Task Classified", description: `Prompt analyzed: code_generation (confidence: 0.97)`, duration: 50, status: "completed" },
      { timestamp: now(120), label: "Provider Selected", description: "DeepSeek V4 selected via auto-router (cost: $0.004)", duration: 70, status: "completed" },
      { timestamp: now(140), label: "Request Sent", description: "Request forwarded to DeepSeek V4 endpoint", duration: 20, status: "completed" },
      { timestamp: now(980), label: "Response Generated", description: "Full response received (423 tokens, 1.2s latency)", duration: 840, status: "completed" },
    ],
    output: prompt.includes("React") || prompt.includes("login") || prompt.includes("page")
      ? `import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onSuccess?: (token: string) => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const { token } = await res.json();
      onSuccess?.(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-3 text-sm"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-10 text-sm"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}`
      : `Analysis complete. Task routed to ${prompt.includes("summary") ? "GPT-4o" : "DeepSeek V4"}.\n\nProcessed ${prompt.length} characters in 1.2s.`,
    generatedAt: now(1000),
  };
}

export const mockRoutingRules: RoutingRule[] = [
  {
    id: "rule-1",
    name: "Code Generation Priority",
    description: "Route code generation tasks to DeepSeek V4 for best cost/performance",
    strategy: "cost_optimized",
    priority: 100,
    conditions: {
      taskTypes: ["code_generation", "extraction"],
      maxCost: 0.01,
    },
    isActive: true,
    createdAt: "2026-03-15T10:00:00Z",
    updatedAt: "2026-05-20T14:30:00Z",
  },
  {
    id: "rule-2",
    name: "Low Latency Path",
    description: "Use Gemini 2 for real-time chat and text generation",
    strategy: "performance",
    priority: 90,
    conditions: {
      taskTypes: ["chat", "text_generation"],
      maxLatency: 500,
    },
    isActive: true,
    createdAt: "2026-04-01T08:00:00Z",
    updatedAt: "2026-05-22T09:15:00Z",
  },
  {
    id: "rule-3",
    name: "Critical Analysis",
    description: "Route complex analysis to Claude 4 for highest accuracy",
    strategy: "manual",
    priority: 80,
    conditions: {
      taskTypes: ["analysis", "classification"],
      providers: ["claude-4"],
    },
    isActive: true,
    createdAt: "2026-02-10T12:00:00Z",
    updatedAt: "2026-05-18T16:45:00Z",
  },
  {
    id: "rule-4",
    name: "Cost Saver",
    description: "Use self-hosted Llama 4 for batch summarization",
    strategy: "cost_optimized",
    priority: 70,
    conditions: {
      taskTypes: ["summarization", "translation"],
      maxCost: 0.002,
    },
    isActive: false,
    createdAt: "2026-05-01T06:00:00Z",
    updatedAt: "2026-05-25T11:00:00Z",
  },
];

function mockTraceEvent(offset: number, label: string, duration: number): { timestamp: string; label: string; description: string; duration: number; status: "completed" } {
  return {
    timestamp: new Date(Date.now() - offset).toISOString(),
    label,
    description: `${label.toLowerCase().replace(/\s+/g, " ")} processed in ${duration}ms`,
    duration,
    status: "completed",
  };
}

export const mockRequestTraces: RequestTrace[] = [
  {
    id: "trace-001",
    promptPreview: "Generate React login page with validation...",
    taskType: "code_generation",
    selectedProvider: "deepseek-v4",
    latency: 1240,
    cost: 0.004,
    tokens: 423,
    status: "completed",
    timestamp: new Date(Date.now() - 60000).toISOString(),
    events: [
      mockTraceEvent(60000, "Request Received", 0),
      mockTraceEvent(59950, "Task Classified", 48),
      mockTraceEvent(59880, "Provider Selected", 65),
      mockTraceEvent(59860, "Request Sent", 22),
      mockTraceEvent(58760, "Response Generated", 1100),
    ],
  },
  {
    id: "trace-002",
    promptPreview: "Summarize this 5000 word document about ML...",
    taskType: "summarization",
    selectedProvider: "gpt-4o",
    latency: 3400,
    cost: 0.018,
    tokens: 2100,
    status: "completed",
    timestamp: new Date(Date.now() - 180000).toISOString(),
    events: [
      mockTraceEvent(180000, "Request Received", 0),
      mockTraceEvent(179920, "Task Classified", 82),
      mockTraceEvent(179800, "Provider Selected", 120),
      mockTraceEvent(179780, "Request Sent", 24),
      mockTraceEvent(176600, "Response Generated", 3180),
    ],
  },
  {
    id: "trace-003",
    promptPreview: "Explain quantum computing in simple terms...",
    taskType: "text_generation",
    selectedProvider: "gemini-2",
    latency: 890,
    cost: 0.002,
    tokens: 312,
    status: "completed",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    events: [
      mockTraceEvent(300000, "Request Received", 0),
      mockTraceEvent(299940, "Task Classified", 58),
      mockTraceEvent(299880, "Provider Selected", 62),
      mockTraceEvent(299860, "Request Sent", 18),
      mockTraceEvent(299110, "Response Generated", 750),
    ],
  },
  {
    id: "trace-004",
    promptPreview: "Analyze sentiment of customer feedback dataset...",
    taskType: "analysis",
    selectedProvider: "claude-4",
    latency: 2100,
    cost: 0.015,
    tokens: 890,
    status: "completed",
    timestamp: new Date(Date.now() - 600000).toISOString(),
    events: [
      mockTraceEvent(600000, "Request Received", 0),
      mockTraceEvent(599910, "Task Classified", 92),
      mockTraceEvent(599820, "Provider Selected", 88),
      mockTraceEvent(599800, "Request Sent", 20),
      mockTraceEvent(597900, "Response Generated", 1900),
    ],
  },
  {
    id: "trace-005",
    promptPreview: "Translate API documentation from English to...",
    taskType: "translation",
    selectedProvider: "llama-4",
    latency: 3100,
    cost: 0.001,
    tokens: 1500,
    status: "failed",
    timestamp: new Date(Date.now() - 900000).toISOString(),
    events: [
      mockTraceEvent(900000, "Request Received", 0),
      mockTraceEvent(899920, "Task Classified", 78),
      mockTraceEvent(899850, "Provider Selected", 72),
      mockTraceEvent(899830, "Request Sent", 18),
      mockTraceEvent(898900, "Error: Rate Limited", 930),
    ],
  },
];
