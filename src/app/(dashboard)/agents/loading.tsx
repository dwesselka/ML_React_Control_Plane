import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";

export default function AgentsLoading() {
  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <div className="px-6 space-y-1.5">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid gap-4 px-6 grid-cols-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-12" />
            </div>
          ))}
        </div>
        <div className="px-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-64" />
                </div>
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceContainer>
  );
}
