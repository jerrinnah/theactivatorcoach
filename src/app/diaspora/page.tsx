import type { Metadata } from "next";
import ServicePageShell from "@/components/ServicePageShell";

export const metadata: Metadata = {
  title: "Diaspora Sessions",
  description:
    "Therapy for Nigerian and African individuals and couples in the UK, US, Canada, Europe and the Gulf. No cultural translation required. Evening and weekend slots by timezone.",
};

const sections = [
  {
    title: "Who this is for",
    content: [
      "Nigerian and African couples and individuals in the UK, US, Canada, Europe and the Gulf.",
      "Long-distance marriages. Couples navigating a move. Second-generation adults negotiating between two sets of expectations.",
      "Anyone whose therapist keeps missing the part that matters most.",
    ],
  },
  {
    title: "What actually happens",
    content: [
      "Every service on this site is available online, and the work itself is identical. What differs is what you don't have to explain.",
      "Evening and weekend slots are held specifically for GMT, EST and PST, and fees are shown and settled in pounds or dollars.",
      "When you are next home, the Intensive is available in person — a number of diaspora couples plan a visit around it.",
    ],
  },
  {
    title: "What this will not do",
    content: [
      "It will not require cultural translation while you're already in pain.",
      "It will not ask you to explain why your mother's opinion carries weight, or what it means when your husband's family arrives without notice.",
      "It will not treat your culture as the diagnosis. It is context, and often it is a resource.",
    ],
  },
];

export default function DiasporaPage() {
  return (
    <ServicePageShell
      eyebrow="The marriage and the culture, both understood"
      title="Diaspora Sessions"
      heroCopy={[
        "You've probably tried a therapist there. They were competent, they were kind, and at some point you found yourself explaining the culture instead of doing the work.",
        "This is the same practice, run for people who do not need that part explained.",
      ]}
      format={[
        "Online, worldwide",
        "Evening and weekend slots held for GMT, EST and PST",
        "Individual (50 min) and couples (75–90 min) formats",
        "Fees shown and settled in £ or $",
        "The Intensive available in person when you are home",
      ]}
      fees={[
        { label: "Individual session", amount: "diasporaIndividual" },
        { label: "Couples session", amount: "diasporaCouples" },
      ]}
      feeNote="Use the currency switch above to see these in pounds or dollars. Diaspora rates reflect the out-of-hours scheduling; standard rates apply for daytime West Africa slots."
      sections={sections}
      ctaLabel="Book a free conversation"
      ctaHref="/contact"
      ctaNote="Tell me your timezone and I'll send times that work"
      related={["/individual-therapy", "/couples-therapy", "/the-intensive"]}
    />
  );
}
