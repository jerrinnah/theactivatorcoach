/** About, Work With Me, Contact, Books, Privacy. */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  esc, rich, blob, leafBranch, psiMark, portrait, button, sectionHeading, serviceCardHtml,
  quietExit, currencyToggle, price, trustBar, contactDetails, practitioner,
} from "./template.mjs";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "lib") + path.sep;
const { serviceCards, beliefs, processSteps } = await import(SRC + "siteData.ts");
const { aboutPage, workWithMePage, contactPage, booksPage, privacyPage } = await import(SRC + "pageContent.ts");

const paragraphs = (list) => list.map((p) => `<p>${esc(p)}</p>`).join("");

const processList = () => `
  <ol class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
    ${processSteps.map((s) => `<li><span class="font-display text-5xl text-sage/45">${s.step}</span><h3 class="mt-3 font-display text-2xl text-ink">${esc(s.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(s.body)}</p></li>`).join("")}
  </ol>`;

export function extraPages() {
  const pages = [];

  /* ---------------------------- About ---------------------------- */
  const { hero, approach, helpWith, credentials, book, closing } = aboutPage;

  pages.push({
    path: "/about",
    title: aboutPage.seo.title,
    description: aboutPage.seo.description,
    body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-40 -top-44 h-[40rem] w-[40rem] text-sage-soft/45")}
  <div class="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
    <div>
      <p class="eyebrow">${esc(hero.eyebrow)}</p>
      <h1 class="mt-5 font-display text-[2.75rem] leading-[1.04] text-ink sm:text-[3.75rem]">${esc(hero.title)}</h1>
      <div class="mt-7 space-y-5 text-lg leading-[1.8] text-ink-soft">${paragraphs(hero.paragraphs)}</div>
    </div>
    <div class="relative">
      ${leafBranch("pointer-events-none absolute -left-10 top-10 z-10 hidden h-64 w-32 text-sage/40 lg:block")}
      ${portrait({ src: hero.portrait.image, alt: hero.portrait.alt, label: hero.portrait.label, extra: "shadow-xl shadow-sage-deep/10" })}
    </div>
  </div>
</section>

${trustBar()}

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(approach.eyebrow), title: esc(approach.title) })}
  <div class="mt-8 space-y-5 text-[1.0625rem] leading-[1.8] text-ink-soft">${paragraphs(approach.paragraphs)}</div>
</div></section>

<section class="relative overflow-hidden border-y border-line bg-sage-mist">
  ${psiMark("pointer-events-none absolute -right-10 top-1/4 h-72 w-72 text-sage/15")}
  <div class="relative mx-auto max-w-6xl px-6 py-20 lg:px-8">
    ${sectionHeading({ eyebrow: esc(helpWith.eyebrow), title: esc(helpWith.title) })}
    <div class="mt-12 grid gap-6 sm:grid-cols-2">
      ${helpWith.items.map((i) => `<div class="rounded-4xl border border-sage/25 bg-white/80 p-8"><h3 class="font-display text-[1.6rem] leading-snug text-ink">${esc(i.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">${esc(i.body)}</p></div>`).join("")}
    </div>
    <p class="mt-10 max-w-3xl text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(helpWith.note)}</p>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(aboutPage.beliefs.eyebrow), title: esc(aboutPage.beliefs.title), intro: esc(aboutPage.beliefs.intro) })}
  <div class="mt-14 grid gap-6 sm:grid-cols-2">
    ${beliefs.map((b, i) => `<div class="rounded-4xl border border-line bg-white p-8"><span class="font-display text-4xl text-sage/50">${i + 1}</span><h3 class="mt-3 font-display text-[1.6rem] leading-snug text-ink">${esc(b.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">${esc(b.body)}</p></div>`).join("")}
  </div>
</div></section>

<section class="border-y border-line bg-cream-deep"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(credentials.eyebrow), title: esc(credentials.title) })}
  <dl class="mt-12 grid gap-6 sm:grid-cols-2">
    ${credentials.items.map((item) => `<div class="rounded-4xl border border-line bg-white p-7"><dt class="font-display text-2xl leading-snug text-ink">${esc(item.label)}</dt><dd class="mt-2.5 text-[0.9375rem] leading-7 text-muted">${rich(item.detail)}</dd></div>`).join("")}
  </dl>
  <p class="mt-10 max-w-3xl text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(credentials.note)}</p>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <div class="rounded-4xl border border-line bg-white p-9 sm:p-12">
    <p class="eyebrow">${esc(book.eyebrow)}</p>
    <h2 class="mt-4 font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">${esc(book.title)}</h2>
    <p class="mt-3 text-sm uppercase tracking-[0.16em] text-muted">${esc(book.byline)}</p>
    <p class="mt-5 text-lg text-sage-deep">${esc(book.intro)}</p>
    <div class="mt-8">${button(esc(book.cta.label), book.cta.href)}</div>
  </div>
</div></section>

<section class="relative overflow-hidden bg-sage-dark">
  ${leafBranch("pointer-events-none absolute -left-14 bottom-0 h-96 w-48 text-white/[0.07]")}
  <div class="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
    <h2 class="font-display text-[2.5rem] leading-tight text-white sm:text-[3rem]">${esc(closing.title)}</h2>
    <div class="mx-auto mt-6 max-w-xl space-y-4 text-[1.0625rem] leading-[1.8] text-sage-soft/85">${paragraphs(closing.paragraphs)}</div>
    <p class="mx-auto mt-6 max-w-xl font-display text-2xl leading-snug text-white">${esc(closing.tagline)}</p>
    <div class="mt-9 flex flex-wrap justify-center gap-3">
      ${button(esc(closing.primaryCta.label), closing.primaryCta.href, { variant: "light", size: "lg" })}
      ${button(esc(closing.secondaryCta.label), closing.secondaryCta.href, { variant: "onDark", size: "lg" })}
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
    <div class="mt-7 max-w-2xl space-y-4 text-lg leading-[1.8] text-ink-soft">${paragraphs(workWithMePage.hero.paragraphs)}</div>
    <div class="mt-9">${button(esc(workWithMePage.hero.cta.label), workWithMePage.hero.cta.href, { size: "lg" })}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(workWithMePage.services.eyebrow), title: esc(workWithMePage.services.title), intro: esc(workWithMePage.services.intro) })}
  <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${serviceCards.map((card) => serviceCardHtml(card, "h2")).join("")}</div>
</div></section>

<section id="fees" class="scroll-mt-28 border-y border-line bg-cream-deep"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  <div class="flex flex-wrap items-end justify-between gap-6">
    ${sectionHeading({ eyebrow: esc(fees.eyebrow), title: esc(fees.title), intro: esc(fees.intro) })}
    <div class="flex items-center gap-3"><span class="text-xs uppercase tracking-[0.16em] text-muted">${esc(fees.toggleLabel)}</span>${currencyToggle()}</div>
  </div>
  <div class="mt-10 overflow-x-auto rounded-4xl border border-line bg-white">
    <table class="w-full border-collapse text-left">
      <caption class="sr-only">${esc(fees.tableCaption)}</caption>
      <thead><tr class="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
        <th scope="col" class="px-7 py-5 font-medium">${esc(fees.columns.service)}</th>
        <th scope="col" class="px-7 py-5 font-medium">${esc(fees.columns.format)}</th><th scope="col" class="px-7 py-5 text-right font-medium">${esc(fees.columns.fee)}</th>
      </tr></thead>
      <tbody>
        ${fees.rows.map((row) => `<tr class="border-b border-line-soft last:border-0">
          <th scope="row" class="px-7 py-6 align-top font-normal"><a href="${esc(row.href)}" class="font-display text-xl text-ink underline-offset-4 transition hover:text-sage-deep hover:underline">${esc(row.service)}</a></th>
          <td class="px-7 py-6 align-top text-sm leading-6 text-muted">${esc(row.length)}</td>
          <td class="px-7 py-6 align-top text-right">${row.pricePrefix ? `<span class="text-sm text-muted">${esc(row.pricePrefix)}</span> ` : ""}<span class="font-display text-2xl text-sage-dark">${price(row.price)}</span></td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>
  <p class="mt-6 max-w-3xl text-sm leading-6 text-muted"><em>${esc(fees.currencyNote)}</em></p>
  ${fees.notes.map((n) => `<p class="mt-3 max-w-3xl text-sm leading-6 text-muted">${esc(n)}</p>`).join("")}
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(workWithMePage.process.eyebrow), title: esc(workWithMePage.process.title), intro: esc(workWithMePage.process.intro) })}
  ${processList()}
</div></section>

<section class="relative overflow-hidden bg-sage-mist">
  ${leafBranch("pointer-events-none absolute -right-10 -top-6 h-72 w-40 rotate-12 text-sage/25")}
  <div class="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
    <p class="eyebrow">${esc(workWithMePage.closing.eyebrow)}</p>
    <h2 class="mt-4 font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">${esc(workWithMePage.closing.title)}</h2>
    <div class="mx-auto mt-5 max-w-xl space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${paragraphs(workWithMePage.closing.paragraphs)}</div>
    <div class="mt-8 flex justify-center">${button(esc(workWithMePage.closing.primaryCta.label), workWithMePage.closing.primaryCta.href, { size: "lg" })}</div>
    <p class="mt-8 text-sm text-muted">${esc(workWithMePage.closing.secondaryPrompt)}</p>
    <div class="mt-3 flex justify-center">${button(esc(workWithMePage.closing.secondaryCta.label), workWithMePage.closing.secondaryCta.href, { variant: "outline" })}</div>
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
      <div><label for="topic" class="mb-2 block text-sm font-medium text-ink">${esc(form.topicLabel)}</label>
        <select id="topic" name="topic" class="${field}"><option value="">${esc(form.topicPlaceholder)}</option>${form.topics.map((t) => `<option>${esc(t)}</option>`).join("")}</select></div>
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
      <h2 class="font-display text-2xl text-white">${esc(contactPage.directEmail.title)}</h2>
      <p class="mt-3 text-sm leading-7 text-sage-soft/85">${esc(contactPage.directEmail.generalLabel)}</p>
      <a href="mailto:${contactDetails.email}" class="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-sage-dark transition hover:bg-sage-mist">${esc(contactDetails.email)}</a>
    </div>
    <div class="rounded-4xl border border-line bg-white p-8">
      <h2 class="font-display text-2xl text-ink">${esc(contactPage.practicalities.title)}</h2>
      <dl class="mt-5 space-y-4">
        ${[[contactPage.practicalities.onlineLabel, contactDetails.reach], [contactPage.practicalities.inPersonLabel, contactDetails.location]]
          .map(([label, value]) => `<div><dt class="text-xs uppercase tracking-[0.14em] text-muted">${esc(label)}</dt><dd class="mt-1 text-[0.9375rem] leading-6 text-ink-soft">${esc(value)}</dd></div>`).join("")}
      </dl>
    </div>
  </aside>
</div></section>

<section class="border-t border-line bg-cream-deep"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <div class="rounded-4xl border border-amber-300/50 bg-amber-50/60 p-8 sm:p-10">
    <h2 class="font-display text-3xl text-ink">${esc(contactPage.urgent.title)}</h2>
    <p class="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(contactPage.urgent.intro)}</p>
  </div>
</div></section>`,
  });

  /* ---------------------------- Books ---------------------------- */
  const { also } = booksPage;
  const cover = booksPage.hero.cover;

  pages.push({
    path: "/books",
    title: booksPage.seo.title,
    description: booksPage.seo.description,
    extraHead: cover.image ? `<meta property="og:image" content="${esc(cover.image)}"/>` : "",
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
        <div class="mt-7 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${paragraphs(booksPage.hero.paragraphs)}</div>
        <div class="mt-9 flex flex-wrap gap-3">${button(esc(booksPage.hero.primaryCta.label), booksPage.hero.primaryCta.href, { size: "lg" })}</div>
      </div>
      <div class="mx-auto w-full max-w-xs lg:max-w-sm">
        ${cover.image
          ? `<img src="${esc(cover.image)}" alt="${esc(cover.alt)}" width="512" height="768" class="w-full rounded-2xl shadow-2xl shadow-sage-deep/25"/>`
          : portrait({ src: null, alt: cover.alt, label: cover.label, extra: "shadow-xl shadow-sage-deep/10" })}
      </div>
    </div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <div class="flex flex-col gap-8 rounded-4xl border border-line bg-white p-8 sm:flex-row sm:items-center sm:p-10">
    <img src="${esc(also.cover.image)}" alt="${esc(also.cover.alt)}" width="512" height="768" class="w-40 shrink-0 rounded-2xl shadow-lg shadow-sage-deep/10" loading="lazy"/>
    <div>
      <p class="eyebrow">${esc(also.eyebrow)}</p>
      <h2 class="mt-3 font-display text-3xl text-ink">${esc(also.title)}</h2>
      <p class="mt-3 text-sm uppercase tracking-[0.16em] text-muted">${esc(also.byline)}</p>
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
  ${privacyPage.sections.map((section) => `<div><h2 class="font-display text-[1.875rem] leading-tight text-ink">${esc(section.title)}</h2><div class="mt-4 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${paragraphs(section.body)}</div></div>`).join("")}
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
