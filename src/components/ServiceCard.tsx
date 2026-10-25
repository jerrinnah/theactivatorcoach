import Link from "next/link";
import ServiceIcon from "@/components/ui/ServiceIcon";
import type { ServiceCard as Card } from "@/lib/siteData";

/** A service card, as on the home and Work With Me pages. */
export default function ServiceCard({ card, heading: Heading = "h3" }: { card: Card; heading?: "h2" | "h3" }) {
  return (
    <Link
      href={card.href}
      className="group flex flex-col rounded-4xl border border-line bg-white p-8 transition duration-200 hover:-translate-y-1 hover:border-sage/50 hover:shadow-xl hover:shadow-sage-deep/8"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-mist text-sage-deep transition group-hover:bg-sage-soft">
        <ServiceIcon name={card.icon} className="h-7 w-7" />
      </span>
      <Heading className="mt-6 font-display text-[1.75rem] leading-tight text-ink">{card.title}</Heading>
      <p className="mt-2 text-sm text-sage-deep">{card.tagline}</p>
      <p className="mt-4 flex-1 text-[0.9375rem] leading-7 text-muted">{card.description}</p>
      <p className="mt-6 text-xs text-muted">{card.meta}</p>
      <div className="mt-4 border-t border-line-soft pt-5 text-sm font-medium text-sage-deep">
        {card.ctaLabel} →
      </div>
    </Link>
  );
}
