"use client";

import * as React from "react";
import type {
  ModelRegistryEntry,
  ModelRegistryFilters,
  ModelRegistrySort,
  ModelRegistryPagination,
  ModelRegistrySummary,
} from "../types";
import { mockModels, mockModelSummary } from "../mocks";

export function useModelRegistry() {
  const [data] = React.useState<ModelRegistryEntry[]>(mockModels);
  const [summary] = React.useState<ModelRegistrySummary>(mockModelSummary);
  const [filters, setFilters] = React.useState<ModelRegistryFilters>({
    search: "",
    status: [],
    environment: [],
    provider: [],
    framework: [],
  });
  const [sort, setSort] = React.useState<ModelRegistrySort>({
    field: "name",
    direction: "asc",
  });
  const [pagination, setPagination] = React.useState<ModelRegistryPagination>({
    page: 1,
    pageSize: 10,
    total: data.length,
    totalPages: Math.ceil(data.length / 10),
  });
  const [selectedModel, setSelectedModel] = React.useState<ModelRegistryEntry | null>(null);

  const filtered = React.useMemo(() => {
    let result = [...data];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q) ||
          m.id.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (filters.status.length > 0) {
      result = result.filter((m) => filters.status.includes(m.status));
    }

    if (filters.environment.length > 0) {
      result = result.filter((m) =>
        m.deployments.some((d) => filters.environment.includes(d.environment)),
      );
    }

    if (filters.provider.length > 0) {
      result = result.filter((m) => filters.provider.includes(m.provider));
    }

    if (filters.framework.length > 0) {
      result = result.filter((m) => filters.framework.includes(m.framework));
    }

    result.sort((a, b) => {
      const aVal = String((a as unknown as Record<string, string>)[sort.field] ?? "");
      const bVal = String((b as unknown as Record<string, string>)[sort.field] ?? "");
      const cmp = aVal.localeCompare(bVal);
      return sort.direction === "desc" ? -cmp : cmp;
    });

    return result;
  }, [data, filters, sort]);

  const totalPages = Math.ceil(filtered.length / pagination.pageSize);
  const paginated = React.useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return filtered.slice(start, start + pagination.pageSize);
  }, [filtered, pagination.page, pagination.pageSize]);

  function updateFilters(partial: Partial<ModelRegistryFilters>) {
    setFilters((prev) => ({ ...prev, ...partial }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }

  function updateSort(field: string, direction: "asc" | "desc" | null) {
    setSort({ field, direction: direction ?? "asc" });
  }

  function goToPage(page: number) {
    setPagination((prev) => ({ ...prev, page }));
  }

  function clearFilters() {
    setFilters({ search: "", status: [], environment: [], provider: [], framework: [] });
    setPagination((prev) => ({ ...prev, page: 1 }));
  }

  return {
    models: paginated,
    allFiltered: filtered,
    summary,
    filters,
    sort,
    pagination: { ...pagination, total: filtered.length, totalPages },
    selectedModel,
    setSelectedModel,
    updateFilters,
    updateSort,
    goToPage,
    clearFilters,
  };
}
