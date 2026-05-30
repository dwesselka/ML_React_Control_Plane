"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Prompt, PromptCategory } from "../types";
import { ChevronRight, Layers } from "lucide-react";

const categoryLabels: Record<PromptCategory, string> = {
  customer_support: "Customer Support",
  fraud_detection: "Fraud Detection",
  code_review: "Code Review",
  document_summarization: "Document Summarization",
  content_generation: "Content Generation",
  data_extraction: "Data Extraction",
};

const categoryColors: Record<PromptCategory, string> = {
  customer_support: "bg-blue-500/10 text-blue-500",
  fraud_detection: "bg-red-500/10 text-red-500",
  code_review: "bg-purple-500/10 text-purple-500",
  document_summarization: "bg-emerald-500/10 text-emerald-500",
  content_generation: "bg-orange-500/10 text-orange-500",
  data_extraction: "bg-cyan-500/10 text-cyan-500",
};

interface PromptsTableProps {
  prompts: Prompt[];
  selectedId: string | null;
  onSelect: (prompt: Prompt) => void;
}

export function PromptsTable({ prompts, selectedId, onSelect }: PromptsTableProps) {
  return (
    <div className="divide-y">
      {prompts.map((prompt) => {
        const latest = prompt.versions[prompt.versions.length - 1];
        return (
          <button
            key={prompt.id}
            onClick={() => onSelect(prompt)}
            className={cn(
              "flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/30",
              selectedId === prompt.id && "bg-muted/50",
            )}
          >
            <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", categoryColors[prompt.category])}>
              <Layers className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{prompt.name}</span>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  prompt.status === "active" ? "bg-success/10 text-success" :
                  prompt.status === "draft" ? "bg-warning/10 text-warning" :
                  "bg-muted text-muted-foreground",
                )}>
                  {prompt.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-muted-foreground">{categoryLabels[prompt.category]}</span>
                <span className="text-[10px] text-muted-foreground/50">·</span>
                <span className="text-[11px] text-muted-foreground">v{latest?.version ?? 0}</span>
              </div>
            </div>
            <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", selectedId === prompt.id && "rotate-90")} />
          </button>
        );
      })}
    </div>
  );
}
