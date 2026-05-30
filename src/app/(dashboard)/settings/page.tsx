"use client";

import * as React from "react";
import { WorkspaceContainer } from "@/components/layout/workspace-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { cn } from "@/lib/utils";
import { User, Building2, Key, Bell, CreditCard, Users } from "lucide-react";
import type { SettingsTab } from "@/features/settings/types";
import { toast } from "sonner";

const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User className="h-3.5 w-3.5" /> },
  { id: "organization", label: "Organization", icon: <Building2 className="h-3.5 w-3.5" /> },
  { id: "api-keys", label: "API Keys", icon: <Key className="h-3.5 w-3.5" /> },
  { id: "members", label: "Members", icon: <Users className="h-3.5 w-3.5" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="h-3.5 w-3.5" /> },
  { id: "billing", label: "Billing", icon: <CreditCard className="h-3.5 w-3.5" /> },
];

const mockProfile = {
  name: "Diego Oliveira",
  email: "diego@example.com",
  role: "Admin" as const,
  team: "ML Platform",
};

export default function SettingsPage() {
  const [tab, setTab] = React.useState<SettingsTab>("profile");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <WorkspaceContainer>
        <DashboardHeader heading="Settings" text="Manage your account and team preferences" />
      </WorkspaceContainer>
    );
  }

  return (
    <WorkspaceContainer>
      <DashboardHeader heading="Settings" text="Manage your account and team preferences" />

      <div className="flex flex-col gap-6 xl:flex-row">
        <nav className="flex shrink-0 gap-1 xl:w-48 xl:flex-col">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                tab === t.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 space-y-5">
          {tab === "profile" && (
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-semibold">Profile</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Name</label>
                  <input defaultValue={mockProfile.name} className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Email</label>
                  <input defaultValue={mockProfile.email} className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Role</label>
                  <input defaultValue={mockProfile.role} disabled className="w-full rounded-lg border bg-muted px-3 py-2 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Team</label>
                  <input defaultValue={mockProfile.team} disabled className="w-full rounded-lg border bg-muted px-3 py-2 text-sm" />
                </div>
              </div>
              <button
                onClick={() => toast.success("Profile updated (simulated)")}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}

          {tab === "api-keys" && (
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-semibold">API Keys</h3>
              <p className="text-xs text-muted-foreground">Manage API keys for programmatic access.</p>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Production Key</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">sk-••••••••••••a3f2</div>
                  </div>
                  <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-[10px] font-medium text-success">Active</span>
                </div>
              </div>
              <button
                onClick={() => toast.success("New API key generated (simulated)")}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Generate New Key
              </button>
            </div>
          )}

          {tab === "organization" && (
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-semibold">Organization</h3>
              <p className="text-xs text-muted-foreground">Organization settings (simulated).</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Organization Name</label>
                  <input defaultValue="ML Platform Team" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                </div>
              </div>
              <button
                onClick={() => toast.success("Organization updated (simulated)")}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          )}

          {tab === "members" && (
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-semibold">Members</h3>
              <p className="text-xs text-muted-foreground">Team members list (simulated).</p>
              {["Alice Chen", "Bob Smith", "Carol Davis"].map((name) => (
                <div key={name} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{name}</div>
                    <div className="text-xs text-muted-foreground">Member</div>
                  </div>
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">Active</span>
                </div>
              ))}
            </div>
          )}

          {(tab === "notifications" || tab === "billing") && (
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-sm font-semibold capitalize">{tab}</h3>
              <p className="text-xs text-muted-foreground">
                {tab === "notifications" ? "Notification preferences (simulated)." : "Billing information (simulated)."}
              </p>
              <div className="rounded-lg border border-dashed p-6 text-center">
                <p className="text-xs text-muted-foreground">This section is under development.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </WorkspaceContainer>
  );
}
