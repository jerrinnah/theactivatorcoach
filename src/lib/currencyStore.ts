import {
  currencyFromLocale,
  readStoredCurrency,
  storeCurrency,
  type Currency,
} from "@/lib/pricing";

/**
 * Tiny external store so components can read the currency preference through
 * `useSyncExternalStore` rather than syncing localStorage in an effect.
 *
 * The server snapshot is always USD, so server HTML and the hydration render
 * agree. React then reads the client snapshot and re-renders once if the real
 * preference differs — which is the intended behaviour, not a mismatch.
 */

const SERVER_DEFAULT: Currency = "USD";

let current: Currency | null = null;
const listeners = new Set<() => void>();

function resolve(): Currency {
  if (current !== null) return current;
  current = readStoredCurrency() ?? currencyFromLocale(navigator.language);
  return current;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): Currency {
  return resolve();
}

export function getServerSnapshot(): Currency {
  return SERVER_DEFAULT;
}

export function setCurrency(next: Currency): void {
  if (current === next) return;
  current = next;
  storeCurrency(next);
  listeners.forEach((listener) => listener());
}
