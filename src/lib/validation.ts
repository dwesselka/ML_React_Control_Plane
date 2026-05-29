import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export const searchSchema = z.object({
  q: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export const dateRangeSchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

export function validateSearchParams<T extends z.ZodType>(
  schema: T,
  params: Record<string, string | string[] | undefined>,
): z.infer<T> {
  const parsed: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      parsed[key] = value;
    }
  }
  return schema.parse(parsed);
}

export function createPaginationParams(page: number, pageSize: number) {
  return paginationSchema.parse({ page, pageSize });
}
