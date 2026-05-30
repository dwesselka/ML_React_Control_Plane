import type { AgentDefinition, AgentRun } from "../types";

function step(id: string, label: string, description: string, status: "pending" | "running" | "completed" | "failed", duration: number, details?: string): AgentRun["steps"][0] {
  return { id, label, description, status, duration, details };
}

function run(
  id: string,
  overrides: Partial<AgentRun>,
  steps: AgentRun["steps"],
): AgentRun {
  return {
    id,
    agentName: "Code Reviewer",
    agentIcon: "GitBranch",
    category: "code",
    status: "running",
    steps,
    input: "",
    output: "",
    model: "gpt-4o",
    tokens: 0,
    cost: 0,
    startedAt: new Date(Date.now() - 300000).toISOString(),
    ...overrides,
  };
}

export const mockAgentRuns: AgentRun[] = [
  run("run-001", {
    agentName: "Code Reviewer",
    agentIcon: "GitBranch",
    category: "code",
    status: "running",
    input: "PR #342: feat/add-model-registry-api",
    model: "gpt-4o",
    tokens: 12450,
    cost: 0.042,
    startedAt: new Date(Date.now() - 45000).toISOString(),
  }, [
    step("s1", "Read Repository", "Cloning branch feat/add-model-registry-api", "completed", 3200, "3 files changed, 142 additions, 23 deletions"),
    step("s2", "Analyze Changes", "Running static analysis on diff", "completed", 8400, "Found 2 potential issues, 1 performance concern"),
    step("s3", "Generate Review", "Generating structured code review", "running", 1800, "Reviewing TypeScript types and API routes"),
    step("s4", "Open PR", "Creating review comments on GitHub", "pending", 0),
    step("s5", "Completed", "Review cycle finished", "pending", 0),
  ]),
  run("run-002", {
    agentName: "PR Analyzer",
    agentIcon: "GitPullRequest",
    category: "analysis",
    status: "success",
    input: "PR #341: fix/auth-flow-redirect",
    model: "gpt-4o",
    tokens: 8900,
    cost: 0.028,
    startedAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date(Date.now() - 3540000).toISOString(),
  }, [
    step("s1", "Read Repository", "Cloning branch fix/auth-flow-redirect", "completed", 2800, "2 files changed, 89 additions, 12 deletions"),
    step("s2", "Analyze Changes", "Running static analysis on diff", "completed", 5600, "No critical issues found. 1 style suggestion."),
    step("s3", "Generate Review", "Generating structured code review", "completed", 3200, "Score: 92/100. Approved with minor suggestions."),
    step("s4", "Open PR", "Creating review comments on GitHub", "completed", 1800, "Added 3 comments, approved with suggestions"),
    step("s5", "Completed", "Review cycle finished", "completed", 0, "Total time: 13.4s"),
  ]),
  run("run-003", {
    agentName: "Documentation Writer",
    agentIcon: "FileText",
    category: "documentation",
    status: "failed",
    input: "Write API docs for /api/v1/models endpoint",
    model: "claude-4",
    tokens: 3200,
    cost: 0.018,
    startedAt: new Date(Date.now() - 7200000).toISOString(),
    completedAt: new Date(Date.now() - 7185000).toISOString(),
    error: "OpenAPI spec not found at expected path. Aborting documentation generation.",
  }, [
    step("s1", "Read OpenAPI Spec", "Fetching OpenAPI specification from /api/v1/models/openapi.json", "completed", 2100, "Spec found: 12 endpoints, 8 schemas"),
    step("s2", "Analyze Endpoints", "Parsing endpoint definitions and request/response schemas", "completed", 5400, "Analyzed 12 endpoints, 24 request parameters"),
    step("s3", "Generate Docs", "Writing markdown documentation with examples", "failed", 3200, "Error: OpenAPI reference mismatch - referenced schema 'ModelV2' not found"),
    step("s4", "Open PR", "Creating documentation PR with generated content", "pending", 0),
    step("s5", "Completed", "Documentation generation finished", "pending", 0),
  ]),
  run("run-004", {
    agentName: "Test Generator",
    agentIcon: "TestTube",
    category: "code",
    status: "success",
    input: "Generate unit tests for src/services/api-client.ts",
    model: "gpt-4o",
    tokens: 15600,
    cost: 0.048,
    startedAt: new Date(Date.now() - 10800000).toISOString(),
    completedAt: new Date(Date.now() - 10710000).toISOString(),
  }, [
    step("s1", "Read Source", "Reading source file and its dependencies", "completed", 4200, "Read 3 files: api-client.ts, http.ts, types.ts"),
    step("s2", "Analyze Coverage", "Checking existing test coverage gaps", "completed", 3800, "32 uncovered branches identified"),
    step("s3", "Generate Tests", "Writing test cases with mocks and assertions", "completed", 12000, "Generated 24 test cases covering 89% of branches"),
    step("s4", "Run Tests", "Executing generated tests against the codebase", "completed", 8500, "22/24 passed, 2 failed (expected - missing mocks)"),
    step("s5", "Open PR", "Creating PR with test file additions", "completed", 3600, "PR #345 opened: Add unit tests for api-client.ts"),
  ]),
  run("run-005", {
    agentName: "Performance Auditor",
    agentIcon: "Gauge",
    category: "monitoring",
    status: "running",
    input: "Audit dashboard page performance metrics",
    model: "gpt-4o",
    tokens: 8900,
    cost: 0.032,
    startedAt: new Date(Date.now() - 180000).toISOString(),
  }, [
    step("s1", "Collect Metrics", "Fetching Lighthouse and RUM data", "completed", 5400, "LCP: 2.4s, CLS: 0.08, TTI: 3.1s, FCP: 1.2s"),
    step("s2", "Analyze Bundle", "Running bundle analysis on dashboard chunk", "completed", 7800, "1.2MB total, 340KB unused (28% waste)"),
    step("s3", "Generate Report", "Creating performance optimization report", "running", 4200, "Analyzing lazy-loading opportunities"),
    step("s4", "Suggest Fixes", "Generating code-level optimization suggestions", "pending", 0),
    step("s5", "Open Issue", "Creating GitHub issue with findings", "pending", 0),
  ]),
  run("run-006", {
    agentName: "Schema Migrator",
    agentIcon: "Database",
    category: "automation",
    status: "success",
    input: "Generate migration from Prisma schema v2 to v3",
    model: "claude-4",
    tokens: 22000,
    cost: 0.085,
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 86310000).toISOString(),
  }, [
    step("s1", "Read Schemas", "Reading v2 and v3 schema definitions", "completed", 5200, "v2: 24 models, 86 fields. v3: 28 models, 104 fields"),
    step("s2", "Diff Analysis", "Computing schema differences and breaking changes", "completed", 8400, "4 new models, 18 new fields, 3 renames, 2 removals"),
    step("s3", "Generate Migration", "Writing migration script with data transforms", "completed", 15000, "Generated migration file: 340 lines"),
    step("s4", "Validate", "Running migration against staging DB snapshot", "completed", 28000, "All 24 existing models migrated successfully. Data integrity: 100%"),
    step("s5", "Open PR", "Creating PR with migration and rollback plan", "completed", 3400, "PR #340 opened: Schema migration v2→v3"),
  ]),
];

export const mockAgents: AgentDefinition[] = [
  { id: "agent-1", name: "Code Reviewer", description: "Automated code review for pull requests", category: "code", icon: "GitBranch", model: "gpt-4o", runs: 1247, successRate: 94.2, avgLatency: 12400, avgCost: 0.038, isActive: true },
  { id: "agent-2", name: "PR Analyzer", description: "Analyze PR impact and generate summaries", category: "analysis", icon: "GitPullRequest", model: "gpt-4o", runs: 892, successRate: 97.8, avgLatency: 8400, avgCost: 0.024, isActive: true },
  { id: "agent-3", name: "Documentation Writer", description: "Auto-generate documentation from code", category: "documentation", icon: "FileText", model: "claude-4", runs: 456, successRate: 88.5, avgLatency: 18200, avgCost: 0.056, isActive: true },
  { id: "agent-4", name: "Test Generator", description: "Generate unit and integration tests", category: "code", icon: "TestTube", model: "gpt-4o", runs: 678, successRate: 91.3, avgLatency: 28500, avgCost: 0.072, isActive: true },
  { id: "agent-5", name: "Performance Auditor", description: "Audit frontend performance and generate reports", category: "monitoring", icon: "Gauge", model: "gpt-4o", runs: 234, successRate: 96.1, avgLatency: 18600, avgCost: 0.045, isActive: true },
  { id: "agent-6", name: "Schema Migrator", description: "Generate and validate database migrations", category: "automation", icon: "Database", model: "claude-4", runs: 189, successRate: 93.7, avgLatency: 42000, avgCost: 0.098, isActive: false },
];
