import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { WorkspaceContainer } from "@/components/layout/workspace-container";

export default function DashboardPage() {
  return (
    <WorkspaceContainer>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Dashboard"
          text="Overview of your ML platform"
        />
        <DashboardCards />
      </div>
    </WorkspaceContainer>
  );
}
