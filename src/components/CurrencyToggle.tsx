"use client";

import { useCurrency } from "@/lib/useCurrency";
import { currencies, currencyMeta } from "@/lib/pricing";

export default function CurrencyToggle({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-line bg-white/70 p-1 ${className}`}
      role="group"
      aria-label="Display fees in"
    >
      {currencies.map((code) => {
        const active = currency === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setCurrency(code)}
            aria-pressed={active}
            title={`Show fees in ${currencyMeta[code].label}`}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
              active
                ? "bg-sage-deep text-white"
                : "text-muted hover:bg-sage-mist hover:text-sage-dark"
            }`}
          >
            <span aria-hidden="true">{currencyMeta[code].symbol}</span>
            <span className="sr-only">{currencyMeta[code].label}</span>
          </button>
        );
      })}
    </div>
  );
}
