"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Settings,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function UserProfile() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 rounded-lg p-1.5 transition-colors",
          "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
          DW
        </div>
        <div className="hidden text-left md:block">
          <p className="text-xs font-medium leading-tight">Diego Wesselka</p>
          <p className="text-[10px] leading-tight text-muted-foreground">Admin</p>
        </div>
        <ChevronDown
          className={cn(
            "hidden h-3.5 w-3.5 text-muted-foreground transition-transform md:block",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full mt-1 w-56 rounded-xl border bg-card p-1.5 shadow-xl",
            "animate-in fade-in slide-in-from-top-2 duration-200",
          )}
        >
          <div className="border-b px-2 pb-2 mb-1">
            <p className="text-sm font-medium">Diego Wesselka</p>
            <p className="text-xs text-muted-foreground">diego@mlplane.ai</p>
          </div>

          <button
            onClick={() => { setOpen(false); router.push("/settings"); }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-accent"
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
            Settings
          </button>
          <button
            onClick={() => { setOpen(false); }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-accent"
          >
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            What&apos;s new
          </button>
          <div className="border-t mt-1 pt-1">
            <button
              onClick={() => {
                setOpen(false);
                document.cookie = "session=; path=/; max-age=0";
                router.push("/login");
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
