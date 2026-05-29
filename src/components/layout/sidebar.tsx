import Link from "next/link";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import {
  LayoutDashboard,
  Box,
  FlaskConical,
  Rocket,
  Database,
  GitBranch,
  Settings,
  Cpu,
} from "lucide-react";

const navItems = [
  { href: ROUTES.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.models, label: "Models", icon: Box },
  { href: ROUTES.experiments, label: "Experiments", icon: FlaskConical },
  { href: ROUTES.deployments, label: "Deployments", icon: Rocket },
  { href: ROUTES.datasets, label: "Datasets", icon: Database },
  { href: ROUTES.pipelines, label: "Pipelines", icon: GitBranch },
  { href: ROUTES.settings, label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-sidebar lg:flex lg:flex-col">
      <div className="flex h-14 items-center gap-2 border-b px-6">
        <Cpu className="h-6 w-6 text-primary" />
        <span className="font-semibold">ML Control Plane</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
