"use client";

import * as React from "react";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { Breadcrumbs } from "./breadcrumbs";
import { ThemeToggle } from "./theme-toggle";
import { UserProfile } from "./user-profile";

export function Topbar() {
  const { setSidebarMobileOpen, openCommandBar } = useUIStore();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center border-b bg-background/80 backdrop-blur-sm transition-all duration-300",
        "px-4 sm:px-6",
      )}
    >
      {/* Mobile menu trigger */}
      <button
        onClick={() => setSidebarMobileOpen(true)}
        className="mr-3 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </button>

      {/* Breadcrumbs */}
      <div className="flex-1">
        <Breadcrumbs />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Search button */}
        <button
          onClick={openCommandBar}
          className={cn(
            "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-muted-foreground transition-colors",
            "hover:bg-accent hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "hidden sm:flex",
          )}
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search...</span>
          <kbd className="ml-2 rounded border bg-muted px-1 py-0.5 text-[10px] font-medium">
            ⌘K
          </kbd>
        </button>

        {/* Mobile search icon */}
        <button
          onClick={openCommandBar}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground sm:hidden"
        >
          <Search className="h-4 w-4" />
        </button>

        <ThemeToggle />
        <UserProfile />
      </div>
    </header>
  );
}
