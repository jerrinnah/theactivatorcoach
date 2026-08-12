/** About, Work With Me, Contact, Academy, Books, Speaking, Letter, Crisis, Privacy. */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  esc, blob, leafBranch, psiMark, portrait, button, sectionHeading, serviceIcon,
  whatsappIcon, checkIcon, quietExit, currencyToggle, price, trustBar,
  letterSignup, contactDetails, whatsappLink, practitioner,
} from "./template.mjs";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "lib") + path.sep;
const { serviceCards, beliefs, processSteps } = await import(SRC + "siteData.ts");
const { sortedArticles, formatArticleDate } = await import(SRC + "insights.ts");

export function extraPages() {
  const pages = [];

  /* ---------------------------- About ---------------------------- */
  const credentials = [
    ["PhD, Psychology", "Doctoral training in psychology and psychotherapeutic practice."],
    ["Executive Council, Life Coaches Association of Nigeria", "Serving on the executive council of the national professional body."],
    ["Founder & Lead Therapist, Activator Coaching Academy", "Training coaches, pastoral workers and practitioners in relational assessment and repair."],
    ["Bestselling co-author — The ABC of Marriage", "An alphabetical guide to activating bliss in your marriage, written with Johnson Ogbum."],
    ["Pan-African Impact & Leadership Laureate nominee", "Recognised for work on relational health across the continent and diaspora."],
    ["Featured in Her Network", "Writing and commentary on relationships, risk, and the private cost of public careers."],
  ];
  const notForYou = [
    "You want someone to confirm that your partner is the problem.",
    "You want a verdict on whether to stay or go, delivered by me.",
    "You want it fixed in three sessions because twenty years is inconvenient.",
    "You want a diagnosis of somebody who is not in the room.",
  ];

  pages.push({
    path: "/about",
    title: "About",
    description: "Dr. Lauretta Ogbum came into psychotherapy from risk assessment in the energy sector. Twenty-five years married, PhD in Psychology, and an assessor's discipline applied to relationships.",
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-40 -top-44 h-[40rem] w-[40rem] text-sage-soft/45")}
  <div class="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
    <div>
      <p class="eyebrow">From risk assessment to the human heart</p>
      <h1 class="mt-5 font-display text-[2.75rem] leading-[1.04] text-ink sm:text-[3.75rem]">I did not begin in psychology.</h1>
      <div class="mt-7 space-y-5 text-lg leading-[1.8] text-ink-soft">
        <p>My early career was in the energy sector, in security and risk assessment. My job was to look at a system and answer one question honestly: where is this exposed, and what happens when that point fails?</p>
        <p>Catastrophes are almost never sudden — they are the visible moment of a failure that has been quietly accumulating for a long time, in a place nobody was looking.</p>
        <p>Then I started noticing the same pattern in people. Capable, senior, accomplished people would go home to relationships they had no framework for at all: no assessment, no maintenance, no repair protocol. Just hope, and the assumption that love would cover what nobody had ever been taught to build.</p>
        <p>I have spent the years since bringing an assessor&rsquo;s discipline to work that is usually done with nothing but good intentions.</p>
      </div>
    </div>
    <div class="relative">
      ${leafBranch("pointer-events-none absolute -left-10 top-10 z-10 hidden h-64 w-32 text-sage/40 lg:block")}
      ${portrait({ alt: `${practitioner.shortName}, psychotherapist`, label: practitioner.shortName, extra: "shadow-xl shadow-sage-deep/10" })}
    </div>
  </div>
</section>

${trustBar()}

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: "What I believe", title: "Four things I will say out loud", intro: "These are not marketing lines. They are the assumptions everything in my practice is built on, and it is fair for you to know them before you book anything." })}
  <div class="mt-14 grid gap-6 sm:grid-cols-2">
    ${beliefs.map((b) => `<div class="rounded-4xl border border-line bg-white p-8"><h3 class="font-display text-[1.6rem] leading-snug text-ink">${esc(b.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">${esc(b.body)}</p></div>`).join("")}
  </div>
</div></section>

<section class="relative overflow-hidden border-y border-line bg-sage-mist">
  ${psiMark("pointer-events-none absolute -right-10 top-1/4 h-72 w-72 text-sage/15")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8">
    ${sectionHeading({ eyebrow: "Being straight with you", title: "When I am not the right person" })}
    <p class="mt-6 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink-soft">I would rather tell you this now than take a booking and disappoint you at session three. If any of the following is what you are looking for, I am not it — and in the free conversation I will say so and point you somewhere better.</p>
    <ul class="mt-9 space-y-4">
      ${notForYou.map((i) => `<li class="flex gap-4 rounded-3xl border border-sage/25 bg-white/80 p-6 text-[1.0625rem] leading-7 text-ink-soft"><span aria-hidden="true" class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage"></span>${esc(i)}</li>`).join("")}
    </ul>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: "Credentials", title: "Training, practice and public work" })}
  <dl class="mt-12 grid gap-6 sm:grid-cols-2">
    ${credentials.map(([label, detail]) => `<div class="rounded-4xl border border-line bg-white p-7"><dt class="font-display text-2xl leading-snug text-ink">${esc(label)}</dt><dd class="mt-2.5 text-[0.9375rem] leading-7 text-muted">${esc(detail)}</dd></div>`).join("")}
  </dl>
</div></section>

<section class="relative overflow-hidden bg-sage-dark">
  ${leafBranch("pointer-events-none absolute -left-14 bottom-0 h-96 w-48 text-white/[0.07]")}
  <div class="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
    <h2 class="font-display text-[2.5rem] leading-tight text-white sm:text-[3rem]">Twenty-five years married.</h2>
    <p class="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-sage-soft/85">Which does not make me an authority on your marriage. It does mean I have made most of the ordinary mistakes personally, before I ever saw them professionally.</p>
    <div class="mt-9 flex flex-wrap justify-center gap-3">
      ${button("Book a free conversation", "/contact", { variant: "light", size: "lg" })}
      ${button("Nine things I&rsquo;d tell my younger self", "/insights/twenty-five-years-married", { variant: "onDark", size: "lg" })}
    </div>
  </div>
</section>`,
  });

  /* ------------------------- Work with me ------------------------- */
  const comparison = [
    ["Individual Therapy", "/individual-therapy", "One person, patterns that repeat", "50 min · 8–16 sessions", "individualSession", "per session"],
    ["Couples Therapy", "/couples-therapy", "Two people, still willing", "75–90 min · 8–12 sessions", "couplesSession", "per session"],
    ["Before You Marry", "/before-you-marry", "Engaged, or seriously considering", "5 × 75 min", "beforeYouMarry", "full programme"],
    ["The Annual Review", "/annual-review", "Couples who are genuinely fine", "120 min · yearly", "annualReview", "per review"],
    ["The Intensive", "/the-intensive", "Crisis, or no time for weekly", "1–2 full days", "intensiveOneDay", "from, one day"],
    ["Diaspora Sessions", "/diaspora", "Nigerians abroad", "50–90 min · out of hours", "diasporaIndividual", "from, individual"],
  ];

  pages.push({
    path: "/work-with-me",
    title: "Work With Me",
    description: "Six ways to work with Dr. Lauretta Ogbum — individual and couples therapy, premarital work, the Annual Review, Intensives and Diaspora sessions. Fees shown in ₦, £ or $.",
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-44 -top-44 h-[40rem] w-[40rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">Work with me</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">Every piece of work here starts the same way.</h1>
    <p class="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">A free fifteen-minute conversation. There is no charge, no obligation, and nothing goes on record. You describe what is happening; I tell you honestly which of these — if any — is the right one.</p>
    <div class="mt-9">${button("Book that conversation", "/contact", { size: "lg" })}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: "The six services", title: "Choose where to start" })}
  <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    ${serviceCards.map((card) => `<a href="${card.href}" class="group flex flex-col rounded-4xl border border-line bg-white p-8 transition duration-200 hover:-translate-y-1 hover:border-sage/50 hover:shadow-xl hover:shadow-sage-deep/8">
      <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-mist text-sage-deep transition group-hover:bg-sage-soft">${serviceIcon(card.icon, "h-7 w-7")}</span>
      <h2 class="mt-6 font-display text-[1.75rem] leading-tight text-ink">${esc(card.title)}</h2>
      <p class="mt-2 text-sm text-sage-deep">${esc(card.tagline)}</p>
      <p class="mt-4 flex-1 text-[0.9375rem] leading-7 text-muted">${esc(card.description)}</p>
      <div class="mt-7 flex items-center justify-between border-t border-line-soft pt-5"><span class="text-xs text-muted">${esc(card.meta)}</span><span class="text-sm text-sage-deep">→</span></div>
    </a>`).join("")}
  </div>
</div></section>

<section class="border-y border-line bg-cream-deep"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  <div class="flex flex-wrap items-end justify-between gap-6">
    ${sectionHeading({ eyebrow: "Fees", title: "Side by side" })}
    <div class="flex items-center gap-3"><span class="text-xs uppercase tracking-[0.16em] text-muted">Show fees in</span>${currencyToggle()}</div>
  </div>
  <div class="mt-10 overflow-x-auto rounded-4xl border border-line bg-white">
    <table class="w-full min-w-[46rem] border-collapse text-left">
      <caption class="sr-only">Comparison of services, who each is for, session length and fee</caption>
      <thead><tr class="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
        <th scope="col" class="px-7 py-5 font-medium">Service</th><th scope="col" class="px-7 py-5 font-medium">Who it&rsquo;s for</th>
        <th scope="col" class="px-7 py-5 font-medium">Format</th><th scope="col" class="px-7 py-5 text-right font-medium">Fee</th>
      </tr></thead>
      <tbody>
        ${comparison.map(([name, href, who, format, key, label]) => `<tr class="border-b border-line-soft last:border-0">
          <th scope="row" class="px-7 py-6 align-top font-normal"><a href="${href}" class="font-display text-xl text-ink underline-offset-4 transition hover:text-sage-deep hover:underline">${esc(name)}</a></th>
          <td class="px-7 py-6 align-top text-sm leading-6 text-muted">${esc(who)}</td>
          <td class="px-7 py-6 align-top text-sm leading-6 text-muted">${esc(format)}</td>
          <td class="px-7 py-6 align-top text-right"><span class="font-display text-2xl text-sage-dark">${price(key)}</span><span class="mt-0.5 block text-xs text-muted">${esc(label)}</span></td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>
  <p class="mt-6 max-w-3xl text-sm leading-6 text-muted">Block and programme rates carry a saving on the per-session fee — see each service page for the full breakdown. A limited number of reduced-fee places are held at any time; if cost is the only thing in the way, say so in your first conversation.</p>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: "What happens", title: "Four steps, and you can stop at any of them", intro: "Nothing here is a commitment you cannot withdraw from." })}
  <ol class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
    ${processSteps.map((s) => `<li><span class="font-display text-5xl text-sage/45">${s.step}</span><h3 class="mt-3 font-display text-2xl text-ink">${esc(s.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(s.body)}</p></li>`).join("")}
  </ol>
</div></section>

<section class="relative overflow-hidden bg-sage-mist">
  ${leafBranch("pointer-events-none absolute -right-10 -top-6 h-72 w-40 rotate-12 text-sage/25")}
  <div class="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
    <h2 class="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">Not sure which one?</h2>
    <p class="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">Most people aren&rsquo;t. That is what the free conversation is for — and if you would rather look at it privately first, either assessment will tell you a great deal in ten minutes.</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">${button("Book a free conversation", "/contact", { size: "lg" })}${button("Take the Self-Audit", "/self-audit", { variant: "outline", size: "lg" })}</div>
  </div>
</section>`,
  });

  /* --------------------------- Contact --------------------------- */
  const field = "w-full rounded-2xl border border-line bg-cream px-5 py-3.5 text-[0.9375rem] text-ink placeholder:text-muted/70 transition focus:border-sage focus:bg-white focus:outline-none";
  const topics = ["Individual Therapy", "Couples Therapy", "Before You Marry", "The Annual Review", "The Intensive", "Diaspora Sessions", "The Academy", "Speaking or media", "Something else"];

  pages.push({
    path: "/contact",
    title: "Contact & Booking",
    description: "Book a free fifteen-minute conversation with Dr. Lauretta Ogbum, or send an enquiry. Port Harcourt by appointment, online worldwide. Replies within two working days.",
    body: `
${quietExit()}
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">Contact &amp; booking</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">Start with a free conversation.</h1>
    <p class="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">Fifteen minutes, no charge, no obligation, and nothing goes on record. You describe what is happening; I tell you honestly whether I am the right person for it — and if I am not, I will tell you who is.</p>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14 lg:px-8 lg:py-20">
  <div class="rounded-4xl border border-line bg-white p-8 sm:p-10">
    <h2 class="font-display text-3xl text-ink">Send me a message</h2>
    <p class="mt-3 text-[0.9375rem] leading-7 text-muted">Everything here comes to me directly. You do not need to explain your whole situation — a sentence or two is enough to go on.</p>
    <form class="js-enquiry mt-8 space-y-6" novalidate>
      <div class="hidden" aria-hidden="true"><label for="company">Company</label><input id="company" name="company" tabindex="-1" autocomplete="off"/></div>
      <div class="grid gap-6 sm:grid-cols-2">
        <div><label for="name" class="mb-2 block text-sm font-medium text-ink">What should I call you?</label><input id="name" name="name" type="text" autocomplete="name" placeholder="First name is enough" class="${field}"/><p data-error-for="name" class="mt-1.5 text-sm text-red-700"></p></div>
        <div><label for="email" class="mb-2 block text-sm font-medium text-ink">Email address</label><input id="email" name="email" type="email" autocomplete="email" placeholder="you@example.com" class="${field}"/><p data-error-for="email" class="mt-1.5 text-sm text-red-700"></p></div>
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        <div><label for="topic" class="mb-2 block text-sm font-medium text-ink">What is this about?</label>
          <select id="topic" name="topic" class="${field}"><option value="">Choose one — or leave it blank</option>${topics.map((t) => `<option>${esc(t)}</option>`).join("")}</select></div>
        <div><label for="preferredContact" class="mb-2 block text-sm font-medium text-ink">How should I reply?</label>
          <select id="preferredContact" name="preferredContact" class="${field}"><option>Email</option><option>WhatsApp</option><option>Either is fine</option></select></div>
      </div>
      <div><label for="message" class="mb-2 block text-sm font-medium text-ink">What is happening?</label>
        <textarea id="message" name="message" rows="6" placeholder="A sentence or two is enough. You do not need to explain everything here — that is what the conversation is for." class="${field} resize-y"></textarea>
        <p data-error-for="message" class="mt-1.5 text-sm text-red-700"></p></div>
      <div>
        <label for="consent" class="flex cursor-pointer items-start gap-3">
          <input id="consent" name="consent" type="checkbox" class="mt-1 h-4 w-4 shrink-0 rounded border-line accent-sage-deep"/>
          <span class="text-sm leading-6 text-ink-soft">I&rsquo;m happy for Dr. Ogbum to reply to me using the details above. Enquiries are kept confidential and are never shared or used for marketing.</span>
        </label>
        <p data-error-for="consent" class="mt-1.5 text-sm text-red-700"></p>
      </div>
      <button type="submit" class="w-full rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark sm:w-auto">Send this to Dr. Ogbum</button>
      <p class="js-status text-sm leading-6" role="status"></p>
      <p class="text-xs leading-5 text-muted">This form is not monitored continuously and is not an emergency service. If you are at risk of harm, please use the crisis resources rather than waiting for a reply.</p>
    </form>
  </div>
  <aside class="space-y-6">
    <div class="rounded-4xl bg-sage-dark p-8 text-sage-soft">
      <h2 class="font-display text-2xl text-white">Prefer WhatsApp?</h2>
      <p class="mt-3 text-sm leading-7 text-sage-soft/85">Scheduling and admin only — please do not send clinical detail over WhatsApp.</p>
      <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-sage-dark transition hover:bg-sage-mist">${whatsappIcon()}${esc(contactDetails.whatsappDisplay)}</a>
    </div>
    <div class="rounded-4xl border border-line bg-white p-8">
      <h2 class="font-display text-2xl text-ink">Direct email</h2>
      <dl class="mt-5 space-y-4">
        ${[["General & practice enquiries", contactDetails.email], ["Speaking, media & corporate", contactDetails.speakingEmail], ["Academy applications", contactDetails.academyEmail]]
          .map(([label, value]) => `<div><dt class="text-xs uppercase tracking-[0.14em] text-muted">${esc(label)}</dt><dd class="mt-1"><a href="mailto:${value}" class="text-[0.9375rem] text-sage-deep underline-offset-4 hover:underline">${value}</a></dd></div>`).join("")}
      </dl>
    </div>
    <div class="rounded-4xl border border-line bg-white p-8">
      <h2 class="font-display text-2xl text-ink">Practicalities</h2>
      <dl class="mt-5 space-y-4">
        ${[["In person", contactDetails.location], ["Online", contactDetails.reach + " — timezone-aware scheduling for diaspora clients"], ["Response time", contactDetails.responseTime], ["Confidentiality", "Enquiries are private and never shared. Nothing you send here goes on a clinical record."]]
          .map(([label, value]) => `<div><dt class="text-xs uppercase tracking-[0.14em] text-muted">${esc(label)}</dt><dd class="mt-1 text-[0.9375rem] leading-6 text-ink-soft">${esc(value)}</dd></div>`).join("")}
      </dl>
    </div>
  </aside>
</div></section>

<section class="border-t border-line bg-cream-deep"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <div class="rounded-4xl border border-amber-300/50 bg-amber-50/60 p-8 sm:p-10">
    <h2 class="font-display text-3xl text-ink">If your situation is urgent</h2>
    <p class="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">This practice is not an emergency service and this form is not monitored continuously. If you or someone you know is in immediate danger, at risk of harm, or thinking about suicide, please do not wait for a reply from me.</p>
    <a href="/crisis" class="mt-7 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition hover:bg-ink-soft">Crisis and safety resources →</a>
  </div>
</div></section>`,
  });

  /* --------------------------- Academy --------------------------- */
  const modules = [
    ["01", "Assessment before intervention", "How to find out what is actually happening in front of you before you do anything about it. The five exposure points, and how to run them in a real conversation rather than on paper."],
    ["02", "The room, and your place in it", "Neutrality as a practical skill. How to refuse recruitment onto a side, hold two accounts at once, and notice the moment you have started taking one."],
    ["03", "Repair as a teachable protocol", "What repair actually consists of, why most apologies fail structurally, and how to teach a couple a way back that survives contact with a real argument."],
    ["04", "Culture, family and the third party", "Working with extended family as context rather than obstacle. Where the boundary goes in our setting, who defends it, and how to help without importing advice that doesn't fit."],
    ["05", "Safety, limits and referral", "Screening for harm. When couples work is contraindicated. Recognising what is outside your scope, and referring properly rather than reluctantly."],
    ["06", "Practice and supervision", "Live practice with feedback, then ongoing group supervision. Nobody leaves this course having only heard about the work."],
  ];
  const audience = [
    "Coaches who keep ending up in relationship conversations they were not trained for",
    "Pastoral and ministry workers doing marriage counselling by default",
    "HR and employee-wellbeing professionals holding staff through personal crisis",
    "Early-career therapists who want structure for couples work",
    "Community and NGO practitioners working with families",
  ];

  pages.push({
    path: "/academy",
    title: "Activator Coaching Academy",
    description: "Training for coaches, pastoral workers, HR professionals and therapists who find themselves holding other people's relationships — taught by Dr. Lauretta Ogbum.",
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">Activator Coaching Academy</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">Training for people who hold other people&rsquo;s relationships.</h1>
    <p class="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">A very large number of people end up doing this work without ever having been taught it — pastors, coaches, HR leads, and the sensible friend everyone calls. This is the training I wish had existed when I started.</p>
    <div class="mt-9 flex flex-wrap gap-3">${button("Register your interest", "/contact", { size: "lg" })}${button(esc(contactDetails.academyEmail), "mailto:" + contactDetails.academyEmail, { variant: "outline", size: "lg" })}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  <div class="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
    ${sectionHeading({ eyebrow: "Who it's for", title: "You are probably already doing this work.", intro: "The question is whether you are doing it with a framework or with instinct. Instinct is not nothing — but it does not tell you when to stop, and it does not protect the people in front of you." })}
    <ul class="space-y-4 self-center">
      ${audience.map((i) => `<li class="flex gap-3.5 rounded-3xl border border-line bg-white p-5 text-[0.9375rem] leading-7 text-ink-soft">${checkIcon("mt-1 h-4 w-4 shrink-0 text-sage-deep")}${esc(i)}</li>`).join("")}
    </ul>
  </div>
</div></section>

<section class="border-y border-line bg-cream-deep"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: "The curriculum", title: "Six modules", intro: "Taught live in cohorts, with practice and supervision built in rather than bolted on." })}
  <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    ${modules.map(([n, t, b]) => `<div class="rounded-4xl border border-line bg-white p-8"><span class="font-display text-4xl text-sage/50">${n}</span><h3 class="mt-3 font-display text-2xl leading-snug text-ink">${esc(t)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(b)}</p></div>`).join("")}
  </div>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <div class="rounded-4xl border border-line bg-white p-9 sm:p-12">
    <h2 class="font-display text-3xl text-ink">How to join a cohort</h2>
    <p class="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">Cohorts are small and run a few times a year, and places are offered after a short application conversation rather than on a first-come basis — partly to keep the group workable, and partly because this material is not right for everyone who wants it.</p>
    <ol class="mt-8 space-y-5">
      ${["Register your interest using the form, or email the Academy directly.", "You will receive the current cohort dates, the full syllabus, and the fee.", "A short conversation to check the fit in both directions.", "Confirm your place and receive the pre-course material."]
        .map((s, i) => `<li class="flex gap-4"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-mist text-sm text-sage-deep">${i + 1}</span><span class="pt-1 text-[0.9375rem] leading-7 text-ink-soft">${esc(s)}</span></li>`).join("")}
    </ol>
    <p class="mt-8 text-sm leading-6 text-muted">Fees and dates are confirmed at application stage and vary by cohort format. Ask and you will be told plainly.</p>
  </div>
</div></section>

<section class="relative overflow-hidden bg-sage-mist">
  ${psiMark("pointer-events-none absolute -right-8 top-1/4 h-64 w-64 text-sage/15")}
  <div class="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
    <h2 class="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">Interested in the next cohort?</h2>
    <p class="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">Tell me what work you already do and what keeps arriving that you feel unequipped for. That is usually the most useful thing to start from.</p>
    <div class="mt-8 flex justify-center">${button("Register your interest", "/contact", { size: "lg" })}</div>
  </div>
</section>`,
  });

  /* ---------------------------- Books ---------------------------- */
  const uses = [
    ["For couples", "Read a letter at a time, together. The alphabetical structure means you can start anywhere and finish nothing — which is exactly how most couples actually read."],
    ["For marriage preparation", "Used alongside the Before You Marry programme as a shared reference, so both of you are working from the same language."],
    ["For churches and groups", "The structure lends itself to small-group study — one entry per session. Bulk pricing is available on request."],
    ["As a gift", "Frequently bought for weddings, anniversaries and engagements. Ask about signed copies when you order."],
  ];

  pages.push({
    path: "/books",
    title: "Books",
    description: "The ABC of Marriage — an alphabetical guide to activating bliss in your marriage, by Lauretta & Johnson Ogbum.",
    extraHead: `<meta property="og:image" content="/abc-of-marriage.jpg"/>`,
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-44 -top-40 h-[36rem] w-[36rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-12 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
    <div class="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
      <div>
        <p class="eyebrow">Books</p>
        <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.5rem]">The ABC of Marriage</h1>
        <p class="mt-4 text-lg text-sage-deep">An alphabetical guide to activating bliss in your marriage.</p>
        <p class="mt-3 text-sm uppercase tracking-[0.16em] text-muted">By Lauretta &amp; Johnson Ogbum</p>
        <div class="mt-7 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
          <p>A bestselling book on marriage, written by two people who have been in one for twenty-five years — and who work with other people&rsquo;s for a living.</p>
          <p>It is organised alphabetically rather than as an argument, which means you can open it at whatever you happen to need this week and put it down again. Marriages are not repaired in one sitting, and the book does not pretend otherwise.</p>
        </div>
        <div class="mt-9 flex flex-wrap gap-3">${button("Ask about copies", "/contact", { size: "lg" })}${button("Bulk &amp; church orders", "mailto:" + contactDetails.email, { variant: "outline", size: "lg" })}</div>
        <p class="mt-5 text-sm text-muted">Retail links are being finalised — email in the meantime and copies will be arranged directly.</p>
      </div>
      <div class="mx-auto w-full max-w-xs lg:max-w-sm">
        <img src="/abc-of-marriage.jpg" alt="Front cover of The ABC of Marriage by Lauretta and Johnson Ogbum" width="512" height="768" class="w-full rounded-2xl shadow-2xl shadow-sage-deep/25"/>
      </div>
    </div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: "How people use it", title: "Four ways it gets read", intro: "An alphabetical guide is a reference, not a course. That is deliberate — it survives being picked up and put down, which is the only reading pattern a busy marriage actually supports." })}
  <div class="mt-14 grid gap-6 sm:grid-cols-2">
    ${uses.map(([t, b]) => `<div class="rounded-4xl border border-line bg-white p-8"><h3 class="font-display text-2xl text-ink">${esc(t)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(b)}</p></div>`).join("")}
  </div>
</div></section>

<section class="border-y border-line bg-cream-deep"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <div class="rounded-4xl border border-line bg-white p-9 sm:p-12">
    <p class="eyebrow">The Activator Letter</p>
    <h2 class="mt-3 font-display text-3xl text-ink">Hear about new writing and new editions.</h2>
    <p class="mt-3 text-[0.9375rem] leading-7 text-muted">One letter a month from the practice. Subscribers hear about new work first.</p>
    <div class="mt-6">${letterSignup()}</div>
  </div>
</div></section>`,
  });

  /* --------------------------- Speaking --------------------------- */
  const talks = [
    ["Where is this exposed?", "Keynote · 45–60 minutes", "The five exposure points, taken from risk assessment and applied to the relationships your people go home to. The talk that most often produces a queue afterwards."],
    ["The private cost of a public career", "Corporate & leadership · 60 minutes", "What sustained high performance does to a household, why the most competent people are frequently the least maintained, and what an organisation can reasonably do about it."],
    ["Repair is a skill", "Workshop · 90 minutes–half day", "Practical repair mechanics for teams and for couples. Interactive, uncomfortable in the useful way, and immediately usable."],
    ["Before you marry", "Church, campus & community · 60–90 minutes", "The six subjects that end marriages, delivered to a room rather than a couple. Frequently booked as a marriage-preparation series."],
  ];
  const formats = ["Conference keynotes", "Leadership offsites and executive retreats", "Employee wellbeing and EAP programmes", "Church and community marriage series", "University and campus events", "Panels, podcasts and broadcast media"];

  pages.push({
    path: "/speaking",
    title: "Speaking & Corporate",
    description: "Keynotes and corporate sessions on relational risk, burnout and the private cost of high-performing careers — from a psychotherapist with a background in risk assessment.",
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">Speaking &amp; corporate</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">Your people are competent at work and unassessed at home.</h1>
    <p class="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">I came into psychology from risk assessment in the energy sector, and I talk about relationships the way I used to talk about systems: where is this exposed, and what happens when that point fails?</p>
    <div class="mt-9 flex flex-wrap gap-3">${button("Enquire about a booking", "mailto:" + contactDetails.speakingEmail, { size: "lg" })}${button("Use the contact form", "/contact", { variant: "outline", size: "lg" })}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: "Talks", title: "Four sessions, adapted to your room", intro: "Each of these can run as a keynote, a workshop, or a series. Tell me who is in the room and what you want them to leave with, and I will tell you which of these fits — or propose something else." })}
  <div class="mt-14 grid gap-6 sm:grid-cols-2">
    ${talks.map(([t, a, b]) => `<div class="rounded-4xl border border-line bg-white p-8"><p class="text-xs uppercase tracking-[0.16em] text-sage-deep">${esc(a)}</p><h3 class="mt-4 font-display text-[1.75rem] leading-snug text-ink">${esc(t)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(b)}</p></div>`).join("")}
  </div>
</div></section>

<section class="border-y border-line bg-cream-deep"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  <div class="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
    ${sectionHeading({ eyebrow: "Formats", title: "Where this usually happens", intro: "In person across Nigeria, and remotely worldwide. Corporate sessions can be paired with confidential one-to-one slots for staff on the day, which is frequently where the real work starts." })}
    <ul class="grid gap-3 self-center sm:grid-cols-2">
      ${formats.map((f) => `<li class="rounded-2xl border border-line bg-white px-5 py-4 text-sm leading-6 text-ink-soft">${esc(f)}</li>`).join("")}
    </ul>
  </div>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <div class="rounded-4xl border border-line bg-white p-9 sm:p-12">
    <h2 class="font-display text-3xl text-ink">What to include in your enquiry</h2>
    <ul class="mt-6 space-y-3 text-[1.0625rem] leading-[1.8] text-ink-soft">
      ${["Date, city and format — in person or remote", "Who is in the room, roughly how many, and what they do", "What you want them to leave with", "Session length and whether you'd like one-to-one slots alongside", "Whether this is a one-off or part of a series"]
        .map((i) => `<li class="flex gap-3.5"><span aria-hidden="true" class="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage"></span>${esc(i)}</li>`).join("")}
    </ul>
    <p class="mt-8 text-sm leading-6 text-muted">Speaker biography, headshots and a one-page overview are available on request. Fees depend on format, travel and whether one-to-one slots are included — ask and you will get a straight number.</p>
  </div>
</div></section>

<section class="relative overflow-hidden bg-sage-mist">
  ${psiMark("pointer-events-none absolute -right-8 top-1/4 h-64 w-64 text-sage/15")}
  <div class="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
    <h2 class="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">Booking or media enquiry?</h2>
    <p class="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">Speaking, media and corporate enquiries go to a dedicated inbox and are answered within two working days.</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">${button(esc(contactDetails.speakingEmail), "mailto:" + contactDetails.speakingEmail, { size: "lg" })}${button("Contact form", "/contact", { variant: "outline", size: "lg" })}</div>
  </div>
</section>`,
  });

  /* ---------------------------- Letter ---------------------------- */
  const promises = [
    ["Once a month", "Not weekly, not whenever something occurs to me. One letter, at the start of the month."],
    ["One idea, properly", "A single thing from the practice, written at enough length to actually be useful. Not tips."],
    ["No sequences", "You will not be dropped into an automated funnel. Nothing gets sold to you between letters."],
    ["One click out", "Unsubscribe is in every email and works immediately. Your address is never shared or sold."],
  ];

  pages.push({
    path: "/letter",
    title: "The Activator Letter",
    description: "One idea from the practice, written out properly, once a month. No sequences, no upsells, unsubscribe in one click.",
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-40 -top-44 h-[38rem] w-[38rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-12 bottom-0 h-80 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">The Activator Letter</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">One letter a month. No noise.</h1>
    <p class="mt-7 text-lg leading-[1.8] text-ink-soft">One idea from the practice, written out properly and sent once a month. It is the same material I use in the room — occasionally something I have changed my mind about, which in my experience is the more interesting kind of letter.</p>
    <div class="mt-10 rounded-4xl border border-line bg-white p-8 sm:p-10">${letterSignup()}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <h2 class="font-display text-[2.25rem] leading-tight text-ink">What you are agreeing to</h2>
  <div class="mt-10 grid gap-6 sm:grid-cols-2">
    ${promises.map(([t, b]) => `<div class="rounded-3xl border border-line bg-white p-7"><h3 class="font-display text-2xl text-ink">${esc(t)}</h3><p class="mt-2.5 text-[0.9375rem] leading-7 text-muted">${esc(b)}</p></div>`).join("")}
  </div>
</div></section>

<section class="border-t border-line bg-cream-deep"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <h2 class="font-display text-[2.25rem] leading-tight text-ink">The kind of thing you&rsquo;ll get</h2>
  <p class="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">These went out as letters first. If they read like something you want in your inbox, sign up above.</p>
  <div class="mt-10 space-y-4">
    ${sortedArticles.slice(0, 4).map((a) => `<a href="/insights/${a.slug}" class="group flex flex-col gap-2 rounded-3xl border border-line bg-white p-7 transition hover:border-sage/50 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div><p class="text-xs uppercase tracking-[0.14em] text-sage-deep">${esc(a.category)}</p><h3 class="mt-2 font-display text-2xl leading-snug text-ink">${esc(a.title)}</h3></div>
      <p class="shrink-0 text-sm text-muted">${formatArticleDate(a.date)}</p></a>`).join("")}
  </div>
</div></section>`,
  });

  /* ---------------------------- Crisis ---------------------------- */
  const ifUnsafe = [
    "If you can leave safely, leave. Go to a public place, a trusted person's home, or a police station.",
    "Tell one person outside the household what is happening. Isolation is the condition that harm depends on.",
    "Keep identification, money and a phone somewhere you can reach quickly, and if it is safe to, keep a charged phone on you.",
    "Note that couples counselling is not a safe first step where there is violence or coercion. It can increase risk. Individual support comes first.",
  ];
  const ifSuicidal = [
    "You do not have to be certain, or in immediate danger, to deserve help. Wanting it to stop is enough of a reason to tell someone.",
    "Tell one person tonight — a friend, a family member, a doctor, or a helpline. Saying it out loud to another person is the single most useful thing available right now.",
    "If you have a plan or the means to act, treat this as an emergency and call 112 or go to your nearest hospital.",
    "Try not to be alone while you feel this way. Ask someone to stay, or go to where other people are.",
  ];

  pages.push({
    path: "/crisis",
    title: "Crisis & Safety Resources",
    description: "If you are in immediate danger or thinking about suicide, this page lists where to get help now. This practice is not an emergency service.",
    body: `
${quietExit()}
<section class="border-b border-line bg-amber-50"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
  <p class="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-amber-800">Crisis &amp; safety</p>
  <h1 class="mt-5 font-display text-[2.5rem] leading-[1.06] text-ink sm:text-[3.5rem]">If you are in danger right now, do not wait for me.</h1>
  <p class="mt-6 max-w-2xl text-lg leading-[1.8] text-ink-soft">This practice is not an emergency service. Enquiries are answered within two working days, which is not fast enough for an emergency. What follows is where to go instead.</p>
  <a href="tel:112" class="mt-8 inline-flex items-center gap-3 rounded-full bg-red-700 px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-red-800">
    <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4" aria-hidden="true"><path d="M6.2 3.6h3.2l1.6 4-2 1.4a11.5 11.5 0 0 0 6 6l1.4-2 4 1.6v3.2a1.6 1.6 0 0 1-1.7 1.6C10.9 19.9 4.1 13.1 3.4 5.3a1.6 1.6 0 0 1 1.6-1.7Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    Call 112 — Nigeria emergency
  </a>
  <p class="mt-4 text-sm text-muted">Outside Nigeria, use your local emergency number — 999 in the UK, 911 in the US and Canada.</p>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <h2 class="font-display text-[2rem] leading-tight text-ink">Where to get help now</h2>
  <div class="mt-8 space-y-5">
    <div class="rounded-4xl border border-red-200 bg-red-50/50 p-8">
      <h3 class="font-display text-2xl text-ink">Emergency services (Nigeria)</h3>
      <p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">112 — the national toll-free emergency number, reachable from any phone.</p>
      <a href="tel:112" class="mt-5 inline-flex rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition hover:bg-ink hover:text-white">Call 112 →</a>
    </div>
    <div class="rounded-4xl border border-line bg-white p-8">
      <h3 class="font-display text-2xl text-ink">Find a helpline — worldwide</h3>
      <p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">A free directory of verified crisis lines in almost every country, including the UK, US, Canada and the Gulf. Useful if you are outside Nigeria.</p>
      <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition hover:bg-ink hover:text-white">findahelpline.com →</a>
    </div>
  </div>
  <p class="mt-8 rounded-3xl border border-line bg-cream-deep p-6 text-sm leading-6 text-muted">If you are in Port Harcourt or elsewhere in Nigeria and need a local service — domestic violence, sexual assault, or mental health — your nearest teaching hospital&rsquo;s emergency department can direct you, and 112 can connect you to police and medical response.</p>
</div></section>

<section class="border-y border-line bg-cream-deep"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <div class="grid gap-6 lg:grid-cols-2">
    <div class="rounded-4xl border border-line bg-white p-8"><h2 class="font-display text-[1.75rem] leading-snug text-ink">If someone is hurting you</h2>
      <ul class="mt-5 space-y-4">${ifUnsafe.map((i) => `<li class="flex gap-3.5 text-[0.9375rem] leading-7 text-ink-soft"><span aria-hidden="true" class="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage"></span>${esc(i)}</li>`).join("")}</ul></div>
    <div class="rounded-4xl border border-line bg-white p-8"><h2 class="font-display text-[1.75rem] leading-snug text-ink">If you are thinking about suicide</h2>
      <ul class="mt-5 space-y-4">${ifSuicidal.map((i) => `<li class="flex gap-3.5 text-[0.9375rem] leading-7 text-ink-soft"><span aria-hidden="true" class="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage"></span>${esc(i)}</li>`).join("")}</ul></div>
  </div>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <div class="rounded-4xl bg-sage-dark p-9 text-sage-soft sm:p-12">
    <h2 class="font-display text-3xl text-white">Covering your tracks</h2>
    <div class="mt-5 space-y-4 text-[0.9375rem] leading-7 text-sage-soft/85">
      <p>If you are reading this on a device someone else can access, the <strong class="text-white">Quick exit</strong> button on this page leaves immediately and removes this site from your back button. Pressing <strong class="text-white">Escape three times</strong> does the same thing.</p>
      <p>It does not clear your browsing history. To do that, use your browser&rsquo;s history settings — or use a private/incognito window, or a device the other person cannot reach, such as a friend&rsquo;s phone or a library computer.</p>
    </div>
  </div>
  <div class="mt-10 rounded-4xl border border-line bg-white p-9">
    <h2 class="font-display text-2xl text-ink">When you are safe</h2>
    <p class="mt-4 text-[0.9375rem] leading-7 text-ink-soft">When the immediate danger has passed, there is work worth doing and you are welcome to bring it here. Nothing you say obliges you to book anything.</p>
    <div class="mt-6 flex flex-wrap gap-4 text-sm">
      <a href="/contact" class="rounded-full bg-sage-deep px-6 py-3 font-medium text-white transition hover:bg-sage-dark">Contact Dr. Ogbum</a>
      <a href="mailto:${contactDetails.email}" class="rounded-full border border-line px-6 py-3 text-ink-soft transition hover:bg-sage-mist">${contactDetails.email}</a>
    </div>
  </div>
</div></section>`,
  });

  /* ---------------------------- Privacy ---------------------------- */
  const privacySections = [
    ["The assessments store nothing", [
      "The Self-Audit and the Relational Risk Assessment run entirely inside your browser. Your answers are not sent anywhere, not saved to any account, and not visible to me. Closing or refreshing the page clears them permanently.",
      "There is no login, no submission step, and no result emailed to you. If you want a copy, use the print/save button on the results screen — that file is yours and exists only on your device.",
    ]],
    ["What the contact form collects", [
      "The name, email address, topic, preferred reply method and message you enter. It is used for one purpose: replying to you.",
      "Enquiries are not added to a marketing list, not shared with anyone, and not sold. If you decide not to proceed, say so and your enquiry is deleted.",
    ]],
    ["The Activator Letter", ["Only your email address is held, and only to send the letter. It is never shared or sold. Every letter carries a one-click unsubscribe that takes effect immediately."]],
    ["Clinical confidentiality", [
      "What is said in a session stays in the session. Notes are kept securely, held only as long as professional standards require, and are not shared with your family, employer, or anyone else without your written consent.",
      "In couples work I hold information from individual sessions carefully. I will not keep a secret that makes the couples work dishonest, and I will tell you that before those sessions rather than afterwards.",
    ]],
    ["The limits of confidentiality", [
      "There are narrow circumstances in which I may need to act without your consent: where there is a serious and immediate risk to your life or someone else's, where a child or vulnerable adult is at risk of harm, or where I am required to disclose by law or a court.",
      "These are rare. Wherever it is safe and possible to do so, I will discuss it with you first rather than acting behind you.",
    ]],
    ["This website", [
      "The site does not run advertising trackers or third-party analytics profiling, and it does not set marketing cookies.",
      "Standard server logs may record technical information such as IP address and browser type as part of ordinary hosting operation.",
    ]],
    ["Your rights", ["You may ask what information is held about you, ask for corrections, or ask for it to be deleted where there is no professional or legal obligation to retain it. Email the practice and it will be handled."]],
  ];

  pages.push({
    path: "/privacy",
    title: "Privacy & Confidentiality",
    description: "How enquiries, assessment answers and clinical notes are handled — what is stored, what is not, and the limits of confidentiality.",
    body: `
<section class="border-b border-line bg-cream-deep"><div class="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
  <p class="eyebrow">Privacy &amp; confidentiality</p>
  <h1 class="mt-5 font-display text-[2.5rem] leading-[1.06] text-ink sm:text-[3.25rem]">What is kept, and what isn&rsquo;t.</h1>
  <p class="mt-6 text-lg leading-[1.8] text-ink-soft">People considering therapy are entitled to know exactly what happens to their information before they hand any of it over. This is that, in plain language.</p>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-3xl space-y-12 px-6 py-16 lg:px-8">
  ${privacySections.map(([title, body]) => `<div><h2 class="font-display text-[1.875rem] leading-tight text-ink">${esc(title)}</h2><div class="mt-4 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${body.map((p) => `<p>${esc(p)}</p>`).join("")}</div></div>`).join("")}
  <div class="rounded-4xl border border-line bg-white p-8">
    <h2 class="font-display text-2xl text-ink">Questions about any of this</h2>
    <p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">Ask before you book rather than afterwards — it is a completely reasonable thing to want settled first.</p>
    <div class="mt-5 flex flex-wrap gap-4 text-sm">
      <a href="mailto:${contactDetails.email}" class="rounded-full bg-sage-deep px-6 py-3 font-medium text-white transition hover:bg-sage-dark">${contactDetails.email}</a>
      <a href="/contact" class="rounded-full border border-line px-6 py-3 text-ink-soft transition hover:bg-sage-mist">Contact form</a>
    </div>
    <p class="mt-6 text-xs text-muted">Data controller: ${esc(practitioner.fullName)}, ${esc(contactDetails.location)}.</p>
  </div>
</div></section>`,
  });

  return pages;
}
