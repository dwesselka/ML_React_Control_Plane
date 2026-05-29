import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardCards } from "@/components/dashboard/dashboard-cards";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text="Overview of your ML platform"
      />
      <DashboardCards />
    </>
  );
}
