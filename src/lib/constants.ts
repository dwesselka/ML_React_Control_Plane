export const APP_NAME = "ML Control Plane";

export const API_VERSION = "v1";

export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  models: "/models",
  experiments: "/experiments",
  deployments: "/deployments",
  datasets: "/datasets",
  pipelines: "/pipelines",
  settings: "/settings",
  login: "/login",
} as const;

export const QUERY_KEYS = {
  models: "models",
  model: "model",
  experiments: "experiments",
  experiment: "experiment",
  deployments: "deployments",
  deployment: "deployment",
  datasets: "datasets",
  dataset: "dataset",
  pipelines: "pipelines",
  pipeline: "pipeline",
  metrics: "metrics",
  logs: "logs",
} as const;

export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

export const REFRESH_INTERVALS = {
  metrics: 10_000,
  deployments: 15_000,
  logs: 5_000,
} as const;
