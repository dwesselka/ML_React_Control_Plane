import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Cloud, Server, HardDrive } from "lucide-react";

const providers = [
  { name: "AWS SageMaker", icon: Cloud, status: "Connected", region: "us-east-1" },
  { name: "GCP Vertex AI", icon: Cloud, status: "Connected", region: "us-central1" },
  { name: "Azure ML", icon: Server, status: "Disconnected", region: "eastus" },
  { name: "Self-hosted", icon: HardDrive, status: "Connected", region: "on-prem" },
];

export default function ProvidersPage() {
  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Providers"
          text="Manage your ML infrastructure providers"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {providers.map((p) => (
            <div key={p.name} className="rounded-xl border bg-card p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.region}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                p.status === "Connected" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  p.status === "Connected" ? "bg-success shadow-[0_0_6px] shadow-success/50" : "bg-destructive"
                }`} />
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceContainer>
  );
}
