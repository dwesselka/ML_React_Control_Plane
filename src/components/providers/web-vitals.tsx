"use client";

import { useReportWebVitals } from "next/web-vitals";
import { logger } from "@/lib/logger";

const vitalsLabels: Record<string, string> = {
  LCP: "Largest Contentful Paint",
  FID: "First Input Delay",
  CLS: "Cumulative Layout Shift",
  FCP: "First Contentful Paint",
  TTFB: "Time to First Byte",
  INP: "Interaction to Next Paint",
};

export function WebVitals() {
  useReportWebVitals((metric) => {
    const label = vitalsLabels[metric.name] ?? metric.name;

    logger.info(`[Web Vitals] ${label}`, {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });

    if (process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT) {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        url: window.location.pathname,
        timestamp: new Date().toISOString(),
      });

      fetch(process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  });

  return null;
}
