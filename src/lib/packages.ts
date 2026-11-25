import data from "../../content/packages.json" with { type: "json" };

/**
 * Bookable packages, paid through Selar. Each package's Book & Pay button
 * goes straight to its Selar checkout. Until a package has a checkoutUrl the
 * button falls back to the contact page, so nothing on the site links to a
 * dead checkout.
 */
export interface BookablePackage {
  id: string;
  name: string;
  audience: string;
  summary: string;
  includes: string[];
  /** Amount in Naira, as charged on Selar. */
  price: number;
  checkoutUrl: string | null;
  /** The service page this package belongs to, if any. */
  servicePath: string | null;
}

export interface PackagesContent {
  eyebrow: string;
  title: string;
  intro: string;
  navLabel: string;
  currencySymbol: string;
  paymentNote: string;
  introCta: { label: string; href: string };
  bookLabel: string;
  pendingLabel: string;
  pendingHref: string;
  learnMoreLabel: string;
  servicePanelEyebrow: string;
  packages: BookablePackage[];
}

export const packagesContent = data as PackagesContent;
export const bookablePackages = packagesContent.packages;

/** Where the packages section lives, for links from elsewhere on the site. */
export const PACKAGES_HREF = "/work-with-me#book";

export function formatPackagePrice(pkg: BookablePackage): string {
  return `${packagesContent.currencySymbol}${pkg.price.toLocaleString("en-US")}`;
}

/** The Book & Pay link, or the enquiry fallback while no checkout is set. */
export function bookingLink(pkg: BookablePackage): { href: string; label: string } {
  return pkg.checkoutUrl
    ? { href: pkg.checkoutUrl, label: packagesContent.bookLabel }
    : { href: packagesContent.pendingHref, label: packagesContent.pendingLabel };
}

export function packageForService(path: string): BookablePackage | undefined {
  return bookablePackages.find((pkg) => pkg.servicePath === path);
}
