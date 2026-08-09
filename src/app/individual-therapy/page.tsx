import type { Metadata } from "next";
import ServicePageShell from "@/components/ServicePageShell";

export const metadata: Metadata = {
  title: "Individual Therapy",
  description:
    "Individual psychotherapy with Dr. Lauretta Ogbum — for patterns that keep repeating, anxiety, low mood, grief and burnout. Online worldwide or in person in Port Harcourt.",
};

const sections = [
  {
    title: "Who this is for",
    content: [
      "People who are competent almost everywhere else and stuck in one place. People carrying anxiety, low mood, grief, burnout, or a pattern that keeps repeating across different relationships with different people.",
      "People who have realised the common factor is them — which is an uncomfortable thing to notice and the most useful realisation available.",
      "It's also for people whose partner won't come. Starting alone works more often than you'd think.",
    ],
  },
  {
    title: "What actually happens",
    content: [
      "The first session is an assessment. I want your history, your patterns, and what brought you here now rather than last year. You will not be interrogated, and you can stop at any point.",
      "From the second session we work. That means noticing what recurs, tracing where it was learned, and building something different — deliberately and with practice. It is not advice, and it is not a lecture. It's an examination, conducted with you rather than on you.",
    ],
  },
  {
    title: "What this will not do",
    content: [
      "I will not tell you whether to leave your relationship. I will help you get clear enough to make that decision yourself and live with it.",
      "I will not diagnose or prescribe. Where medication or psychiatric care is appropriate, I will refer you properly.",
      "I will not make it quick. Patterns that took twenty years to build do not resolve in three sessions, and anyone promising otherwise is selling something.",
    ],
  },
];

export default function IndividualTherapyPage() {
  return (
    <ServicePageShell
      eyebrow="The work that has to happen first"
      title="Individual Therapy"
      heroCopy={[
        "For people who are competent almost everywhere else and stuck in one place — carrying anxiety, low mood, grief, burnout, or a pattern that keeps repeating across different relationships with different people.",
        "Your relationship will only ever be as healthy as you are. This is where that gets addressed.",
      ]}
      format={[
        "50 minutes per session",
        "Weekly or fortnightly",
        "Online worldwide, or in person in Port Harcourt",
        "Most people work with me for 8–16 sessions",
        "Formally reviewed together at session six",
      ]}
      fees={[
        { label: "Per session", amount: "individualSession" },
        { label: "Block of six", amount: "individualBlock6", note: "Paid in advance — a 10% saving" },
      ]}
      feeNote="A limited number of reduced-fee places are held at any time. If cost is the only thing standing between you and this work, say so in your first conversation."
      sections={sections}
      ctaLabel="Book a free conversation"
      ctaHref="/contact"
      ctaNote="Fifteen minutes · No charge · Nothing on record"
      related={["/couples-therapy", "/the-intensive", "/diaspora"]}
    />
  );
}
