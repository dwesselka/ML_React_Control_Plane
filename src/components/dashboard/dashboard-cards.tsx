import { Cpu, Box, FlaskConical, Rocket } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export async function DashboardCards() {
  const cards = [
    {
      title: "Active Models",
      value: "12",
      description: "3 pending review",
      icon: <Box className="h-5 w-5" />,
    },
    {
      title: "Running Experiments",
      value: "8",
      description: "2 completed today",
      icon: <FlaskConical className="h-5 w-5" />,
    },
    {
      title: "Active Deployments",
      value: "5",
      description: "99.9% uptime",
      icon: <Rocket className="h-5 w-5" />,
    },
    {
      title: "Pipeline Runs",
      value: "156",
      description: "24 failed this week",
      icon: <Cpu className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid gap-4 px-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
