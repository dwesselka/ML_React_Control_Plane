"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Cpu, Eye, EyeOff, Activity, Brain, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Activity, label: "Models Active", value: "12" },
  { icon: Brain, label: "Training Jobs", value: "8" },
  { icon: BarChart3, label: "Predictions Today", value: "2.4M" },
  { icon: Zap, label: "Avg Latency", value: "28ms" },
];

const taglines = [
  "Monitor. Deploy. Scale. Repeat.",
  "Your ML infrastructure, unified.",
  "From experiment to production.",
  "AI observability at scale.",
];

function useTypewriter(texts: string[], speed = 50, deleteSpeed = 30, pause = 2000) {
  const [displayed, setDisplayed] = React.useState("");
  const [textIndex, setTextIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = texts[textIndex] ?? "";
    if (!deleting && charIndex < current.length) {
      const timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
    if (!deleting && charIndex === current.length) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }
    if (deleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, deleteSpeed);
      return () => clearTimeout(timeout);
    }
    if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }
  }, [charIndex, deleting, textIndex, texts, speed, deleteSpeed, pause]);

  return displayed;
}

function NeuralBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 60;
    const connectionDistance = 120;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      resize();
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * (canvas?.width ?? 800),
        y: Math.random() * (canvas?.height ?? 600),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const primaryHsl = "24, 95%, 53%";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i]!.x - particles[j]!.x;
          const dy = particles[i]!.y - particles[j]!.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i]!.x, particles[i]!.y);
            ctx.lineTo(particles[j]!.x, particles[j]!.y);
            ctx.strokeStyle = `hsla(${primaryHsl}, ${1 - dist / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${primaryHsl}, 0.6)`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = React.useState("0");
  const numeric = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");

  React.useEffect(() => {
    if (!numeric) return;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(numeric / 30);
      if (current >= numeric) {
        current = numeric;
        clearInterval(interval);
      }
      setDisplay(`${current}${suffix}`);
    }, 40);
    return () => clearInterval(interval);
  }, [numeric, suffix]);

  return (
    <div className="text-center">
      <p className="text-lg font-bold tabular-nums text-primary">{display}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const tagline = useTypewriter(taglines);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    document.cookie = "session=mock-session-token; path=/; max-age=86400";
    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <NeuralBackground />

      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90 z-[1]" />

      <div className="relative z-10 flex w-full">
        {/* Left - brand panel */}
        <div className="hidden flex-1 flex-col justify-between p-12 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25 animate-pulse-soft">
              <Cpu className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">ML Control Plane</span>
          </div>

          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Enterprise ML Platform
              </h2>
              <p className="h-6 text-sm text-muted-foreground">
                {tagline}
                <span className="animate-pulse ml-0.5">|</span>
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Manage models, experiments, deployments, and pipelines at scale.
              Built for ML teams that ship.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <AnimatedCounter value={stat.value} label={stat.label} />
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; 2026 ML Control Plane. Enterprise-grade infrastructure.
          </p>
        </div>

        {/* Right - login form */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex flex-col items-center gap-2 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25 animate-pulse-soft">
                <Cpu className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">ML Control Plane</h1>
              <p className="h-5 text-sm text-muted-foreground">
                {tagline}
                <span className="animate-pulse ml-0.5">|</span>
              </p>
            </div>

            <div className="space-y-2 mb-6 max-lg:hidden">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring backdrop-blur-sm transition-shadow"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring backdrop-blur-sm transition-shadow"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded border-input" />
                  Remember me
                </label>
                <button type="button" className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Protected by enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
