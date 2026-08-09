"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { practitioner, siteNav } from "@/lib/siteData";
import CurrencyToggle from "@/components/CurrencyToggle";
import { PsiBadge } from "@/components/ui/Ornaments";

export default function GlobalHeader() {
  const pathname = usePathname();

  // Remembering which route the menu was opened on means a navigation closes it
  // automatically — no effect needed, and back/forward behave correctly too.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const toggle = () => setOpenedOn(open ? null : pathname);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label={`${practitioner.shortName} — home`}>
            <PsiBadge className="h-9 w-9 shrink-0 text-sage-deep" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-xl text-ink">{practitioner.logoName}</span>
              <span className="text-[0.6rem] uppercase tracking-[0.24em] text-muted">
                {practitioner.logoCredential}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {siteNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative py-1 text-sm transition ${
                  isActive(item.href)
                    ? "text-sage-dark after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-sage-deep"
                    : "text-ink-soft hover:text-sage-dark"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <CurrencyToggle />
            <Link
              href="/contact"
              className="rounded-full bg-sage-deep px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-sage-deep/20 transition hover:bg-sage-dark"
            >
              Book a conversation
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition hover:border-sage-deep/50 hover:bg-sage-mist lg:hidden"
            onClick={toggle}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden="true" className="text-xs">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>

        {open ? (
          <div id="mobile-nav" className="border-t border-line bg-cream px-6 pb-6 pt-4 lg:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {siteNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-2xl px-4 py-3 text-base transition ${
                    isActive(item.href)
                      ? "bg-sage-mist text-sage-dark"
                      : "text-ink-soft hover:bg-sage-mist/70"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="rounded-2xl px-4 py-3 text-base text-ink-soft transition hover:bg-sage-mist/70"
              >
                Contact
              </Link>
            </nav>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Show fees in</span>
              <CurrencyToggle />
            </div>
          </div>
        ) : null}
      </header>

      {/* Persistent mobile booking bar. Body padding in the root layout clears it. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur-xl md:hidden">
        <Link
          href="/contact"
          className="mx-auto flex max-w-md items-center justify-center rounded-full bg-sage-deep px-5 py-3.5 text-sm font-medium text-white shadow-lg shadow-sage-deep/20 transition hover:bg-sage-dark"
        >
          Book a free conversation
        </Link>
      </div>
    </>
  );
}
