"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { EventCategory, EventSeverity } from "../types";
import { Search, X } from "lucide-react";

const severityOptions: EventSeverity[] = ["critical", "high", "medium", "low", "info"];
const categoryOptions: EventCategory[] = [
  "latency", "failover", "retry", "timeout", "queue", "degraded", "deployment", "model", "resource", "security",
];

interface EventFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  severity: EventSeverity[];
  onSeverityChange: (v: EventSeverity[]) => void;
  category: EventCategory[];
  onCategoryChange: (v: EventCategory[]) => void;
}

export function EventFilters({
  search,
  onSearchChange,
  severity,
  onSeverityChange,
  category,
  onCategoryChange,
}: EventFiltersProps) {
  const [open, setOpen] = React.useState(false);

  function toggleSeverity(s: EventSeverity) {
    onSeverityChange(
      severity.includes(s) ? severity.filter((x) => x !== s) : [...severity, s],
    );
  }

  function toggleCategory(c: EventCategory) {
    onCategoryChange(
      category.includes(c) ? category.filter((x) => x !== c) : [...category, c],
    );
  }

  const hasFilters = severity.length > 0 || category.length > 0;

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-xs outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* Filter toggles */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
            open && "text-foreground",
          )}
        >
          Filters {hasFilters && `(${severity.length + category.length})`}
        </button>
        {hasFilters && (
          <button
            onClick={() => {
              onSeverityChange([]);
              onCategoryChange([]);
            }}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {open && (
        <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-200">
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Severity
            </p>
            <div className="flex flex-wrap gap-1.5">
              {severityOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSeverity(s)}
                  className={cn(
                    "rounded-md border px-2 py-1 text-xs transition-colors",
                    severity.includes(s)
                      ? "border-primary/30 bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-muted-foreground/30",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Category
            </p>
            <div className="flex flex-wrap gap-1.5">
              {categoryOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCategory(c)}
                  className={cn(
                    "rounded-md border px-2 py-1 text-xs transition-colors",
                    category.includes(c)
                      ? "border-primary/30 bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-muted-foreground/30",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
