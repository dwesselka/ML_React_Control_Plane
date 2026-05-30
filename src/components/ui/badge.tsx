import { cn } from "@/lib/utils";

const badgeVariants = {
  variant: {
    default: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary text-secondary-foreground border-secondary",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    outline: "bg-transparent text-foreground border-border",
  } as const,
  size: {
    sm: "px-1.5 py-0.5 text-[10px]",
    default: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  } as const,
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants.variant;
  size?: keyof typeof badgeVariants.size;
}

function Badge({ className, variant = "default", size = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        badgeVariants.variant[variant],
        badgeVariants.size[size],
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
