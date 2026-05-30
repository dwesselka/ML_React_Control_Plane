"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { NavItem } from "./nav-item";
import {
  LayoutDashboard,
  Activity,
  Box,
  Cable,
  Eye,
  Settings,
  ChevronLeft,
  PanelLeftClose,
  PanelLeft,
  Cpu,
  X,
  Bot,
  Route,
  GitBranch,
  Layers,
  Workflow,
} from "lucide-react";

const navGroups: ({ type: "section"; label: string } | { type: "link"; href: string; label: string; icon: typeof Cpu })[] = [
  { type: "link", href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { type: "link", href: "/system-health", label: "System Health", icon: Activity },
  { type: "section", label: "Platform" },
  { type: "link", href: "/models", label: "Model Registry", icon: Box },
  { type: "link", href: "/providers", label: "Providers", icon: Cable },
  { type: "link", href: "/observability", label: "Observability", icon: Eye },
  { type: "section", label: "Agents" },
  { type: "link", href: "/agents", label: "Agent Runs", icon: Workflow },
  { type: "section", label: "AI Gateway" },
  { type: "link", href: "/gateway/playground", label: "Playground", icon: Bot },
  { type: "link", href: "/gateway/prompts", label: "Prompt Registry", icon: Layers },
  { type: "link", href: "/gateway/routing", label: "Routing Rules", icon: Route },
  { type: "link", href: "/gateway/traces", label: "Request Traces", icon: GitBranch },
  { type: "section", label: "Account" },
  { type: "link", href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { sidebar, sidebarMobileOpen, toggleSidebar, setSidebarMobileOpen } =
    useUIStore();
  const isCollapsed = sidebar === "collapsed";

  return (
    <>
      {/* Mobile overlay */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-sidebar transition-transform duration-300 ease-in-out lg:hidden",
          sidebarMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">ML Control Plane</span>
          </div>
          <button
            onClick={() => setSidebarMobileOpen(false)}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navGroups.map((item) =>
            item.type === "section" ? (
              <div key={item.label} className="px-3 pt-4 pb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {item.label}
                </span>
              </div>
            ) : (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                onClick={() => setSidebarMobileOpen(false)}
              />
            ),
          )}
        </nav>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden border-r bg-sidebar transition-all duration-300 ease-in-out lg:flex lg:flex-col",
          isCollapsed ? "w-16" : "w-60",
        )}
      >
        {/* Logo area */}
        <div
          className={cn(
            "flex h-14 items-center border-b transition-all duration-300",
            isCollapsed ? "justify-center px-0" : "justify-between px-4",
          )}
        >
          {isCollapsed ? (
            <Cpu className="h-5 w-5 text-primary" />
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">ML Control Plane</span>
              </div>
              <button
                onClick={toggleSidebar}
                className="rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover/sidebar:opacity-100"
                title="Collapse sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Collapse toggle button when collapsed */}
        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center py-2 text-muted-foreground hover:text-foreground"
            title="Expand sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {navGroups.map((item) =>
            item.type === "section" ? (
              !isCollapsed && (
                <div key={item.label} className="px-3 pt-4 pb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">
                    {item.label}
                  </span>
                </div>
              )
            ) : (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isCollapsed={isCollapsed}
              />
            ),
          )}
        </nav>

        {/* Collapse/Expand button at bottom */}
        <div
          className={cn(
            "border-t p-2",
            isCollapsed && "flex justify-center",
          )}
        >
          <button
            onClick={toggleSidebar}
            className={cn(
              "flex items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition-all hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isCollapsed
                ? "justify-center px-2 py-2"
                : "w-full px-3 py-2.5 hover:bg-accent/50",
            )}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={cn(
                "h-[18px] w-[18px] shrink-0 transition-transform duration-300",
                isCollapsed && "rotate-180",
              )}
            />
            {!isCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
