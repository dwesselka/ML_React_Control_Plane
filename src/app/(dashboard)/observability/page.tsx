import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function ObservabilityPage() {
  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Observability"
          text="Monitor metrics, logs, and traces across your ML platform"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Requests", value: "2.4M", change: "+12%" },
            { label: "Avg Latency", value: "28ms", change: "-5%" },
            { label: "Error Rate", value: "1.2%", change: "-0.3%" },
            { label: "P99 Latency", value: "120ms", change: "+8%" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-5">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <p className={`text-xs mt-1 ${
                stat.change.startsWith("+") ? "text-success" : stat.change.startsWith("-") ? "text-destructive" : ""
              }`}>{stat.change} vs last week</p>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceContainer>
  );
}
