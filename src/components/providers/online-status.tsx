"use client";

import * as React from "react";
import { useAppStore } from "@/stores";

export function OnlineStatusProvider({ children }: { children: React.ReactNode }) {
  const setOnline = useAppStore((s) => s.setOnline);

  React.useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setOnline(navigator.onLine);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setOnline]);

  return <>{children}</>;
}
