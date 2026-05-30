"use client";

import * as React from "react";
import { ToggleLeft, ToggleRight, ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RoutingRule } from "../types";
import { Button } from "@/components/ui/button";

interface RoutingRulesTableProps {
  rules: RoutingRule[];
  onToggle: (id: string) => void;
}

const strategyLabels: Record<string, string> = {
  auto: "Auto",
  cost_optimized: "Cost",
  performance: "Speed",
  fallback: "Fallback",
  manual: "Manual",
};

export function RoutingRulesTable({ rules, onToggle }: RoutingRulesTableProps) {
  const sorted = React.useMemo(
    () => [...rules].sort((a, b) => b.priority - a.priority),
    [rules],
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs text-muted-foreground">
            <th className="pb-3 pr-4 font-medium">Status</th>
            <th className="pb-3 pr-4 font-medium">Name</th>
            <th className="pb-3 pr-4 font-medium">Strategy</th>
            <th className="pb-3 pr-4 font-medium">Priority</th>
            <th className="pb-3 pr-4 font-medium">Task Types</th>
            <th className="pb-3 pr-4 font-medium">Updated</th>
            <th className="pb-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((rule) => (
            <tr key={rule.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
              <td className="py-3 pr-4">
                <button
                  onClick={() => onToggle(rule.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                    rule.isActive ? "bg-success/10 text-success" : "bg-muted text-muted-foreground",
                  )}
                >
                  {rule.isActive ? (
                    <ToggleRight className="h-3 w-3" />
                  ) : (
                    <ToggleLeft className="h-3 w-3" />
                  )}
                  {rule.isActive ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="py-3 pr-4">
                <div className="font-medium">{rule.name}</div>
                <div className="text-[11px] text-muted-foreground">{rule.description}</div>
              </td>
              <td className="py-3 pr-4">
                <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium">
                  {strategyLabels[rule.strategy]}
                </span>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                  <span className="tabular-nums">{rule.priority}</span>
                </div>
              </td>
              <td className="py-3 pr-4">
                <div className="flex flex-wrap gap-1">
                  {rule.conditions.taskTypes.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {t.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 pr-4 text-xs text-muted-foreground tabular-nums">
                {new Date(rule.updatedAt).toLocaleDateString("pt-BR")}
              </td>
              <td className="py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
