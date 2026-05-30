"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EnterpriseShell } from "@/components/layout/enterprise-shell";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EnterpriseShell>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>
        <div className="text-center space-y-1.5">
          <h2 className="text-lg font-semibold">Something went wrong</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            {error.message ?? "An unexpected error occurred in this page. The sidebar and navigation are still available."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={reset}>
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <Home className="mr-1.5 h-3.5 w-3.5" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </EnterpriseShell>
  );
}
