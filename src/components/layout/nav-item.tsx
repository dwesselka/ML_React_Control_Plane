"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export function NavItem({
  href,
  label,
  icon: Icon,
  badge,
  isCollapsed,
  onClick,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      title={isCollapsed ? label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isCollapsed ? "justify-center px-2 py-2" : "px-3 py-2.5",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
      )}
      <Icon
        className={cn(
          "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
          isActive && "scale-110",
        )}
      />
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge !== undefined && (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                "bg-primary/10 text-primary",
              )}
            >
              {badge}
            </span>
          )}
        </>
      )}
      {isCollapsed && badge !== undefined && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
          {badge}
        </span>
      )}
    </Link>
  );
}
