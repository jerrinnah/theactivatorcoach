"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, setCurrency, subscribe } from "@/lib/currencyStore";
import type { Currency } from "@/lib/pricing";

/**
 * Reads the visitor's currency preference.
 *
 * Backed by a module-level store rather than context, so any client component
 * can call this without a provider in its tree.
 */
export function useCurrency(): { currency: Currency; setCurrency: (next: Currency) => void } {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { currency, setCurrency };
}
