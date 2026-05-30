"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { OnlineStatusProvider } from "./online-status";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <OnlineStatusProvider>{children}</OnlineStatusProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
