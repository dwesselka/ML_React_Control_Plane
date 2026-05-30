export const queryKeys = {
  models: {
    all: ["models"] as const,
    list: (params?: Record<string, string>) => ["models", "list", params] as const,
    detail: (id: string) => ["models", "detail", id] as const,
    metrics: (id: string) => ["models", "metrics", id] as const,
    versions: (id: string) => ["models", "versions", id] as const,
  },
  experiments: {
    all: ["experiments"] as const,
    list: (params?: Record<string, string>) => ["experiments", "list", params] as const,
    detail: (id: string) => ["experiments", "detail", id] as const,
    runs: (id: string) => ["experiments", "runs", id] as const,
  },
  deployments: {
    all: ["deployments"] as const,
    list: (params?: Record<string, string>) => ["deployments", "list", params] as const,
    detail: (id: string) => ["deployments", "detail", id] as const,
    logs: (id: string) => ["deployments", "logs", id] as const,
    metrics: (id: string) => ["deployments", "metrics", id] as const,
  },
  datasets: {
    all: ["datasets"] as const,
    list: (params?: Record<string, string>) => ["datasets", "list", params] as const,
    detail: (id: string) => ["datasets", "detail", id] as const,
  },
  pipelines: {
    all: ["pipelines"] as const,
    list: (params?: Record<string, string>) => ["pipelines", "list", params] as const,
    detail: (id: string) => ["pipelines", "detail", id] as const,
    runs: (id: string) => ["pipelines", "runs", id] as const,
  },
  metrics: {
    all: ["metrics"] as const,
    overview: () => ["metrics", "overview"] as const,
    realtime: () => ["metrics", "realtime"] as const,
  },
  dashboard: {
    all: ["dashboard"] as const,
    stats: () => ["dashboard", "stats"] as const,
    activity: () => ["dashboard", "activity"] as const,
  },
} as const;
