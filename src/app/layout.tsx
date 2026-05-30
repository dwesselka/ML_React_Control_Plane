import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { WebVitals } from "@/components/providers/web-vitals";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | ML Control Plane",
    default: "ML Control Plane",
  },
  description: "Enterprise ML/AI platform control plane for managing models, experiments, and deployments.",
  keywords: ["ML", "AI", "machine learning", "control plane", "models", "deployments"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
          <WebVitals />
        </Providers>
      </body>
    </html>
  );
}
