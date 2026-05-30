import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";

export default function TracesLoading() {
  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <div className="px-6 space-y-1.5">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="px-6 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-2 w-2 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-3 w-72" />
                </div>
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceContainer>
  );
}
