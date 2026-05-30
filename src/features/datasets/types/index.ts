export interface Dataset {
  id: string;
  name: string;
  description: string | null;
  version: string;
  size: number;
  rowCount: number;
  columnCount: number;
  schema: DatasetColumn[];
  storagePath: string;
  format: "csv" | "parquet" | "jsonl" | "image" | "text";
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DatasetColumn {
  name: string;
  type: "string" | "number" | "boolean" | "date" | "categorical" | "embedding";
  nullable: boolean;
  description: string | null;
  statistics?: {
    min?: number;
    max?: number;
    mean?: number;
    std?: number;
    nullCount?: number;
    uniqueCount?: number;
  };
}

export interface DatasetListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  format?: string;
  sort?: string;
  order?: "asc" | "desc";
}
