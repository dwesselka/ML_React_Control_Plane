import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";

export default function PromptsLoading() {
  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <div className="px-6 space-y-1.5">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid gap-6 xl:grid-cols-2 px-6">
          <div className="rounded-xl border bg-card">
            <div className="p-3 border-b">
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
            <div className="divide-y">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <div className="flex gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-12 rounded-lg" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border bg-card p-3 space-y-1.5">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </WorkspaceContainer>
  );
}
