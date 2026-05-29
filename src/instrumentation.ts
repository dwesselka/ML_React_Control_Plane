import { logger } from "@/lib/logger";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    logger.info("Registering server instrumentation...");

    await import("./services/api-client");
  }
}
