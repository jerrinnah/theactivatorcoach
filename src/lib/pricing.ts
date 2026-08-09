export const currencies = ["NGN", "GBP", "USD"] as const;
export type Currency = (typeof currencies)[number];

export const currencyMeta: Record<Currency, { symbol: string; label: string }> = {
  NGN: { symbol: "₦", label: "Naira" },
  GBP: { symbol: "£", label: "Pounds" },
  USD: { symbol: "$", label: "Dollars" },
};

export type Money = Record<Currency, number>;

/**
 * ⚠️ PLACEHOLDER FEES — these replace the old `[FEE]` strings so the pages are
 * functional, but they are NOT confirmed rates. Edit this one object to set the
 * real fees; every service page, the pricing table and the currency toggle read
 * from here.
 */
export const priceBook = {
  individualSession: { NGN: 150000, GBP: 90, USD: 115 } satisfies Money,
  individualBlock6: { NGN: 810000, GBP: 486, USD: 621 } satisfies Money,
  couplesSession: { NGN: 220000, GBP: 130, USD: 165 } satisfies Money,
  couplesProgramme8: { NGN: 1584000, GBP: 936, USD: 1188 } satisfies Money,
  beforeYouMarry: { NGN: 900000, GBP: 540, USD: 690 } satisfies Money,
  annualReview: { NGN: 450000, GBP: 270, USD: 345 } satisfies Money,
  intensiveOneDay: { NGN: 1500000, GBP: 900, USD: 1150 } satisfies Money,
  intensiveTwoDay: { NGN: 2700000, GBP: 1620, USD: 2070 } satisfies Money,
  intensiveDeposit: { NGN: 500000, GBP: 300, USD: 385 } satisfies Money,
  diasporaIndividual: { NGN: 180000, GBP: 110, USD: 140 } satisfies Money,
  diasporaCouples: { NGN: 260000, GBP: 155, USD: 195 } satisfies Money,
} as const;

export type PriceKey = keyof typeof priceBook;

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
