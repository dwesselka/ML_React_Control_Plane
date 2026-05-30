import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

type HttpOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
};

type HttpResponse<T> = {
  data: T;
  error?: { code: string; message: string };
};

class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = env.NEXT_PUBLIC_API_URL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private buildUrl(path: string, params?: HttpOptions["params"]): string {
    const url = new URL(`${this.baseUrl}${path}`);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    return url.toString();
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    const apiToken = env.API_TOKEN;
    if (apiToken) {
      headers["Authorization"] = `Bearer ${apiToken}`;
    }
    return headers;
  }

  async request<T>(
    path: string,
    options: HttpOptions = {},
  ): Promise<HttpResponse<T>> {
    const { method = "GET", body, headers, params, cache, next } = options;

    try {
      const response = await fetch(this.buildUrl(path, params), {
        method,
        headers: {
          ...this.defaultHeaders,
          ...this.getAuthHeaders(),
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        cache,
        next,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const errorMessage = errorBody.message ?? response.statusText;
        logger.error(`HTTP request failed`, {
          path,
          method,
          status: response.status,
          error: errorMessage,
        });
        return {
          data: null as T,
          error: {
            code: errorBody.code ?? "UNKNOWN_ERROR",
            message: errorMessage,
          },
        };
      }

      const data = await response.json();
      return { data: data as T };
    } catch (error) {
      logger.error(`HTTP request error`, {
        path,
        method,
        error: error instanceof Error ? error.message : "Network error",
      });
      return {
        data: null as T,
        error: {
          code: "NETWORK_ERROR",
          message: error instanceof Error ? error.message : "Network error",
        },
      };
    }
  }

  get<T>(path: string, options?: Omit<HttpOptions, "method">) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T>(path: string, body?: unknown, options?: Omit<HttpOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "POST", body });
  }

  put<T>(path: string, body?: unknown, options?: Omit<HttpOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "PUT", body });
  }

  patch<T>(path: string, body?: unknown, options?: Omit<HttpOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "PATCH", body });
  }

  delete<T>(path: string, options?: Omit<HttpOptions, "method">) {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}

export const http = new HttpClient();
