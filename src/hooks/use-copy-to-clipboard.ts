"use client";

import * as React from "react";

export function useCopyToClipboard(): [
  boolean,
  (text: string) => Promise<void>,
] {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return [copied, copy];
}
