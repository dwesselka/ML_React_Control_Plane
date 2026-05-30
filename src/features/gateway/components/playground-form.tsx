"use client";

import * as React from "react";
import { Send, Sparkles } from "lucide-react";
import type { RouterStrategy } from "../types";

interface PlaygroundFormProps {
  onSimulate: (prompt: string, strategy: RouterStrategy) => void;
  loading: boolean;
}

const strategies: { value: RouterStrategy; label: string; description: string }[] = [
  { value: "auto", label: "Auto Router", description: "AI selects optimal provider based on cost, latency, and quality" },
  { value: "cost_optimized", label: "Cost Optimized", description: "Prioritize lowest-cost providers within quality thresholds" },
  { value: "performance", label: "Performance", description: "Prefer lowest-latency providers for real-time use cases" },
  { value: "fallback", label: "Fallback Chain", description: "Try providers in sequence until successful response" },
  { value: "manual", label: "Manual", description: "Explicitly select a specific provider" },
];

export function PlaygroundForm({ onSimulate, loading }: PlaygroundFormProps) {
  const [prompt, setPrompt] = React.useState("");
  const [strategy, setStrategy] = React.useState<RouterStrategy>("auto");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    onSimulate(prompt.trim(), strategy);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Prompt</label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here... e.g. Generate a React login page with form validation"
            rows={4}
            className="w-full rounded-lg border bg-card p-3 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          />
          <kbd className="absolute bottom-3 right-3 hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground md:inline">
            ⌘⏎
          </kbd>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Routing Strategy</label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {strategies.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStrategy(s.value)}
              className={`rounded-lg border p-3 text-left transition-all ${
                strategy === s.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "bg-card hover:border-primary/30"
              }`}
            >
              <div className="text-xs font-medium">{s.label}</div>
              <div className="mt-0.5 text-[10px] text-muted-foreground leading-relaxed">
                {s.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!prompt.trim() || loading}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {loading ? (
          <>
            <Sparkles className="h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Request
          </>
        )}
      </button>
    </form>
  );
}
