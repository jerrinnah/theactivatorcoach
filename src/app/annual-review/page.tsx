import type { Metadata } from "next";
import ServicePageShell from "@/components/ServicePageShell";

export const metadata: Metadata = {
  title: "The Annual Review",
  description:
    "A yearly two-hour check-up for a marriage that isn't broken. The five exposure points run properly, a written summary, and three commitments for the year.",
};

const sections = [
  {
    title: "Who this is for",
    content: [
      "Couples who are fine. Genuinely. This is the only service on this site you should book while nothing is wrong.",
      "It is also, for that reason, the one most people skip — and then arrive three years later needing something considerably more expensive.",
    ],
  },
  {
    title: "What actually happens",
    content: [
      "One structured two-hour session, once a year. We run the five exposure points properly, surface anything drifting while it's still small, and you leave with a written summary and three specific commitments for the year.",
      "No crisis. No blame. No excavation of things that don't need excavating.",
    ],
  },
  {
    title: "What this will not do",
    content: [
      "This is not therapy and it is not for couples in crisis.",
      "If something is actively wrong, book couples therapy instead — you need more than two hours, and I would rather tell you that now than take the booking.",
    ],
  },
];

export default function AnnualReviewPage() {
  return (
    <ServicePageShell
      eyebrow="Maintenance, not repair"
      title="The Annual Review"
      heroCopy={[
        "You service a car that's running fine. You review your finances every year. Your company runs quarterly performance reviews.",
        "And you have never once sat down with the person you married and formally asked: what's working, what's drifting, and what have we stopped saying?",
      ]}
      format={[
        "120 minutes, once a year",
        "Online worldwide, or in person in Port Harcourt",
        "Written summary provided afterwards",
        "Three specific commitments agreed for the year",
        "Runs the five exposure points in full",
      ]}
      fees={[{ label: "One annual session", amount: "annualReview" }]}
      feeNote="Gift vouchers are available. This makes an unusually good anniversary or wedding present, and it is regularly bought as one."
      sections={sections}
      ctaLabel="Book the Annual Review"
      ctaHref="/contact"
      ctaNote="Run the free assessment first if you'd like a preview"
      related={["/couples-therapy", "/before-you-marry", "/the-intensive"]}
    />
  );
}
