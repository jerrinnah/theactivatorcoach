import type { Metadata } from "next";
import ServicePageShell from "@/components/ServicePageShell";

export const metadata: Metadata = {
  title: "The Intensive",
  description:
    "One or two full days of couples work — months compressed. For crisis, for calendars that make weekly sessions impossible, and for diaspora couples flying in.",
};

const sections = [
  {
    title: "Who this is for",
    content: [
      "Couples in genuine crisis who cannot wait twelve weeks. Executives whose calendars make weekly sessions impossible. Diaspora couples flying in with one window to do this properly.",
    ],
  },
  {
    title: "What actually happens",
    content: [
      "Day one, morning — full joint assessment. Day one, afternoon — individual sessions, one with each of you. Day one, close — I show you the loop.",
      "Day two — the work. Repair protocol, boundaries, the specific conversations you've been avoiding, and a written plan you both sign before you leave.",
      "It is demanding. People are tired at the end of day one. That is normal and it is part of how it works.",
    ],
  },
  {
    title: "What this will not do",
    content: [
      "It will not undo twenty years in two days. Anyone telling you otherwise is selling something.",
      "What it will do is get you to the truth quickly, and give you a working protocol to take home.",
    ],
  },
];

export default function TheIntensivePage() {
  return (
    <ServicePageShell
      eyebrow="Months of work, compressed"
      title="The Intensive"
      heroCopy={[
        "One or two full days, in one room, with the thing you have been circling for years placed directly on the table.",
        "For crisis, for people whose diaries do not permit weekly work, and for couples flying in to do this properly.",
      ]}
      format={[
        "One day (6 hours) or two days (12 hours)",
        "In person in Port Harcourt, or a location you arrange",
        "Includes two follow-up sessions within 90 days",
        "Written plan signed by both of you before you leave",
        "Limited to four intensives per quarter",
      ]}
      fees={[
        { label: "One day", amount: "intensiveOneDay" },
        { label: "Two days", amount: "intensiveTwoDay", note: "Includes both follow-up sessions" },
        { label: "Deposit to hold a date", amount: "intensiveDeposit", note: "Deducted from the balance" },
      ]}
      feeNote="Travel outside Port Harcourt is quoted separately at cost. Dates are held on receipt of the deposit and are limited by design — this format only works if I am not running them back to back."
      sections={sections}
      ctaLabel="Enquire about an Intensive"
      ctaHref="/contact"
      ctaNote="Tell me your window and I'll tell you what's available"
      related={["/couples-therapy", "/diaspora", "/annual-review"]}
    />
  );
}
