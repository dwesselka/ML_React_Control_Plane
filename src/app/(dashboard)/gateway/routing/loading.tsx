import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceContainer } from "@/components/layout/workspace-container";

export default function GatewayLoading() {
  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <div className="px-6 space-y-1.5">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="px-6">
          <div className="rounded-xl border bg-card">
            <div className="p-4 border-b">
              <Skeleton className="h-4 w-full max-w-lg" />
            </div>
            <div className="p-4 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-72" />
                  </div>
                  <Skeleton className="h-5 w-12 rounded-md" />
                  <Skeleton className="h-5 w-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WorkspaceContainer>
  );
}
