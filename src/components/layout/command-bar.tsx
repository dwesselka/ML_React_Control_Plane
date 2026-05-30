"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

const commands = [
  { label: "Go to Dashboard", href: "/dashboard" },
  { label: "Go to System Health", href: "/system-health" },
  { label: "Go to Model Registry", href: "/models" },
  { label: "Go to Providers", href: "/providers" },
  { label: "Go to Observability", href: "/observability" },
  { label: "Go to Agent Runs", href: "/agents" },
  { label: "Go to AI Playground", href: "/gateway/playground" },
  { label: "Go to Prompt Registry", href: "/gateway/prompts" },
  { label: "Go to Routing Rules", href: "/gateway/routing" },
  { label: "Go to Request Traces", href: "/gateway/traces" },
  { label: "Go to Settings", href: "/settings" },
];

export function CommandBar() {
  const router = useRouter();
  const { commandBarOpen, closeCommandBar, openCommandBar } = useUIStore();
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = React.useMemo(
    () =>
      query
        ? commands.filter((c) =>
            c.label.toLowerCase().includes(query.toLowerCase()),
          )
        : commands,
    [query],
  );

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (commandBarOpen) closeCommandBar();
        else openCommandBar();
      }
      if (e.key === "Escape") closeCommandBar();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandBarOpen, closeCommandBar, openCommandBar]);

  React.useEffect(() => {
    if (commandBarOpen) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [commandBarOpen]);

  function handleSelect(href: string) {
    closeCommandBar();
    router.push(href);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    }
    if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]!.href);
    }
  }

  if (!commandBarOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={closeCommandBar}
      />
      <div
        className={cn(
          "fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2",
          "rounded-xl border bg-card shadow-2xl",
          "animate-in fade-in slide-in-from-top-2 duration-200",
        )}
      >
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden shrink-0 items-center gap-1 rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No results found
            </p>
          ) : (
            filtered.map((cmd, index) => (
              <button
                key={cmd.href}
                onClick={() => handleSelect(cmd.href)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-left transition-colors",
                  index === selectedIndex
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-accent/50",
                )}
              >
                <span>{cmd.label}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
