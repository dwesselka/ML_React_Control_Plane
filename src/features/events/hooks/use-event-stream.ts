"use client";

import * as React from "react";
import type { RealtimeEvent } from "../types";
import { mockEvents } from "../mocks";

function generateEvent(): RealtimeEvent {
  const providers = ["OpenAI", "Claude", "Gemini", "Ollama", "DeepSeek", "AWS", "GCP", "Azure", "System"] as const;
  const severities = ["critical", "high", "medium", "low", "info"] as const;
  const types = ["latency", "failover", "retry", "timeout", "queue", "degraded", "deployment", "model", "resource"] as const;

  const type = types[Math.floor(Math.random() * types.length)]!;
  const severity = severities[Math.floor(Math.random() * severities.length)]!;
  const provider = providers[Math.floor(Math.random() * providers.length)]!;

  const titles: Record<string, string> = {
    latency: `Latency spike on ${provider}`,
    failover: `Failover triggered for ${provider}`,
    retry: `Retry loop detected - ${provider}`,
    timeout: `Request timeout - ${provider}`,
    queue: `Queue backpressure - ${provider}`,
    degraded: `Degraded performance - ${provider}`,
    deployment: `Deployment completed`,
    model: `Model version updated`,
    resource: `Resource warning - ${provider}`,
  };

  return {
    id: `evt-${crypto.randomUUID().slice(0, 8)}`,
    type,
    severity,
    title: titles[type] ?? `Event from ${provider}`,
    description: `Auto-generated ${type} event from ${provider}`,
    provider,
    category: type,
    metadata: { source: "auto-generated" },
    timestamp: new Date().toISOString(),
    acknowledged: false,
  };
}

export function useEventStream(intervalMs = 6000) {
  const [events, setEvents] = React.useState<RealtimeEvent[]>(mockEvents);
  const [paused, setPaused] = React.useState(false);
  const latestRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      const newEvent = generateEvent();
      setEvents((prev) => [newEvent, ...prev].slice(0, 200));
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs, paused]);

  const acknowledge = React.useCallback((id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, acknowledged: true } : e)),
    );
  }, []);

  const acknowledgeAll = React.useCallback(() => {
    setEvents((prev) => prev.map((e) => ({ ...e, acknowledged: true })));
  }, []);

  return {
    events,
    paused,
    setPaused,
    acknowledge,
    acknowledgeAll,
    latestRef,
  };
}
