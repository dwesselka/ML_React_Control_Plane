"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
} from "lucide-react";

type SortDirection = "asc" | "desc" | null;

interface SortState {
  field: string;
  direction: SortDirection;
}

interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render: (item: T) => React.ReactNode;
  cellClassName?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  sortField?: string;
  sortDirection?: SortDirection;
  onSort?: (field: string, direction: SortDirection) => void;
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (item: T) => void;
  expandableRender?: (item: T) => React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  exportLabel?: string;
  onExport?: () => void;
}

function DataTable<T>({
  columns,
  data,
  keyExtractor,
  sortField,
  sortDirection,
  onSort,
  page = 1,
  pageSize = 20,
  total,
  totalPages,
  onPageChange,
  onRowClick,
  expandableRender,
  isLoading,
  emptyMessage = "No data found",
  className,
  searchable,
  searchValue,
  onSearchChange,
  exportLabel,
  onExport,
}: DataTableProps<T>) {
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());

  function toggleExpand(id: string) {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSort(field: string) {
    if (!onSort) return;
    if (field === sortField) {
      const next: SortDirection =
        sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc";
      onSort(field, next);
    } else {
      onSort(field, "asc");
    }
  }

  function renderSortIcon(field: string) {
    if (field !== sortField || !sortDirection) {
      return <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 text-muted-foreground" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-3 w-3 shrink-0" />
    ) : (
      <ChevronDown className="ml-1 h-3 w-3 shrink-0" />
    );
  }

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total ?? data.length);
  const currentTotal = total ?? data.length;

  return (
    <div className={cn("space-y-3", className)}>
      {(searchable || onExport) && (
        <div className="flex items-center gap-2">
          {searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchValue ?? ""}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          )}
          {onExport && (
            <button
              onClick={onExport}
              className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              {exportLabel ?? "Export CSV"}
            </button>
          )}
        </div>
      )}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                {expandableRender && <th className="w-10 px-3 py-3" />}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                      col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
                      col.headerClassName,
                    )}
                    style={col.width ? { width: col.width } : undefined}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <span className="inline-flex items-center">
                      {col.header}
                      {col.sortable && renderSortIcon(col.key)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={`skel-${i}`}>
                      {expandableRender && <td className="px-3 py-3" />}
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-3">
                          <div className="h-4 w-3/4 animate-pulse rounded bg-primary/5" />
                        </td>
                      ))}
                    </tr>
                  ))
                : data.length === 0
                  ? (
                    <tr>
                      <td
                        colSpan={columns.length + (expandableRender ? 1 : 0)}
                        className="px-4 py-12 text-center text-sm text-muted-foreground"
                      >
                        {emptyMessage}
                      </td>
                    </tr>
                  )
                  : data.map((item) => {
                      const key = keyExtractor(item);
                      const isExpanded = expandedRows.has(key);
                      return (
                        <React.Fragment key={key}>
                          <tr
                            className={cn(
                              "transition-colors hover:bg-muted/20",
                              onRowClick && "cursor-pointer",
                            )}
                            onClick={() => onRowClick?.(item)}
                          >
                            {expandableRender && (
                              <td className="px-3 py-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpand(key);
                                  }}
                                  className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors"
                                >
                                  {isExpanded ? (
                                    <ChevronUp className="h-3.5 w-3.5" />
                                  ) : (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </td>
                            )}
                            {columns.map((col) => (
                              <td
                                key={col.key}
                                className={cn("px-4 py-3 text-sm", col.cellClassName)}
                              >
                                {col.render(item)}
                              </td>
                            ))}
                          </tr>
                          {expandableRender && isExpanded && (
                            <tr>
                              <td
                                colSpan={columns.length + 1}
                                className="border-t border-dashed border-border bg-muted/10 px-6 py-4"
                              >
                                {expandableRender(item)}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages !== undefined && totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-medium">{startItem}</span>{" "}
            to <span className="font-medium">{endItem}</span>{" "}
            of <span className="font-medium">{currentTotal}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange?.(page - 1)}
              disabled={page <= 1}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange?.(pageNum)}
                  className={cn(
                    "flex h-7 min-w-[28px] items-center justify-center rounded-md px-1.5 text-xs font-medium transition-colors",
                    pageNum === page
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { DataTable };
export type { Column, SortDirection, SortState, DataTableProps };
