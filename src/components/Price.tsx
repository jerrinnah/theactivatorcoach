"use client";

import { useCurrency } from "@/lib/useCurrency";
import { formatPrice, type PriceKey } from "@/lib/pricing";

/** Renders a single fee from the price book in the visitor's chosen currency. */
export default function Price({ amount, className = "" }: { amount: PriceKey; className?: string }) {
  const { currency } = useCurrency();
  return <span className={className}>{formatPrice(amount, currency)}</span>;
}
