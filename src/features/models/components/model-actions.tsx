"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  MoreHorizontal,
  Eye,
  RotateCcw,
  Copy,
  Archive,
  Trash2,
  BarChart3,
  Shield,
} from "lucide-react";
import type { ModelRegistryEntry } from "../types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ModelActionsProps {
  model: ModelRegistryEntry;
  onView: (model: ModelRegistryEntry) => void;
  onDeploy?: (model: ModelRegistryEntry) => void;
  onRollback?: (model: ModelRegistryEntry) => void;
  onArchive?: (model: ModelRegistryEntry) => void;
}

type ConfirmAction = "archive" | "delete" | null;

export function ModelActions({ model, onView, onDeploy, onRollback, onArchive }: ModelActionsProps) {
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState<ConfirmAction>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const closeMenu = () => setOpen(false);

  const items = [
    { label: "View Details", icon: <Eye className="h-3.5 w-3.5" />, onClick: () => { onView(model); closeMenu(); } },
    ...(onDeploy ? [{ label: "Deploy", icon: <RotateCcw className="h-3.5 w-3.5" />, onClick: () => { onDeploy(model); closeMenu(); } }] : []),
    ...(onRollback ? [{ label: "Rollback", icon: <Copy className="h-3.5 w-3.5" />, onClick: () => { onRollback(model); closeMenu(); } }] : []),
    { label: "Metrics", icon: <BarChart3 className="h-3.5 w-3.5" />, onClick: closeMenu },
    { label: "Governance", icon: <Shield className="h-3.5 w-3.5" />, onClick: closeMenu },
    ...(onArchive ? [{ label: "Archive", icon: <Archive className="h-3.5 w-3.5" />, onClick: () => { closeMenu(); setConfirm("archive"); }, danger: true }] : []),
    { label: "Delete", icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => { closeMenu(); setConfirm("delete"); }, danger: true },
  ];

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
        {open && (
          <div
            className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border bg-popover p-1 shadow-lg animate-in fade-in slide-in-from-top-1"
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={item.onClick}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs transition-colors",
                  (item as { danger?: boolean }).danger
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={confirm !== null} onOpenChange={(o) => { if (!o) setConfirm(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirm === "delete" ? "Delete" : "Archive"} model "{model.name}"?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirm === "delete"
                ? "This will permanently delete the model and all its versions. This action cannot be undone."
                : "Archived models are hidden from the main registry but can be restored later."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirm === "delete") console.log("Delete model", model.id);
                if (confirm === "archive" && onArchive) onArchive(model);
                setConfirm(null);
              }}
            >
              {confirm === "delete" ? "Delete" : "Archive"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
