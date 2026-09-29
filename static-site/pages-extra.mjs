/** About, Work With Me, Contact, Academy, Books, Speaking, Letter, Crisis, Privacy. */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  esc, rich, blob, leafBranch, psiMark, portrait, button, sectionHeading, serviceIcon,
  whatsappIcon, checkIcon, quietExit, currencyToggle, price, trustBar,
  letterSignup, contactDetails, whatsappLink, practitioner,
} from "./template.mjs";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "lib") + path.sep;
const { serviceCards, beliefs, processSteps } = await import(SRC + "siteData.ts");
const { sortedArticles, formatArticleDate } = await import(SRC + "insights.ts");
const {
  aboutPage, workWithMePage, contactPage, academyPage, booksPage,
  speakingPage, letterPage, crisisPage, privacyPage,
} = await import(SRC + "pageContent.ts");

/** A bulleted list item, matching the React markup. */
const bullet = (text, cls = "text-[0.9375rem] leading-7 text-ink-soft") =>
  `<li class="${["flex gap-3.5", cls].filter(Boolean).join(" ")}"><span aria-hidden="true" class="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage"></span>${esc(text)}</li>`;

export function extraPages() {
  const pages = [];

  /* ---------------------------- About ---------------------------- */
  pages.push({
    path: "/about",
    title: aboutPage.seo.title,
    description: aboutPage.seo.description,
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-40 -top-44 h-[40rem] w-[40rem] text-sage-soft/45")}
  <div class="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
    <div>
      <p class="eyebrow">${esc(aboutPage.hero.eyebrow)}</p>
      <h1 class="mt-5 font-display text-[2.75rem] leading-[1.04] text-ink sm:text-[3.75rem]">${esc(aboutPage.hero.title)}</h1>
      <div class="mt-7 space-y-5 text-lg leading-[1.8] text-ink-soft">
        ${aboutPage.hero.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
      </div>
    </div>
    <div class="relative">
      ${leafBranch("pointer-events-none absolute -left-10 top-10 z-10 hidden h-64 w-32 text-sage/40 lg:block")}
      ${portrait({ src: aboutPage.hero.portrait.image, alt: aboutPage.hero.portrait.alt, label: aboutPage.hero.portrait.label, extra: "shadow-xl shadow-sage-deep/10" })}
    </div>
  </div>
</section>

${trustBar()}

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(aboutPage.beliefs.eyebrow), title: esc(aboutPage.beliefs.title), intro: esc(aboutPage.beliefs.intro) })}
  <div class="mt-14 grid gap-6 sm:grid-cols-2">
    ${beliefs.map((b) => `<div class="rounded-4xl border border-line bg-white p-8"><h3 class="font-display text-[1.6rem] leading-snug text-ink">${esc(b.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">${esc(b.body)}</p></div>`).join("")}
  </div>
</div></section>

<section class="relative overflow-hidden border-y border-line bg-sage-mist">
  ${psiMark("pointer-events-none absolute -right-10 top-1/4 h-72 w-72 text-sage/15")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8">
    ${sectionHeading({ eyebrow: esc(aboutPage.notForYou.eyebrow), title: esc(aboutPage.notForYou.title) })}
    <p class="mt-6 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(aboutPage.notForYou.intro)}</p>
    <ul class="mt-9 space-y-4">
      ${aboutPage.notForYou.items.map((i) => `<li class="flex gap-4 rounded-3xl border border-sage/25 bg-white/80 p-6 text-[1.0625rem] leading-7 text-ink-soft"><span aria-hidden="true" class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage"></span>${esc(i)}</li>`).join("")}
    </ul>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(aboutPage.credentials.eyebrow), title: esc(aboutPage.credentials.title) })}
  <dl class="mt-12 grid gap-6 sm:grid-cols-2">
    ${aboutPage.credentials.items.map((item) => `<div class="rounded-4xl border border-line bg-white p-7"><dt class="font-display text-2xl leading-snug text-ink">${esc(item.label)}</dt><dd class="mt-2.5 text-[0.9375rem] leading-7 text-muted">${esc(item.detail)}</dd></div>`).join("")}
  </dl>
</div></section>

<section class="relative overflow-hidden bg-sage-dark">
  ${leafBranch("pointer-events-none absolute -left-14 bottom-0 h-96 w-48 text-white/[0.07]")}
  <div class="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
    <h2 class="font-display text-[2.5rem] leading-tight text-white sm:text-[3rem]">${esc(aboutPage.closing.title)}</h2>
    <p class="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-sage-soft/85">${esc(aboutPage.closing.intro)}</p>
    <div class="mt-9 flex flex-wrap justify-center gap-3">
      ${button(esc(aboutPage.closing.primaryCta.label), aboutPage.closing.primaryCta.href, { variant: "light", size: "lg" })}
      ${button(esc(aboutPage.closing.secondaryCta.label), aboutPage.closing.secondaryCta.href, { variant: "onDark", size: "lg" })}
    </div>
  </div>
</section>`,
  });

  /* ------------------------- Work with me ------------------------- */
  const { fees } = workWithMePage;

  pages.push({
    path: "/work-with-me",
    title: workWithMePage.seo.title,
    description: workWithMePage.seo.description,
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-44 -top-44 h-[40rem] w-[40rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">${esc(workWithMePage.hero.eyebrow)}</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">${esc(workWithMePage.hero.title)}</h1>
    <p class="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">${esc(workWithMePage.hero.intro)}</p>
    <div class="mt-9">${button(esc(workWithMePage.hero.cta.label), workWithMePage.hero.cta.href, { size: "lg" })}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(workWithMePage.services.eyebrow), title: esc(workWithMePage.services.title) })}
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
    ${sectionHeading({ eyebrow: esc(fees.eyebrow), title: esc(fees.title) })}
    <div class="flex items-center gap-3"><span class="text-xs uppercase tracking-[0.16em] text-muted">${esc(fees.toggleLabel)}</span>${currencyToggle()}</div>
  </div>
  <div class="mt-10 overflow-x-auto rounded-4xl border border-line bg-white">
    <table class="w-full min-w-[46rem] border-collapse text-left">
      <caption class="sr-only">${esc(fees.tableCaption)}</caption>
      <thead><tr class="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
        <th scope="col" class="px-7 py-5 font-medium">${esc(fees.columns.service)}</th><th scope="col" class="px-7 py-5 font-medium">${esc(fees.columns.who)}</th>
        <th scope="col" class="px-7 py-5 font-medium">${esc(fees.columns.format)}</th><th scope="col" class="px-7 py-5 text-right font-medium">${esc(fees.columns.fee)}</th>
      </tr></thead>
      <tbody>
        ${fees.rows.map((row) => `<tr class="border-b border-line-soft last:border-0">
          <th scope="row" class="px-7 py-6 align-top font-normal"><a href="${esc(row.href)}" class="font-display text-xl text-ink underline-offset-4 transition hover:text-sage-deep hover:underline">${esc(row.service)}</a></th>
          <td class="px-7 py-6 align-top text-sm leading-6 text-muted">${esc(row.who)}</td>
          <td class="px-7 py-6 align-top text-sm leading-6 text-muted">${esc(row.length)}</td>
          <td class="px-7 py-6 align-top text-right"><span class="font-display text-2xl text-sage-dark">${price(row.price)}</span><span class="mt-0.5 block text-xs text-muted">${esc(row.priceLabel)}</span></td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>
  <p class="mt-6 max-w-3xl text-sm leading-6 text-muted">${esc(fees.note)}</p>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(workWithMePage.process.eyebrow), title: esc(workWithMePage.process.title), intro: esc(workWithMePage.process.intro) })}
  <ol class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
    ${processSteps.map((s) => `<li><span class="font-display text-5xl text-sage/45">${s.step}</span><h3 class="mt-3 font-display text-2xl text-ink">${esc(s.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(s.body)}</p></li>`).join("")}
  </ol>
</div></section>

<section class="relative overflow-hidden bg-sage-mist">
  ${leafBranch("pointer-events-none absolute -right-10 -top-6 h-72 w-40 rotate-12 text-sage/25")}
  <div class="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
    <h2 class="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">${esc(workWithMePage.closing.title)}</h2>
    <p class="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(workWithMePage.closing.intro)}</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">${button(esc(workWithMePage.closing.primaryCta.label), workWithMePage.closing.primaryCta.href, { size: "lg" })}${button(esc(workWithMePage.closing.secondaryCta.label), workWithMePage.closing.secondaryCta.href, { variant: "outline", size: "lg" })}</div>
  </div>
</section>`,
  });

  /* --------------------------- Contact --------------------------- */
  const field = "w-full rounded-2xl border border-line bg-cream px-5 py-3.5 text-[0.9375rem] text-ink placeholder:text-muted/70 transition focus:border-sage focus:bg-white focus:outline-none";
  const form = contactPage.form;

  pages.push({
    path: "/contact",
    title: contactPage.seo.title,
    description: contactPage.seo.description,
    body: `
${quietExit()}
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">${esc(contactPage.hero.eyebrow)}</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">${esc(contactPage.hero.title)}</h1>
    <p class="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">${esc(contactPage.hero.intro)}</p>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14 lg:px-8 lg:py-20">
  <div class="rounded-4xl border border-line bg-white p-8 sm:p-10">
    <h2 class="font-display text-3xl text-ink">${esc(form.title)}</h2>
    <p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(form.intro)}</p>
    <form class="js-enquiry mt-8 space-y-6" novalidate>
      <div class="hidden" aria-hidden="true"><label for="company">Company</label><input id="company" name="company" tabindex="-1" autocomplete="off"/></div>
      <div class="grid gap-6 sm:grid-cols-2">
        <div><label for="name" class="mb-2 block text-sm font-medium text-ink">${esc(form.nameLabel)}</label><input id="name" name="name" type="text" autocomplete="name" placeholder="${esc(form.namePlaceholder)}" class="${field}"/><p data-error-for="name" class="mt-1.5 text-sm text-red-700"></p></div>
        <div><label for="email" class="mb-2 block text-sm font-medium text-ink">${esc(form.emailLabel)}</label><input id="email" name="email" type="email" autocomplete="email" placeholder="${esc(form.emailPlaceholder)}" class="${field}"/><p data-error-for="email" class="mt-1.5 text-sm text-red-700"></p></div>
      </div>
      <div class="grid gap-6 sm:grid-cols-2">
        <div><label for="topic" class="mb-2 block text-sm font-medium text-ink">${esc(form.topicLabel)}</label>
          <select id="topic" name="topic" class="${field}"><option value="">${esc(form.topicPlaceholder)}</option>${form.topics.map((t) => `<option>${esc(t)}</option>`).join("")}</select></div>
        <div><label for="preferredContact" class="mb-2 block text-sm font-medium text-ink">${esc(form.replyLabel)}</label>
          <select id="preferredContact" name="preferredContact" class="${field}">${form.replyOptions.map((o) => `<option>${esc(o)}</option>`).join("")}</select></div>
      </div>
      <div><label for="message" class="mb-2 block text-sm font-medium text-ink">${esc(form.messageLabel)}</label>
        <textarea id="message" name="message" rows="6" placeholder="${esc(form.messagePlaceholder)}" class="${field} resize-y"></textarea>
        <p data-error-for="message" class="mt-1.5 text-sm text-red-700"></p></div>
      <div>
        <label for="consent" class="flex cursor-pointer items-start gap-3">
          <input id="consent" name="consent" type="checkbox" class="mt-1 h-4 w-4 shrink-0 rounded border-line accent-sage-deep"/>
          <span class="text-sm leading-6 text-ink-soft">${esc(form.consentLabel)}</span>
        </label>
        <p data-error-for="consent" class="mt-1.5 text-sm text-red-700"></p>
      </div>
      <button type="submit" class="w-full rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark sm:w-auto">${esc(form.submitLabel)}</button>
      <p class="js-status text-sm leading-6" role="status"></p>
      <p class="text-xs leading-5 text-muted">${esc(form.footnote)}</p>
    </form>
  </div>
  <aside class="space-y-6">
    <div class="rounded-4xl bg-sage-dark p-8 text-sage-soft">
      <h2 class="font-display text-2xl text-white">${esc(contactPage.whatsapp.title)}</h2>
      <p class="mt-3 text-sm leading-7 text-sage-soft/85">${esc(contactPage.whatsapp.intro)}</p>
      <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-sage-dark transition hover:bg-sage-mist">${whatsappIcon()}${esc(contactDetails.whatsappDisplay)}</a>
    </div>
    <div class="rounded-4xl border border-line bg-white p-8">
      <h2 class="font-display text-2xl text-ink">${esc(contactPage.directEmail.title)}</h2>
      <dl class="mt-5 space-y-4">
        ${[[contactPage.directEmail.generalLabel, contactDetails.email], [contactPage.directEmail.speakingLabel, contactDetails.speakingEmail], [contactPage.directEmail.academyLabel, contactDetails.academyEmail]]
          .map(([label, value]) => `<div><dt class="text-xs uppercase tracking-[0.14em] text-muted">${esc(label)}</dt><dd class="mt-1"><a href="mailto:${value}" class="text-[0.9375rem] text-sage-deep underline-offset-4 hover:underline">${value}</a></dd></div>`).join("")}
      </dl>
    </div>
    <div class="rounded-4xl border border-line bg-white p-8">
      <h2 class="font-display text-2xl text-ink">${esc(contactPage.practicalities.title)}</h2>
      <dl class="mt-5 space-y-4">
        ${[[contactPage.practicalities.inPersonLabel, contactDetails.location], [contactPage.practicalities.onlineLabel, contactDetails.reach + contactPage.practicalities.onlineSuffix], [contactPage.practicalities.responseLabel, contactDetails.responseTime], [contactPage.practicalities.confidentialityLabel, contactPage.practicalities.confidentiality]]
          .map(([label, value]) => `<div><dt class="text-xs uppercase tracking-[0.14em] text-muted">${esc(label)}</dt><dd class="mt-1 text-[0.9375rem] leading-6 text-ink-soft">${esc(value)}</dd></div>`).join("")}
      </dl>
    </div>
  </aside>
</div></section>

<section class="border-t border-line bg-cream-deep"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <div class="rounded-4xl border border-amber-300/50 bg-amber-50/60 p-8 sm:p-10">
    <h2 class="font-display text-3xl text-ink">${esc(contactPage.urgent.title)}</h2>
    <p class="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(contactPage.urgent.intro)}</p>
    <a href="${esc(contactPage.urgent.cta.href)}" class="mt-7 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition hover:bg-ink-soft">${esc(contactPage.urgent.cta.label)}</a>
  </div>
</div></section>`,
  });

  /* --------------------------- Academy --------------------------- */
  pages.push({
    path: "/academy",
    title: academyPage.seo.title,
    description: academyPage.seo.description,
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">${esc(academyPage.hero.eyebrow)}</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">${esc(academyPage.hero.title)}</h1>
    <p class="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">${esc(academyPage.hero.intro)}</p>
    <div class="mt-9 flex flex-wrap gap-3">${button(esc(academyPage.hero.cta.label), academyPage.hero.cta.href, { size: "lg" })}${button(esc(contactDetails.academyEmail), "mailto:" + contactDetails.academyEmail, { variant: "outline", size: "lg" })}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  <div class="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
    ${sectionHeading({ eyebrow: esc(academyPage.audience.eyebrow), title: esc(academyPage.audience.title), intro: esc(academyPage.audience.intro) })}
    <ul class="space-y-4 self-center">
      ${academyPage.audience.items.map((i) => `<li class="flex gap-3.5 rounded-3xl border border-line bg-white p-5 text-[0.9375rem] leading-7 text-ink-soft">${checkIcon("mt-1 h-4 w-4 shrink-0 text-sage-deep")}${esc(i)}</li>`).join("")}
    </ul>
  </div>
</div></section>

<section class="border-y border-line bg-cream-deep"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(academyPage.curriculum.eyebrow), title: esc(academyPage.curriculum.title), intro: esc(academyPage.curriculum.intro) })}
  <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    ${academyPage.curriculum.modules.map((m) => `<div class="rounded-4xl border border-line bg-white p-8"><span class="font-display text-4xl text-sage/50">${esc(m.number)}</span><h3 class="mt-3 font-display text-2xl leading-snug text-ink">${esc(m.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(m.body)}</p></div>`).join("")}
  </div>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <div class="rounded-4xl border border-line bg-white p-9 sm:p-12">
    <h2 class="font-display text-3xl text-ink">${esc(academyPage.joining.title)}</h2>
    <p class="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(academyPage.joining.intro)}</p>
    <ol class="mt-8 space-y-5">
      ${academyPage.joining.steps.map((s, i) => `<li class="flex gap-4"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-mist text-sm text-sage-deep">${i + 1}</span><span class="pt-1 text-[0.9375rem] leading-7 text-ink-soft">${esc(s)}</span></li>`).join("")}
    </ol>
    <p class="mt-8 text-sm leading-6 text-muted">${esc(academyPage.joining.note)}</p>
  </div>
</div></section>

<section class="relative overflow-hidden bg-sage-mist">
  ${psiMark("pointer-events-none absolute -right-8 top-1/4 h-64 w-64 text-sage/15")}
  <div class="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
    <h2 class="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">${esc(academyPage.closing.title)}</h2>
    <p class="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(academyPage.closing.intro)}</p>
    <div class="mt-8 flex justify-center">${button(esc(academyPage.closing.cta.label), academyPage.closing.cta.href, { size: "lg" })}</div>
  </div>
</section>`,
  });

  /* ---------------------------- Books ---------------------------- */
  pages.push({
    path: "/books",
    title: booksPage.seo.title,
    description: booksPage.seo.description,
    extraHead: `<meta property="og:image" content="${esc(booksPage.hero.cover.image)}"/>`,
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-44 -top-40 h-[36rem] w-[36rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-12 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
    <div class="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
      <div>
        <p class="eyebrow">${esc(booksPage.hero.eyebrow)}</p>
        <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.5rem]">${esc(booksPage.hero.title)}</h1>
        <p class="mt-4 text-lg text-sage-deep">${esc(booksPage.hero.subtitle)}</p>
        <p class="mt-3 text-sm uppercase tracking-[0.16em] text-muted">${esc(booksPage.hero.byline)}</p>
        <div class="mt-7 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
          ${booksPage.hero.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
        </div>
        <div class="mt-9 flex flex-wrap gap-3">${button(esc(booksPage.hero.primaryCta.label), booksPage.hero.primaryCta.href, { size: "lg" })}${button(esc(booksPage.hero.secondaryCtaLabel), "mailto:" + contactDetails.email, { variant: "outline", size: "lg" })}</div>
        <p class="mt-5 text-sm text-muted">${esc(booksPage.hero.note)}</p>
      </div>
      <div class="mx-auto w-full max-w-xs lg:max-w-sm">
        <img src="${esc(booksPage.hero.cover.image)}" alt="${esc(booksPage.hero.cover.alt)}" width="512" height="768" class="w-full rounded-2xl shadow-2xl shadow-sage-deep/25"/>
      </div>
    </div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(booksPage.uses.eyebrow), title: esc(booksPage.uses.title), intro: esc(booksPage.uses.intro) })}
  <div class="mt-14 grid gap-6 sm:grid-cols-2">
    ${booksPage.uses.items.map((u) => `<div class="rounded-4xl border border-line bg-white p-8"><h3 class="font-display text-2xl text-ink">${esc(u.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(u.body)}</p></div>`).join("")}
  </div>
</div></section>

<section class="border-y border-line bg-cream-deep"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <div class="rounded-4xl border border-line bg-white p-9 sm:p-12">
    <p class="eyebrow">${esc(booksPage.letter.eyebrow)}</p>
    <h2 class="mt-3 font-display text-3xl text-ink">${esc(booksPage.letter.title)}</h2>
    <p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(booksPage.letter.intro)}</p>
    <div class="mt-6">${letterSignup()}</div>
  </div>
</div></section>`,
  });

  /* --------------------------- Speaking --------------------------- */
  pages.push({
    path: "/speaking",
    title: speakingPage.seo.title,
    description: speakingPage.seo.description,
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">${esc(speakingPage.hero.eyebrow)}</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">${esc(speakingPage.hero.title)}</h1>
    <p class="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">${esc(speakingPage.hero.intro)}</p>
    <div class="mt-9 flex flex-wrap gap-3">${button(esc(speakingPage.hero.primaryCtaLabel), "mailto:" + contactDetails.speakingEmail, { size: "lg" })}${button(esc(speakingPage.hero.secondaryCta.label), speakingPage.hero.secondaryCta.href, { variant: "outline", size: "lg" })}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(speakingPage.talks.eyebrow), title: esc(speakingPage.talks.title), intro: esc(speakingPage.talks.intro) })}
  <div class="mt-14 grid gap-6 sm:grid-cols-2">
    ${speakingPage.talks.items.map((t) => `<div class="rounded-4xl border border-line bg-white p-8"><p class="text-xs uppercase tracking-[0.16em] text-sage-deep">${esc(t.audience)}</p><h3 class="mt-4 font-display text-[1.75rem] leading-snug text-ink">${esc(t.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(t.body)}</p></div>`).join("")}
  </div>
</div></section>

<section class="border-y border-line bg-cream-deep"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  <div class="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
    ${sectionHeading({ eyebrow: esc(speakingPage.formats.eyebrow), title: esc(speakingPage.formats.title), intro: esc(speakingPage.formats.intro) })}
    <ul class="grid gap-3 self-center sm:grid-cols-2">
      ${speakingPage.formats.items.map((f) => `<li class="rounded-2xl border border-line bg-white px-5 py-4 text-sm leading-6 text-ink-soft">${esc(f)}</li>`).join("")}
    </ul>
  </div>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <div class="rounded-4xl border border-line bg-white p-9 sm:p-12">
    <h2 class="font-display text-3xl text-ink">${esc(speakingPage.enquiry.title)}</h2>
    <ul class="mt-6 space-y-3 text-[1.0625rem] leading-[1.8] text-ink-soft">
      ${speakingPage.enquiry.items.map((i) => bullet(i, "")).join("")}
    </ul>
    <p class="mt-8 text-sm leading-6 text-muted">${esc(speakingPage.enquiry.note)}</p>
  </div>
</div></section>

<section class="relative overflow-hidden bg-sage-mist">
  ${psiMark("pointer-events-none absolute -right-8 top-1/4 h-64 w-64 text-sage/15")}
  <div class="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
    <h2 class="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">${esc(speakingPage.closing.title)}</h2>
    <p class="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(speakingPage.closing.intro)}</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">${button(esc(contactDetails.speakingEmail), "mailto:" + contactDetails.speakingEmail, { size: "lg" })}${button(esc(speakingPage.closing.secondaryCta.label), speakingPage.closing.secondaryCta.href, { variant: "outline", size: "lg" })}</div>
  </div>
</section>`,
  });

  /* ---------------------------- Letter ---------------------------- */
  pages.push({
    path: "/letter",
    title: letterPage.seo.title,
    description: letterPage.seo.description,
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-40 -top-44 h-[38rem] w-[38rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-12 bottom-0 h-80 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">${esc(letterPage.hero.eyebrow)}</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">${esc(letterPage.hero.title)}</h1>
    <p class="mt-7 text-lg leading-[1.8] text-ink-soft">${esc(letterPage.hero.intro)}</p>
    <div class="mt-10 rounded-4xl border border-line bg-white p-8 sm:p-10">${letterSignup()}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <h2 class="font-display text-[2.25rem] leading-tight text-ink">${esc(letterPage.promises.title)}</h2>
  <div class="mt-10 grid gap-6 sm:grid-cols-2">
    ${letterPage.promises.items.map((p) => `<div class="rounded-3xl border border-line bg-white p-7"><h3 class="font-display text-2xl text-ink">${esc(p.title)}</h3><p class="mt-2.5 text-[0.9375rem] leading-7 text-muted">${esc(p.body)}</p></div>`).join("")}
  </div>
</div></section>

<section class="border-t border-line bg-cream-deep"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <h2 class="font-display text-[2.25rem] leading-tight text-ink">${esc(letterPage.samples.title)}</h2>
  <p class="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(letterPage.samples.intro)}</p>
  <div class="mt-10 space-y-4">
    ${sortedArticles.slice(0, 4).map((a) => `<a href="/insights/${a.slug}" class="group flex flex-col gap-2 rounded-3xl border border-line bg-white p-7 transition hover:border-sage/50 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div><p class="text-xs uppercase tracking-[0.14em] text-sage-deep">${esc(a.category)}</p><h3 class="mt-2 font-display text-2xl leading-snug text-ink">${esc(a.title)}</h3></div>
      <p class="shrink-0 text-sm text-muted">${formatArticleDate(a.date)}</p></a>`).join("")}
  </div>
</div></section>`,
  });

  /* ---------------------------- Crisis ---------------------------- */
  pages.push({
    path: "/crisis",
    title: crisisPage.seo.title,
    description: crisisPage.seo.description,
    body: `
${quietExit()}
<section class="border-b border-line bg-amber-50"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
  <p class="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-amber-800">${esc(crisisPage.hero.eyebrow)}</p>
  <h1 class="mt-5 font-display text-[2.5rem] leading-[1.06] text-ink sm:text-[3.5rem]">${esc(crisisPage.hero.title)}</h1>
  <p class="mt-6 max-w-2xl text-lg leading-[1.8] text-ink-soft">${esc(crisisPage.hero.intro)}</p>
  <a href="${esc(crisisPage.hero.emergencyHref)}" class="mt-8 inline-flex items-center gap-3 rounded-full bg-red-700 px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-red-800">
    <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4" aria-hidden="true"><path d="M6.2 3.6h3.2l1.6 4-2 1.4a11.5 11.5 0 0 0 6 6l1.4-2 4 1.6v3.2a1.6 1.6 0 0 1-1.7 1.6C10.9 19.9 4.1 13.1 3.4 5.3a1.6 1.6 0 0 1 1.6-1.7Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    ${esc(crisisPage.hero.emergencyLabel)}
  </a>
  <p class="mt-4 text-sm text-muted">${esc(crisisPage.hero.note)}</p>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <h2 class="font-display text-[2rem] leading-tight text-ink">${esc(crisisPage.resources.title)}</h2>
  <div class="mt-8 space-y-5">
    ${crisisPage.resources.items.map((r) => {
      const external = r.href.startsWith("http");
      return `<div class="rounded-4xl border p-8 ${r.urgent ? "border-red-200 bg-red-50/50" : "border-line bg-white"}">
      <h3 class="font-display text-2xl text-ink">${esc(r.name)}</h3>
      <p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">${esc(r.detail)}</p>
      <a href="${esc(r.href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""} class="mt-5 inline-flex rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition hover:bg-ink hover:text-white">${esc(r.action)} →</a>
    </div>`;
    }).join("")}
  </div>
  <p class="mt-8 rounded-3xl border border-line bg-cream-deep p-6 text-sm leading-6 text-muted">${esc(crisisPage.resources.note)}</p>
</div></section>

<section class="border-y border-line bg-cream-deep"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <div class="grid gap-6 lg:grid-cols-2">
    ${[crisisPage.ifUnsafe, crisisPage.ifSuicidal].map((panel) => `<div class="rounded-4xl border border-line bg-white p-8"><h2 class="font-display text-[1.75rem] leading-snug text-ink">${esc(panel.title)}</h2>
      <ul class="mt-5 space-y-4">${panel.items.map((i) => bullet(i)).join("")}</ul></div>`).join("")}
  </div>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <div class="rounded-4xl bg-sage-dark p-9 text-sage-soft sm:p-12">
    <h2 class="font-display text-3xl text-white">${esc(crisisPage.coveringTracks.title)}</h2>
    <div class="mt-5 space-y-4 text-[0.9375rem] leading-7 text-sage-soft/85">
      ${crisisPage.coveringTracks.paragraphs.map((p) => `<p>${rich(p, { strongClass: "text-white" })}</p>`).join("")}
    </div>
  </div>
  <div class="mt-10 rounded-4xl border border-line bg-white p-9">
    <h2 class="font-display text-2xl text-ink">${esc(crisisPage.whenSafe.title)}</h2>
    <p class="mt-4 text-[0.9375rem] leading-7 text-ink-soft">${esc(crisisPage.whenSafe.intro)}</p>
    <div class="mt-6 flex flex-wrap gap-4 text-sm">
      <a href="${esc(crisisPage.whenSafe.cta.href)}" class="rounded-full bg-sage-deep px-6 py-3 font-medium text-white transition hover:bg-sage-dark">${esc(crisisPage.whenSafe.cta.label)}</a>
      <a href="mailto:${contactDetails.email}" class="rounded-full border border-line px-6 py-3 text-ink-soft transition hover:bg-sage-mist">${contactDetails.email}</a>
    </div>
  </div>
</div></section>`,
  });

  /* ---------------------------- Privacy ---------------------------- */
  pages.push({
    path: "/privacy",
    title: privacyPage.seo.title,
    description: privacyPage.seo.description,
    body: `
<section class="border-b border-line bg-cream-deep"><div class="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
  <p class="eyebrow">${esc(privacyPage.hero.eyebrow)}</p>
  <h1 class="mt-5 font-display text-[2.5rem] leading-[1.06] text-ink sm:text-[3.25rem]">${esc(privacyPage.hero.title)}</h1>
  <p class="mt-6 text-lg leading-[1.8] text-ink-soft">${esc(privacyPage.hero.intro)}</p>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-3xl space-y-12 px-6 py-16 lg:px-8">
  ${privacyPage.sections.map((section) => `<div><h2 class="font-display text-[1.875rem] leading-tight text-ink">${esc(section.title)}</h2><div class="mt-4 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${section.body.map((p) => `<p>${esc(p)}</p>`).join("")}</div></div>`).join("")}
  <div class="rounded-4xl border border-line bg-white p-8">
    <h2 class="font-display text-2xl text-ink">${esc(privacyPage.questions.title)}</h2>
    <p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">${esc(privacyPage.questions.intro)}</p>
    <div class="mt-5 flex flex-wrap gap-4 text-sm">
      <a href="mailto:${contactDetails.email}" class="rounded-full bg-sage-deep px-6 py-3 font-medium text-white transition hover:bg-sage-dark">${contactDetails.email}</a>
      <a href="/contact" class="rounded-full border border-line px-6 py-3 text-ink-soft transition hover:bg-sage-mist">${esc(privacyPage.questions.contactFormLabel)}</a>
    </div>
    <p class="mt-6 text-xs text-muted">${esc(privacyPage.questions.controllerPrefix)} ${esc(practitioner.fullName)}, ${esc(contactDetails.location)}.</p>
  </div>
</div></section>`,
  });

  return pages;
}
