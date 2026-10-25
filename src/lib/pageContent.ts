import home from "../../content/home.json" with { type: "json" };
import about from "../../content/about.json" with { type: "json" };
import workWithMe from "../../content/work-with-me.json" with { type: "json" };
import books from "../../content/books.json" with { type: "json" };
import contact from "../../content/contact.json" with { type: "json" };
import privacy from "../../content/privacy.json" with { type: "json" };

/**
 * Page copy lives in content/*.json so the admin can edit it. Both renderers —
 * the Next app under src/app and the static generator under static-site — read
 * this module, so an edit reaches both without being written twice.
 *
 * Adding a file here is only half the job: register it in the admin's
 * CONTENT_FILES too, or nobody can reach it from the editor.
 */

export type Cta = { label: string; href: string };
export type Seo = { title: string; description: string };

/** A photography slot. A null image renders the designed placeholder. */
export type Portrait = { image: string | null; alt: string; label: string };

export interface HomePage {
  hero: {
    eyebrow: string;
    /** Rendered one per line; `**word**` is painted in the accent colour. */
    titleLines: string[];
    intro: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    reassurance: string;
    portrait: Portrait;
    badge: { value: string; caption: string };
  };
  aboutPreview: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    quote: string;
    cta: Cta;
    credentialLine: string;
    portrait: Portrait;
  };
  services: { eyebrow: string; title: string; intro: string; cta: Cta };
  assessments: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: { eyebrow: string; title: string; body: string; href: string; cta: string }[];
  };
  beliefs: { eyebrow: string; title: string };
  process: { eyebrow: string; title: string; intro: string };
  closing: {
    eyebrow: string;
    titleLines: string[];
    intro: string;
    primaryCta: Cta;
  };
}

export interface AboutPage {
  seo: Seo;
  hero: { eyebrow: string; title: string; paragraphs: string[]; portrait: Portrait };
  approach: { eyebrow: string; title: string; paragraphs: string[] };
  helpWith: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
    note: string;
  };
  beliefs: { eyebrow: string; title: string; intro: string };
  credentials: {
    eyebrow: string;
    title: string;
    /** `detail` may use `*emphasis*` for book titles. */
    items: { label: string; detail: string }[];
    note: string;
  };
  book: { eyebrow: string; title: string; byline: string; intro: string; cta: Cta };
  closing: {
    title: string;
    paragraphs: string[];
    tagline: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
}

export interface WorkWithMePage {
  seo: Seo;
  hero: { eyebrow: string; title: string; paragraphs: string[]; cta: Cta };
  services: { eyebrow: string; title: string; intro: string };
  fees: {
    eyebrow: string;
    title: string;
    intro: string;
    toggleLabel: string;
    tableCaption: string;
    columns: { service: string; format: string; fee: string };
    /** `price` is a key in content/pricing.json's priceBook. */
    rows: {
      service: string;
      href: string;
      length: string;
      price: string;
      /** Shown before the amount, e.g. "From". Empty for a fixed fee. */
      pricePrefix: string;
    }[];
    currencyNote: string;
    notes: string[];
  };
  process: { eyebrow: string; title: string; intro: string };
  closing: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    primaryCta: Cta;
    secondaryPrompt: string;
    secondaryCta: Cta;
  };
}

export interface BooksPage {
  seo: Seo & { shareTitle: string; shareDescription: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    byline: string;
    paragraphs: string[];
    primaryCta: Cta;
    /** A null image renders the designed placeholder. */
    cover: { image: string | null; alt: string; label: string };
  };
  also: {
    eyebrow: string;
    title: string;
    byline: string;
    cover: { image: string; alt: string };
  };
}

export interface ContactPage {
  seo: Seo;
  hero: { eyebrow: string; title: string; intro: string };
  form: {
    title: string;
    intro: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    topicLabel: string;
    topicPlaceholder: string;
    topics: string[];
    messageLabel: string;
    messagePlaceholder: string;
    consentLabel: string;
    submitLabel: string;
    submittingLabel: string;
    footnote: string;
    successTitle: string;
  };
  directEmail: { title: string; generalLabel: string };
  practicalities: { title: string; inPersonLabel: string; onlineLabel: string };
  urgent: { title: string; intro: string };
}

export interface PrivacyPage {
  seo: Seo;
  hero: { eyebrow: string; title: string; intro: string };
  sections: { title: string; body: string[] }[];
  questions: {
    title: string;
    intro: string;
    contactFormLabel: string;
    controllerPrefix: string;
  };
}

export const homePage = home as HomePage;
export const aboutPage = about as AboutPage;
export const workWithMePage = workWithMe as WorkWithMePage;
export const booksPage = books as BooksPage;
export const contactPage = contact as ContactPage;
export const privacyPage = privacy as PrivacyPage;
