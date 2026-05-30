import { describe, it, expect } from "vitest";
import {
  slugify,
  truncate,
  pluralize,
  capitalize,
  titleCase,
  buildQueryString,
  clamp,
  range,
  omit,
  pick,
} from "./utils";

describe("slugify", () => {
  it("converts a string to a slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("Hello! World?")).toBe("hello-world");
  });

  it("handles multiple spaces and dashes", () => {
    expect(slugify("  Hello   World  ")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });
});

describe("truncate", () => {
  it("returns the string if shorter than length", () => {
    expect(truncate("Hello", 10)).toBe("Hello");
  });

  it("truncates and adds ellipsis if longer than length", () => {
    expect(truncate("Hello World", 5)).toBe("Hello...");
  });

  it("handles exact length", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });

  it("handles empty string", () => {
    expect(truncate("", 5)).toBe("");
  });
});

describe("pluralize", () => {
  it("returns singular for count 1", () => {
    expect(pluralize(1, "model")).toBe("model");
  });

  it("returns plural for count 0", () => {
    expect(pluralize(0, "model")).toBe("models");
  });

  it("returns plural for count > 1", () => {
    expect(pluralize(3, "model")).toBe("models");
  });

  it("uses custom plural when provided", () => {
    expect(pluralize(2, "index", "indices")).toBe("indices");
  });
});

describe("capitalize", () => {
  it("capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles already capitalized", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("titleCase", () => {
  it("converts kebab-case to title case", () => {
    expect(titleCase("model-registry")).toBe("Model Registry");
  });

  it("converts snake_case to title case", () => {
    expect(titleCase("active_models")).toBe("Active Models");
  });

  it("converts space-separated to title case", () => {
    expect(titleCase("hello world")).toBe("Hello World");
  });
});

describe("buildQueryString", () => {
  it("builds a query string from params", () => {
    expect(buildQueryString({ page: 1, limit: 20 })).toBe("?page=1&limit=20");
  });

  it("omits undefined and null values", () => {
    expect(buildQueryString({ page: 1, search: undefined, sort: null })).toBe("?page=1");
  });

  it("returns empty string for empty params", () => {
    expect(buildQueryString({})).toBe("");
  });
});

describe("clamp", () => {
  it("clamps a value within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe("range", () => {
  it("generates a range of numbers", () => {
    expect(range(0, 4)).toEqual([0, 1, 2, 3, 4]);
  });

  it("handles single number range", () => {
    expect(range(3, 3)).toEqual([3]);
  });
});

describe("omit", () => {
  it("omits specified keys", () => {
    expect(omit({ a: 1, b: 2, c: 3 }, "a", "c")).toEqual({ b: 2 });
  });
});

describe("pick", () => {
  it("picks specified keys", () => {
    expect(pick({ a: 1, b: 2, c: 3 }, "a", "c")).toEqual({ a: 1, c: 3 });
  });
});
