import pricing from "../../content/pricing.json" with { type: "json" };

/** Content lives in content/pricing.json so the admin can edit fees. */

export const currencies = ["NGN", "GBP", "USD"] as const;
export type Currency = (typeof currencies)[number];

export const currencyMeta: Record<Currency, { symbol: string; label: string }> =
  pricing.currencyMeta;

export type Money = Record<Currency, number>;

export const priceBook: Record<string, Money> = pricing.priceBook;

export type PriceKey = keyof typeof pricing.priceBook;

export function formatMoney(amount: number, currency: Currency): string {
  const { symbol } = currencyMeta[currency];
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

export function formatPrice(key: PriceKey, currency: Currency): string {
  return formatMoney(priceBook[key][currency], currency);
}

const STORAGE_KEY = "activator-currency";

export function isCurrency(value: unknown): value is Currency {
  return typeof value === "string" && (currencies as readonly string[]).includes(value);
}

/** Best-effort currency guess from the browser locale. Falls back to USD. */
export function currencyFromLocale(locale: string | undefined): Currency {
  if (!locale) return "USD";
  const normalised = locale.toLowerCase();
  if (normalised.endsWith("-ng") || normalised === "ng") return "NGN";
  if (normalised.endsWith("-gb") || normalised.endsWith("-ie") || normalised === "gb") return "GBP";
  return "USD";
}

export function readStoredCurrency(): Currency | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return isCurrency(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function storeCurrency(currency: Currency): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    /* storage unavailable — the toggle still works for the session */
  }
}
