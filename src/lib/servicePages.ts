import services from "../../content/services.json" with { type: "json" };
import type { PriceKey } from "./pricing";

/**
 * The six service pages. Content lives in content/services.json so the admin
 * can edit it; both renderers read this module, and each Next route is a
 * three-line lookup by path.
 */

export interface ServiceSection {
  title: string;
  content: string[];
  /** Render the content as a checklist rather than paragraphs. */
  list?: boolean;
}

export interface Fee {
  label: string;
  /** Names a fee in content/pricing.json rather than holding an amount. */
  amount: PriceKey;
  note?: string;
}

export interface ServicePage {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heroCopy: string[];
  format: string[];
  fees: Fee[];
  feeNote?: string;
  sections: ServiceSection[];
  ctaLabel: string;
  ctaNote?: string;
  /** Paths of other services to surface at the foot of the page. */
  related: string[];
}

export const servicePages = services.servicePages as ServicePage[];

/** Copy shared by all six pages. */
export const servicePageCopy: {
  formatTitle: string;
  feesTitle: string;
  closingTitle: string;
  closingIntro: string;
  closingCta: { label: string; href: string };
  relatedTitle: string;
  relatedCtaLabel: string;
} = services.pageCopy;

export function servicePage(path: string): ServicePage {
  const page = servicePages.find((p) => p.path === path);
  // A missing page means content/services.json and the routes have drifted
  // apart. Failing the build is better than shipping a blank page.
  if (!page) throw new Error(`No service page in content/services.json for ${path}`);
  return page;
}
