import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";


export default function SystemHealthPage() {
  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="System Health"
          text="Monitor the health and status of your ML infrastructure"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["API Gateway", "Model Serving", "Pipeline Runner", "Data Lake", "Feature Store", "Alert Manager"].map((service) => (
            <div key={service} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">{service}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_6px] shadow-success/50" />
                  Healthy
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Uptime 99.9%</span>
                <span>Latency 12ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceContainer>
  );
}
