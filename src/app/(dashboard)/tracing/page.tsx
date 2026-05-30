import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function TracingPage() {
  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Request Tracing"
          text="Trace and debug requests across your ML inference pipeline"
        />
        <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
          <p className="text-sm">Tracing view coming soon</p>
        </div>
      </div>
    </WorkspaceContainer>
  );
}
