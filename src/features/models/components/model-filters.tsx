"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, X, SlidersHorizontal } from "lucide-react";
import type { ModelRegistryFilters, Environment, ProviderName } from "../types";

const statusOptions: ModelRegistryFilters["status"] = ["active", "inactive", "draft", "archived"];
const environmentOptions: Environment[] = ["development", "staging", "production"];
const providerOptions: ProviderName[] = [
  "Anthropic", "OpenAI", "Google", "Meta", "Mistral", "DeepSeek", "Cohere", "HuggingFace", "Azure", "Custom",
];
const frameworkOptions = ["PyTorch", "TensorFlow", "XGBoost", "Scikit-learn"];

interface ModelFiltersProps {
  filters: ModelRegistryFilters;
  onFilterChange: (partial: Partial<ModelRegistryFilters>) => void;
  onClear: () => void;
}

export function ModelFilters({ filters, onFilterChange, onClear }: ModelFiltersProps) {
  const [open, setOpen] = React.useState(false);

  function toggleArray<T>(arr: T[], item: T, setter: (arr: T[]) => void) {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  }

  const hasFilters =
    filters.status.length > 0 ||
    filters.environment.length > 0 ||
    filters.provider.length > 0 ||
    filters.framework.length > 0;
  const totalFilters =
    filters.status.length +
    filters.environment.length +
    filters.provider.length +
    filters.framework.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search models by name, description, or tags..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full rounded-lg border border-input bg-background pl-9 pr-8 py-2 text-xs outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: "" })}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border border-input px-3 py-2 text-xs font-medium transition-colors hover:bg-accent",
            open && "bg-accent",
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {totalFilters > 0 && (
            <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
              {totalFilters}
            </span>
          )}
        </button>
        {hasFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {open && (
        <div className="rounded-xl border bg-card p-4 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Status
              </p>
              <div className="flex flex-wrap gap-1.5">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      toggleArray(
                        filters.status,
                        s,
                        (arr) => onFilterChange({ status: arr }),
                      )
                    }
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-xs transition-colors",
                      filters.status.includes(s)
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
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Environment
              </p>
              <div className="flex flex-wrap gap-1.5">
                {environmentOptions.map((env) => (
                  <button
                    key={env}
                    onClick={() =>
                      toggleArray(
                        filters.environment,
                        env,
                        (arr) => onFilterChange({ environment: arr }),
                      )
                    }
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-xs transition-colors",
                      filters.environment.includes(env)
                        ? "border-primary/30 bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-muted-foreground/30",
                    )}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Provider
              </p>
              <div className="flex flex-wrap gap-1.5">
                {providerOptions.map((p) => (
                  <button
                    key={p}
                    onClick={() =>
                      toggleArray(
                        filters.provider,
                        p,
                        (arr) => onFilterChange({ provider: arr }),
                      )
                    }
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-xs transition-colors",
                      filters.provider.includes(p)
                        ? "border-primary/30 bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-muted-foreground/30",
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Framework
              </p>
              <div className="flex flex-wrap gap-1.5">
                {frameworkOptions.map((fw) => (
                  <button
                    key={fw}
                    onClick={() =>
                      toggleArray(
                        filters.framework,
                        fw,
                        (arr) => onFilterChange({ framework: arr }),
                      )
                    }
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-xs transition-colors",
                      filters.framework.includes(fw)
                        ? "border-primary/30 bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-muted-foreground/30",
                    )}
                  >
                    {fw}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
