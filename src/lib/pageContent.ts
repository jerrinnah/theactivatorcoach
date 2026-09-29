import home from "../../content/home.json" with { type: "json" };
import about from "../../content/about.json" with { type: "json" };
import workWithMe from "../../content/work-with-me.json" with { type: "json" };
import academy from "../../content/academy.json" with { type: "json" };
import speaking from "../../content/speaking.json" with { type: "json" };
import books from "../../content/books.json" with { type: "json" };
import letter from "../../content/letter.json" with { type: "json" };
import contact from "../../content/contact.json" with { type: "json" };
import crisis from "../../content/crisis.json" with { type: "json" };
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
  insights: { eyebrow: string; title: string; cta: Cta };
  letter: { eyebrow: string; title: string; intro: string };
  closing: {
    titleLines: string[];
    intro: string;
    primaryCta: Cta;
    whatsappCtaLabel: string;
  };
}

export interface AboutPage {
  seo: Seo;
  hero: { eyebrow: string; title: string; paragraphs: string[]; portrait: Portrait };
  beliefs: { eyebrow: string; title: string; intro: string };
  notForYou: { eyebrow: string; title: string; intro: string; items: string[] };
  credentials: {
    eyebrow: string;
    title: string;
    items: { label: string; detail: string }[];
  };
  closing: { title: string; intro: string; primaryCta: Cta; secondaryCta: Cta };
}

export interface WorkWithMePage {
  seo: Seo;
  hero: { eyebrow: string; title: string; intro: string; cta: Cta };
  services: { eyebrow: string; title: string };
  fees: {
    eyebrow: string;
    title: string;
    toggleLabel: string;
    tableCaption: string;
    columns: { service: string; who: string; format: string; fee: string };
    /** `price` is a key in content/pricing.json's priceBook. */
    rows: {
      service: string;
      href: string;
      who: string;
      length: string;
      price: string;
      priceLabel: string;
    }[];
    note: string;
  };
  process: { eyebrow: string; title: string; intro: string };
  closing: { title: string; intro: string; primaryCta: Cta; secondaryCta: Cta };
}

export interface AcademyPage {
  seo: Seo;
  hero: { eyebrow: string; title: string; intro: string; cta: Cta };
  audience: { eyebrow: string; title: string; intro: string; items: string[] };
  curriculum: {
    eyebrow: string;
    title: string;
    intro: string;
    modules: { number: string; title: string; body: string }[];
  };
  joining: { title: string; intro: string; steps: string[]; note: string };
  closing: { title: string; intro: string; cta: Cta };
}

export interface SpeakingPage {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    primaryCtaLabel: string;
    secondaryCta: Cta;
  };
  talks: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; audience: string; body: string }[];
  };
  formats: { eyebrow: string; title: string; intro: string; items: string[] };
  enquiry: { title: string; items: string[]; note: string };
  closing: { title: string; intro: string; secondaryCta: Cta };
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
    secondaryCtaLabel: string;
    note: string;
    cover: { image: string; alt: string };
  };
  uses: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  letter: { eyebrow: string; title: string; intro: string };
}

export interface LetterPage {
  seo: Seo;
  hero: { eyebrow: string; title: string; intro: string };
  promises: { title: string; items: { title: string; body: string }[] };
  samples: { title: string; intro: string };
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
    replyLabel: string;
    replyOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    consentLabel: string;
    submitLabel: string;
    submittingLabel: string;
    footnote: string;
    successTitle: string;
  };
  whatsapp: { title: string; intro: string };
  directEmail: {
    title: string;
    generalLabel: string;
    speakingLabel: string;
    academyLabel: string;
  };
  practicalities: {
    title: string;
    inPersonLabel: string;
    onlineLabel: string;
    onlineSuffix: string;
    responseLabel: string;
    confidentialityLabel: string;
    confidentiality: string;
  };
  urgent: { title: string; intro: string; cta: Cta };
}

export interface CrisisPage {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    emergencyLabel: string;
    emergencyHref: string;
    note: string;
  };
  resources: {
    title: string;
    items: {
      name: string;
      detail: string;
      action: string;
      href: string;
      urgent: boolean;
    }[];
    note: string;
  };
  ifUnsafe: { title: string; items: string[] };
  ifSuicidal: { title: string; items: string[] };
  coveringTracks: { title: string; paragraphs: string[] };
  whenSafe: { title: string; intro: string; cta: Cta };
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
export const academyPage = academy as AcademyPage;
export const speakingPage = speaking as SpeakingPage;
export const booksPage = books as BooksPage;
export const letterPage = letter as LetterPage;
export const contactPage = contact as ContactPage;
export const crisisPage = crisis as CrisisPage;
export const privacyPage = privacy as PrivacyPage;
