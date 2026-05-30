import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { CommandBar } from "./command-bar";
import { OfflineBanner } from "./offline-banner";
import { cn } from "@/lib/utils";

interface EnterpriseShellProps {
  children: React.ReactNode;
}

export function EnterpriseShell({ children }: EnterpriseShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <OfflineBanner />
        <Topbar />
        <main
          className={cn(
            "flex-1 overflow-y-auto",
            "py-6 sm:py-8 lg:py-10",
          )}
        >
          {children}
        </main>
      </div>
      <CommandBar />
    </div>
  );
}
