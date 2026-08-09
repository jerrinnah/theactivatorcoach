export interface Dimension {
  id: string;
  title: string;
  /** Shown alongside the dimension's score in the report. */
  strong: string;
  thin: string;
  questions: string[];
}

export interface Band {
  /** Inclusive lower bound as a percentage of the maximum score. */
  min: number;
  label: string;
  summary: string;
}

export interface Assessment {
  slug: string;
  name: string;
  eyebrow: string;
  intro: string;
  /** Likert labels, lowest agreement first. */
  scale: string[];
  dimensions: Dimension[];
  safetyQuestion: string;
  safetyHelp: string;
  bands: Band[];
  ctaLabel: string;
  ctaHref: string;
}

const SCALE = ["Rarely true", "Sometimes true", "Often true", "Consistently true"];

export const selfAudit: Assessment = {
  slug: "self-audit",
  name: "The Self-Audit",
  eyebrow: "Free · 15 questions · about 10 minutes",
  intro:
    "Most people evaluating a relationship are running the assessment on the wrong person. This is ten minutes of honest questions about you — your patterns, your capacity, your history, and what you actually bring into a room with another human being.",
  scale: SCALE,
  safetyQuestion:
    "Has anything in your current or recent relationship made you feel unsafe — physically, sexually, or financially?",
  safetyHelp:
    "This question is asked in every assessment I run. It changes what happens next, and it is never used to sell you couples therapy.",
  dimensions: [
    {
      id: "self-knowledge",
      title: "Self-knowledge",
      strong: "You can see your own machinery working, which is most of the battle.",
      thin: "Your reactions are currently happening to you rather than being chosen. That is learnable.",
      questions: [
        "I can name my emotional triggers before they fire, not after.",
        "I know which of my reactions belong to my present and which belong to my childhood home.",
        "When something upsets me, I can usually say what it is within a day.",
      ],
    },
    {
      id: "regulation",
      title: "Emotional regulation",
      strong: "You can stay in a difficult room without escalating or disappearing.",
      thin: "Conflict is currently costing you more than it needs to. This is the most trainable of the five.",
      questions: [
        "When I'm hurt, I can stay in the conversation rather than shutting down or escalating.",
        "I can hear criticism of myself without needing to immediately defend or counter-attack.",
        "I take responsibility for my own mood rather than making it someone else's job to fix.",
      ],
    },
    {
      id: "inherited",
      title: "Inherited patterns",
      strong: "You have looked at what you were taught about love and made decisions about it.",
      thin: "You are likely running software written in a house you no longer live in.",
      questions: [
        "I have examined what I learned about love from the home I grew up in.",
        "There is at least one thing my parents did in their relationship that I have consciously decided not to repeat.",
        "I have dealt with my significant past relationships rather than simply moved on from them.",
      ],
    },
    {
      id: "capacity",
      title: "Capacity & readiness",
      strong: "You have room for another person, and you are not asking them to solve you.",
      thin: "A relationship entered from here tends to be asked to carry more than a relationship can.",
      questions: [
        "My life currently has room in it for another person's needs.",
        "I am not looking for a relationship to solve loneliness, finances, family pressure, or my sense of self-worth.",
        "I have people in my life who tell me the truth, and I listen to them.",
      ],
    },
    {
      id: "repair",
      title: "Conflict & repair",
      strong: "You have a way back. Couples with a way back survive things that look fatal.",
      thin: "Rupture is normal; unrepaired rupture is what ends relationships. This is where to start.",
      questions: [
        "I know how to apologise properly — without conditions, excuses, or “but”.",
        "I can raise a difficult subject without waiting for it to become a crisis.",
        "When I've been wrong, I change the behaviour, not just the apology.",
      ],
    },
  ],
  bands: [
    {
      min: 0,
      label: "Considerable exposure",
      summary:
        "There is real work available to you here, and that is a finding rather than a verdict. People in this range typically get the most visible movement from individual therapy, because almost everything identified is inside your own authority to change.",
    },
    {
      min: 50,
      label: "Mixed picture",
      summary:
        "You are solid in some dimensions and thin in others — which is the ordinary result, and more useful than a uniformly good score. Look at your lowest dimension below: that is where your next relationship difficulty is most likely to originate.",
    },
    {
      min: 75,
      label: "Well audited",
      summary:
        "You have done more self-examination than most people who take this. The work available to you now is maintenance and precision rather than repair — and your lowest dimension is still worth reading carefully.",
    },
  ],
  ctaLabel: "Talk this through with me",
  ctaHref: "/individual-therapy",
};

export const relationalRisk: Assessment = {
  slug: "relational-risk-assessment",
  name: "The Relational Risk Assessment",
  eyebrow: "Free · 15 questions · about 12 minutes",
  intro:
    "In risk assessment we never ask “is the system fine?” We ask: where is it exposed, and what happens when that point fails? Almost no couple has ever run that assessment on their own marriage.",
  scale: SCALE,
  safetyQuestion:
    "Has anything in your current relationship made you feel unsafe — physically, sexually, or financially?",
  safetyHelp:
    "A yes here bypasses the normal report entirely. It never routes to a couples-therapy offer.",
  dimensions: [
    {
      id: "unaudited",
      title: "Unaudited individuals",
      strong: "Both of you can see your own contribution. This is the foundation everything else sits on.",
      thin: "Two people who have not examined their own histories will reliably re-enact them on each other.",
      questions: [
        "Both of us have examined our own histories, not just each other's behaviour.",
        "When something goes wrong between us, each of us can identify our own contribution.",
        "Neither of us expects the relationship to heal something the relationship doesn't cause.",
      ],
    },
    {
      id: "repair-protocol",
      title: "Repair protocol",
      strong: "You have a practised way back. This is the single strongest predictor I know of.",
      thin: "You are ruptured without a route home, and silence compounds faster than most people believe.",
      questions: [
        "After a serious argument, we have a reliable way back to each other.",
        "Repair usually takes hours or a day — not weeks of silence.",
        "One of us can apologise first without it being treated as a defeat.",
      ],
    },
    {
      id: "third-parties",
      title: "Third parties",
      strong: "The boundary is clear, agreed, and defended by the right person.",
      thin: "Somebody outside the marriage currently holds authority inside it — often without anyone deciding they should.",
      questions: [
        "Our boundary with extended family is clear, agreed, and holds under pressure.",
        "Neither of us discusses our marriage with an outside person before discussing it with each other.",
        "No previous relationship still has influence over how we operate.",
      ],
    },
    {
      id: "withdrawal",
      title: "Silent withdrawal",
      strong: "Things still get raised. A relationship where things get raised is a living one.",
      thin: "This is the exposure point that presents as peace, and it is the one I see too late most often.",
      questions: [
        "I still raise things that bother me rather than deciding they're not worth it.",
        "We have not quietly stopped discussing any major subject.",
        "Our calm periods are genuine peace, not distance.",
      ],
    },
    {
      id: "review",
      title: "Scheduled review",
      strong: "You inspect deliberately, so drift gets caught while it is still small enough to name.",
      thin: "Nothing is monitoring this relationship. Problems here are found late, by accident.",
      questions: [
        "We deliberately talk about the state of our relationship, not just logistics and children.",
        "We have discussed money, intimacy and the future within the last six months.",
        "If something were drifting, we would notice early rather than late.",
      ],
    },
  ],
  bands: [
    {
      min: 0,
      label: "Multiple exposure points",
      summary:
        "Several of the five points are thin at the same time, which is how relationships fail — not through one catastrophic issue but through a set of small unmonitored ones. This is a workable position, and it is considerably more workable now than in a year.",
    },
    {
      min: 50,
      label: "Contained exposure",
      summary:
        "Some points hold well and at least one is carrying more load than it should. Read your lowest dimension below: in my experience that is where a crisis, if one comes, will originate.",
    },
    {
      min: 75,
      label: "Well maintained",
      summary:
        "This relationship has structure in it. The useful work here is the Annual Review rather than repair — maintenance is what keeps a strong result strong.",
    },
  ],
  ctaLabel: "Book a couples conversation",
  ctaHref: "/couples-therapy",
};

export const assessments = [selfAudit, relationalRisk];

/** Highest band whose threshold the percentage meets. */
export function bandFor(assessment: Assessment, percentage: number): Band {
  return [...assessment.bands].reverse().find((band) => percentage >= band.min) ?? assessment.bands[0];
}
