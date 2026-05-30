"use client";

import * as React from "react";
import { useAppStore } from "@/stores";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const isOnline = useAppStore((s) => s.isOnline);

  if (isOnline) return null;

  return (
    <div className="flex items-center justify-center gap-2 bg-destructive px-4 py-2 text-xs font-medium text-destructive-foreground">
      <WifiOff className="h-3.5 w-3.5" />
      You are offline. Showing cached data.
    </div>
  );
}
