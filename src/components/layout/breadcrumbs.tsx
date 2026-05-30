"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Cpu } from "lucide-react";

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  "system-health": "System Health",
  models: "Model Registry",
  providers: "Providers",
  observability: "Observability",
  settings: "Settings",
  gateway: "AI Gateway",
  playground: "Playground",
  prompts: "Prompt Registry",
  routing: "Routing Rules",
  traces: "Request Traces",
  agents: "Agent Runs",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  const segments = React.useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    return parts.map((part, index) => {
      const href = "/" + parts.slice(0, index + 1).join("/");
      const label = routeLabels[part] ?? part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return { label, href, isLast: index === parts.length - 1 };
    });
  }, [pathname]);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        <Cpu className="h-3.5 w-3.5" />
        <span className="sr-only">Home</span>
      </Link>
      {segments.map((segment) => (
        <React.Fragment key={segment.href}>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
          {segment.isLast ? (
            <span
              className="font-medium text-foreground"
              aria-current="page"
            >
              {segment.label}
            </span>
          ) : (
            <Link
              href={segment.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {segment.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
