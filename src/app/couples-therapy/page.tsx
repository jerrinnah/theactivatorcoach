import type { Metadata } from "next";
import ServicePageShell from "@/components/ServicePageShell";

export const metadata: Metadata = {
  title: "Couples Therapy",
  description:
    "Structured couples therapy in Port Harcourt and online. For conflict, silence, rebuilding after infidelity, and marriages being run from the outside. Nobody wins — that is the point.",
};

const sections = [
  {
    title: "Who this is for",
    content: [
      "Couples in constant conflict. Couples in total silence. Couples rebuilding after infidelity. Couples being run from the outside by family.",
      "Couples who are technically fine and quietly far apart — which, in my experience, is the group that leaves it longest.",
    ],
  },
  {
    title: "What actually happens",
    content: [
      "Session 1 — Joint assessment. Both of you, together. I want the history of the relationship and the shape of the problem as each of you sees it.",
      "Sessions 2 and 3 — Individually. One with each of you, alone. This is where the honest material usually arrives.",
      "Session 4 onward — The work. I show you the loop. Once you can both see the loop, it stops being about character and starts being about mechanics — and mechanics can be changed.",
    ],
  },
  {
    title: "What this will not do",
    content: [
      "This is not court. Nobody wins. If you leave a session feeling vindicated, the session failed.",
      "I cannot want it more than you do. Two people have to be willing. If only one is, we do individual work instead — and that is a real option, not a consolation prize.",
      "I will not guarantee your marriage. Sometimes the honest outcome of this work is a clear-eyed separation conducted with dignity.",
    ],
  },
];

export default function CouplesTherapyPage() {
  return (
    <ServicePageShell
      eyebrow="For two people who still want this to work"
      title="Couples Therapy"
      heroCopy={[
        "For two people who still want this to work and have run out of ways to say so.",
        "I will not take a side, and I will interrupt any attempt to recruit me into one.",
      ]}
      format={[
        "75–90 minutes per session",
        "Weekly or fortnightly",
        "Online worldwide, or in person in Port Harcourt",
        "Typical arc: 8–12 sessions",
        "Formally reviewed together at session six",
      ]}
      fees={[
        { label: "Per session", amount: "couplesSession" },
        { label: "Eight-session programme", amount: "couplesProgramme8", note: "Paid in advance — a 10% saving" },
      ]}
      feeNote="One fee covers both of you, including the individual sessions in weeks two and three."
      sections={sections}
      ctaLabel="Book a free conversation"
      ctaHref="/contact"
      ctaNote="Either of you can make the first call"
      related={["/individual-therapy", "/the-intensive", "/annual-review"]}
    />
  );
}
