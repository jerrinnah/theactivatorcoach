import site from "../../content/site.json" with { type: "json" };

/**
 * Content lives in content/site.json so the admin can edit it. Both renderers
 * — the Next app under src/app and the static generator under static-site —
 * read this module, so an edit reaches both without being written twice.
 *
 * The types below are the contract. If the admin ever writes a shape that
 * doesn't match, that is a bug in the editor's schema, not here.
 */

export const practitioner = site.practitioner;
export const contactDetails = site.contactDetails;

export const whatsappLink = `https://wa.me/${contactDetails.whatsappNumber}`;

export type NavLink = { label: string; href: string };

export const siteNav: NavLink[] = site.siteNav;

export const footerSections: {
  work: NavLink[];
  learn: NavLink[];
  more: NavLink[];
} = site.footerSections;

export const trustItems: string[] = site.trustItems;

export type ServiceCard = {
  title: string;
  tagline: string;
  description: string;
  href: string;
  meta: string;
  icon: "person" | "couple" | "rings" | "calendar" | "clock" | "globe";
};

export const serviceCards = site.serviceCards as ServiceCard[];

export type Belief = { title: string; body: string };
export const beliefs: Belief[] = site.beliefs;

export type ProcessStep = { step: string; title: string; body: string };
export const processSteps: ProcessStep[] = site.processSteps;
