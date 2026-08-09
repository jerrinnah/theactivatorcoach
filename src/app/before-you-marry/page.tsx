import type { Metadata } from "next";
import ServicePageShell from "@/components/ServicePageShell";

export const metadata: Metadata = {
  title: "Before You Marry",
  description:
    "A five-session premarital programme covering the six subjects that end marriages — money, family, faith, intimacy, children and conflict style. With workbook.",
};

const sections = [
  {
    title: "Who this is for",
    content: [
      "Engaged couples. Couples seriously considering it. And singles who want to do the work before there's anyone to do it with.",
      "You don't find the right person. You become one.",
    ],
  },
  {
    title: "The curriculum",
    content: [
      "This is not open-ended conversation. It's a defined programme with a workbook, and we cover the six subjects that end marriages — before they have the chance to.",
    ],
  },
  {
    title: "The six subjects",
    list: true,
    content: [
      "Money — what is earned, what is shared, what is given to family, and who decides",
      "Family and in-laws — where the boundary sits, and which of you defends it",
      "Faith and values — where you actually agree, and what happens where you don't",
      "Intimacy — expectation, frequency, refusal, and how either of you raises it",
      "Children — whether, when, how many, and how you'll parent differently from your parents",
      "Conflict style — what each of you does under pressure, and how you'll find your way back",
    ],
  },
  {
    title: "What this will not do",
    content: [
      "It will not tell you whether to marry this person. It will make sure that when you decide, you are deciding with full information rather than with hope.",
      "Occasionally — rarely — a couple discovers here that they shouldn't proceed. I regard that as the programme working, not failing.",
    ],
  },
];

export default function BeforeYouMarryPage() {
  return (
    <ServicePageShell
      eyebrow="Five sessions that will save you five years"
      title="Before You Marry"
      heroCopy={[
        "You will spend a great deal of money on a wedding that lasts twelve hours. This is about the part that comes after.",
        "Six subjects, five sessions, and a workbook you keep. The conversations most couples do not have until they are expensive.",
      ]}
      format={[
        "5 sessions × 75 minutes",
        "Weekly, or condensed into a single weekend",
        "Online worldwide, or in person in Port Harcourt",
        "Includes the Before You Marry workbook",
        "Available to singles as an individual track",
      ]}
      fees={[
        {
          label: "Full programme",
          amount: "beforeYouMarry",
          note: "For both of you — all five sessions and materials included",
        },
      ]}
      feeNote="Frequently paid for by parents or as an engagement gift. Say so when you book and I will handle the arrangement discreetly."
      sections={sections}
      ctaLabel="Book the programme"
      ctaHref="/contact"
      ctaNote="Start with a free conversation if you'd rather"
      related={["/couples-therapy", "/individual-therapy", "/annual-review"]}
    />
  );
}
