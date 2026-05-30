import { describe, it, expect } from "vitest";
import {
  formatRelativeTime,
  formatBytes,
  formatPercentage,
  formatDuration,
  formatLatency,
  formatThroughput,
  formatErrorRate,
} from "./format";

describe("formatRelativeTime", () => {
  it("returns 'just now' for less than 5 seconds", () => {
    expect(formatRelativeTime(new Date())).toBe("just now");
  });

  it("returns seconds ago", () => {
    const date = new Date(Date.now() - 10000);
    expect(formatRelativeTime(date)).toBe("10s ago");
  });

  it("returns minutes ago", () => {
    const date = new Date(Date.now() - 120000);
    expect(formatRelativeTime(date)).toBe("2m ago");
  });

  it("returns hours ago", () => {
    const date = new Date(Date.now() - 7200000);
    expect(formatRelativeTime(date)).toBe("2h ago");
  });

  it("returns days ago", () => {
    const date = new Date(Date.now() - 172800000);
    expect(formatRelativeTime(date)).toBe("2d ago");
  });
});

describe("formatBytes", () => {
  it("formats 0 bytes", () => {
    expect(formatBytes(0)).toBe("0 B");
  });

  it("formats bytes", () => {
    expect(formatBytes(500)).toBe("500 B");
  });

  it("formats kilobytes", () => {
    expect(formatBytes(1500)).toBe("1.5 KB");
  });

  it("formats megabytes", () => {
    expect(formatBytes(1500000)).toBe("1.5 MB");
  });

  it("formats gigabytes", () => {
    expect(formatBytes(1500000000)).toBe("1.5 GB");
  });
});

describe("formatPercentage", () => {
  it("formats a percentage", () => {
    expect(formatPercentage(99.876)).toBe("99.9%");
  });

  it("uses specified decimals", () => {
    expect(formatPercentage(99.876, 3)).toBe("99.876%");
  });
});

describe("formatDuration", () => {
  it("formats milliseconds", () => {
    expect(formatDuration(500)).toBe("500ms");
  });

  it("formats seconds", () => {
    expect(formatDuration(5000)).toBe("5s");
  });

  it("formats minutes and seconds", () => {
    expect(formatDuration(150000)).toBe("2m 30s");
  });

  it("formats hours and minutes", () => {
    expect(formatDuration(5400000)).toBe("1h 30m");
  });
});

describe("formatLatency", () => {
  it("formats sub-millisecond", () => {
    expect(formatLatency(0.5)).toBe("<1ms");
  });

  it("formats milliseconds", () => {
    expect(formatLatency(340)).toBe("340ms");
  });

  it("formats seconds", () => {
    expect(formatLatency(2500)).toBe("2.50s");
  });
});

describe("formatThroughput", () => {
  it("formats low throughput", () => {
    expect(formatThroughput(500)).toBe("500.0/s");
  });

  it("formats thousands", () => {
    expect(formatThroughput(1250)).toBe("1.3K/s");
  });

  it("formats millions", () => {
    expect(formatThroughput(2500000)).toBe("2.5M/s");
  });
});

describe("formatErrorRate", () => {
  it("formats error rate as percentage", () => {
    expect(formatErrorRate(0.0012)).toBe("0.12%");
  });

  it("formats zero error rate", () => {
    expect(formatErrorRate(0)).toBe("0.00%");
  });

  it("formats 100% error rate", () => {
    expect(formatErrorRate(1)).toBe("100.00%");
  });
});
