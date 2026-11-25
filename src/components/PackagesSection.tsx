import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import {
  bookablePackages,
  bookingLink,
  formatPackagePrice,
  packagesContent as copy,
  type BookablePackage,
} from "@/lib/packages";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mt-1 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true">
      <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PackageCard({ pkg, heading: Heading = "h3" }: { pkg: BookablePackage; heading?: "h2" | "h3" }) {
  const booking = bookingLink(pkg);
  return (
    <article className="flex flex-col rounded-4xl border border-line bg-white p-8">
      <p className="eyebrow">{pkg.audience}</p>
      <Heading className="mt-4 font-display text-[1.75rem] leading-tight text-ink">{pkg.name}</Heading>
      <p className="mt-4 text-[0.9375rem] leading-7 text-muted">{pkg.summary}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {pkg.includes.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-ink-soft">
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-8 border-t border-line-soft pt-6">
        <p className="font-display text-4xl text-sage-dark">{formatPackagePrice(pkg)}</p>
        <ButtonLink href={booking.href} size="lg" className="mt-6 w-full">
          {booking.label}
        </ButtonLink>
        {pkg.servicePath ? (
          <Link
            href={pkg.servicePath}
            className="mt-4 block text-center text-sm text-sage-deep underline-offset-4 hover:underline"
          >
            {copy.learnMoreLabel} →
          </Link>
        ) : null}
      </div>
    </article>
  );
}

/** The packages grid, on the home and Work With Me pages. */
export default function PackagesSection({ heading = "h3", className = "bg-cream" }: { heading?: "h2" | "h3"; className?: string }) {
  return (
    <section id="book" className={`scroll-mt-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bookablePackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} heading={heading} />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="max-w-2xl text-sm leading-6 text-muted">{copy.paymentNote}</p>
          <ButtonLink href={copy.introCta.href} variant="outline">
            {copy.introCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** "Book and pay online" panel beside a service page's fees. */
export function ServicePackagePanel({ pkg }: { pkg: BookablePackage }) {
  const booking = bookingLink(pkg);
  return (
    <div className="mt-6 rounded-3xl bg-sage-mist p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-sage-deep">{copy.servicePanelEyebrow}</p>
      <p className="mt-2 font-display text-2xl text-ink">{pkg.name}</p>
      <p className="mt-1 text-sm text-muted">{pkg.includes.join(" · ")}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <span className="font-display text-3xl text-sage-dark">{formatPackagePrice(pkg)}</span>
        <ButtonLink href={booking.href}>{booking.label}</ButtonLink>
      </div>
    </div>
  );
}
