import { EnterpriseShell } from "@/components/layout/enterprise-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EnterpriseShell>{children}</EnterpriseShell>;
}
