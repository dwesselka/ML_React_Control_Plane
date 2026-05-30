import { cn } from "@/lib/utils";

interface WorkspaceContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "full";
}

export function WorkspaceContainer({
  children,
  className,
  size = "default",
}: WorkspaceContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full transition-all duration-300",
        size === "default" && "max-w-7xl",
        size === "wide" && "max-w-[1600px]",
        size === "full" && "max-w-full",
        "px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
