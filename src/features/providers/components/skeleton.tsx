"use client";

import * as React from "react";

export function ProviderCardsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card px-3 py-2.5">
            <div className="h-3 w-16 bg-primary/5 rounded animate-pulse mb-1" />
            <div className="h-5 w-12 bg-primary/5 rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/5 animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-4 w-20 bg-primary/5 rounded animate-pulse" />
                  <div className="h-3 w-12 bg-primary/5 rounded animate-pulse" />
                </div>
              </div>
              <div className="h-5 w-16 bg-primary/5 rounded-full animate-pulse" />
            </div>
            <div className="h-7 w-full bg-primary/5 rounded animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="flex justify-between">
                  <div className="h-3 w-16 bg-primary/5 rounded animate-pulse" />
                  <div className="h-3 w-12 bg-primary/5 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
