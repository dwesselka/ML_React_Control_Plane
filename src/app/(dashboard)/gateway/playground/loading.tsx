import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";

export default function PlaygroundLoading() {
  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <div className="px-6 space-y-1.5">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid gap-6 xl:grid-cols-3 px-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="rounded-xl border bg-card p-5 space-y-4">
              <Skeleton className="h-20 w-full rounded-lg" />
              <div className="grid gap-2 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-4 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="rounded-xl border bg-card p-4 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </aside>
        </div>
      </div>
    </WorkspaceContainer>
  );
}
