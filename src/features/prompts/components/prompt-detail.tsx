"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Prompt } from "../types";
import { Clock, User, BarChart3, Zap, DollarSign, CheckCircle } from "lucide-react";

interface PromptDetailProps {
  prompt: Prompt;
  selectedVersion: number;
  onVersionSelect: (version: number) => void;
}

export function PromptDetail({ prompt, selectedVersion, onVersionSelect }: PromptDetailProps) {
  const version = (prompt.versions.find((v) => v.version === selectedVersion) ?? prompt.versions[prompt.versions.length - 1])!;

  return (
    <div className="space-y-5 animate-in">
      {/* Version selector */}
      <div>
        <div className="text-xs font-medium text-muted-foreground mb-2">Version History</div>
        <div className="flex flex-wrap gap-1.5">
          {prompt.versions.map((v) => (
            <button
              key={v.version}
              onClick={() => onVersionSelect(v.version)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs transition-all",
                v.version === version.version
                  ? "border-primary bg-primary/5 text-primary font-medium"
                  : "bg-card text-muted-foreground hover:border-primary/30",
              )}
            >
              v{v.version}
              {v.version === prompt.currentVersion && (
                <span className="ml-1 text-[10px] text-success">active</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Version meta */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: User, label: "Author", value: version.createdBy },
          { icon: Clock, label: "Created", value: new Date(version.createdAt).toLocaleDateString("pt-BR") },
          { icon: BarChart3, label: "Accuracy", value: `${version.accuracy}%` },
          { icon: Zap, label: "Latency", value: `${version.latency}ms` },
          { icon: DollarSign, label: "Cost", value: `$${version.cost.toFixed(4)}` },
          { icon: CheckCircle, label: "Model", value: version.model },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-1">
              <item.icon className="h-3 w-3" />
              {item.label}
            </div>
            <div className="text-xs font-medium">{item.value}</div>
          </div>
        ))}
      </div>

      {/* System Prompt */}
      <div>
        <div className="text-xs font-medium text-muted-foreground mb-2">System Prompt</div>
        <div className="rounded-lg border bg-card">
          <pre className="overflow-x-auto p-4 text-[11px] leading-relaxed text-foreground/90 whitespace-pre-wrap font-mono">
            {version.systemPrompt}
          </pre>
        </div>
      </div>

      {/* Notes */}
      {version.notes && (
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-1.5">Release Notes</div>
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
            {version.notes}
          </div>
        </div>
      )}
    </div>
  );
}
