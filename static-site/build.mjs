/**
 * Static site generator.
 *
 *   node --experimental-strip-types static-site/build.mjs
 *
 * Reads content straight from the original src/lib TypeScript modules so the
 * copy is not duplicated, and writes plain HTML/CSS/JS into static-site/dist.
 * Upload the contents of dist/ to public_html — there is no runtime dependency
 * on Node or Next.
 */
import { mkdir, writeFile, copyFile, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  layout, esc, richLines, blob, leafBranch, psiMark, portrait, button,
  sectionHeading, serviceIcon, whatsappIcon, checkIcon, quietExit,
  currencyToggle, price, trustBar, letterSignup, contactDetails, whatsappLink,
  practitioner, seo, notFound, ORIGIN,
} from "./template.mjs";
import { servicePages, servicePageCopy } from "./services.mjs";
import theme from "../content/theme.json" with { type: "json" };

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, "..");
const SRC = path.join(ROOT, "src", "lib") + path.sep;
const DIST = path.join(HERE, "dist");

const { serviceCards, beliefs, processSteps } = await import(SRC + "siteData.ts");
const { sortedArticles, featuredArticles, articles, categories, formatArticleDate, insightsPage } =
  await import(SRC + "insights.ts");
const { priceBook, currencyMeta } = await import(SRC + "pricing.ts");
const { selfAudit, relationalRisk, assessmentPageCopy } = await import(SRC + "assessments.ts");
const { homePage: homeContent } = await import(SRC + "pageContent.ts");

const pages = [];
const addPage = (p) => pages.push(p);

/* ------------------------------------------------------------------ *
 * Shared fragments
 * ------------------------------------------------------------------ */

const serviceCardHtml = (card) => `
<a href="${card.href}" class="group flex flex-col rounded-4xl border border-line bg-white p-8 transition duration-200 hover:-translate-y-1 hover:border-sage/50 hover:shadow-xl hover:shadow-sage-deep/8">
  <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-mist text-sage-deep transition group-hover:bg-sage-soft">${serviceIcon(card.icon, "h-7 w-7")}</span>
  <h3 class="mt-6 font-display text-[1.75rem] leading-tight text-ink">${esc(card.title)}</h3>
  <p class="mt-2 text-sm text-sage-deep">${esc(card.tagline)}</p>
  <p class="mt-4 flex-1 text-[0.9375rem] leading-7 text-muted">${esc(card.description)}</p>
  <div class="mt-7 flex items-center justify-between border-t border-line-soft pt-5">
    <span class="text-xs text-muted">${esc(card.meta)}</span><span class="text-sm text-sage-deep">→</span>
  </div>
</a>`;

const articleCardHtml = (article) => `
<a href="/insights/${article.slug}" class="group flex flex-col rounded-4xl border border-line bg-white p-8 transition hover:-translate-y-1 hover:border-sage/50 hover:shadow-lg hover:shadow-sage-deep/8">
  <span class="inline-flex w-fit rounded-full bg-sage-mist px-3 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-sage-deep">${esc(article.category)}</span>
  <h3 class="mt-5 font-display text-[1.6rem] leading-snug text-ink">${esc(article.title)}</h3>
  <p class="mt-3 flex-1 text-[0.9375rem] leading-7 text-muted">${esc(article.excerpt)}</p>
  <p class="mt-6 border-t border-line-soft pt-5 text-xs text-muted">${formatArticleDate(article.date)} · ${article.readingMinutes} min read</p>
</a>`;

const letterPanel = ({ eyebrow, title, intro }) => `
<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
  <div class="rounded-4xl border border-line bg-white p-9 sm:p-12">
    ${sectionHeading({ eyebrow: esc(eyebrow), title: esc(title), intro: esc(intro) })}
    <div class="mt-8">${letterSignup()}</div>
  </div>
</div></section>`;

/* ------------------------------------------------------------------ *
 * Home
 * ------------------------------------------------------------------ */

const { hero, aboutPreview, services, assessments: assessmentSection, beliefs: beliefsCopy,
  process, insights: insightsCopy, letter: letterCopy, closing } = homeContent;

addPage({
  path: "/",
  title: `${practitioner.shortName} | ${seo.tagline}`,
  description: seo.description,
  body: `
<section class="relative overflow-hidden bg-cream-deep">
  ${blob("pointer-events-none absolute -right-32 -top-40 h-[46rem] w-[46rem] text-sage-soft/50")}
  ${blob("pointer-events-none absolute -bottom-64 -left-40 h-[34rem] w-[34rem] rotate-45 text-sage-mist")}
  <div class="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-24">
    <div>
      <p class="eyebrow">${esc(hero.eyebrow)}</p>
      <h1 class="mt-6 font-display text-[3rem] leading-[1.02] text-ink sm:text-[4rem] lg:text-[4.5rem]">${richLines(hero.titleLines)}</h1>
      <p class="mt-7 max-w-md text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(hero.intro)}</p>
      <div class="mt-9 flex flex-wrap items-center gap-3">
        ${button(esc(hero.primaryCta.label), hero.primaryCta.href, { size: "lg" })}
        ${button(esc(hero.secondaryCta.label), hero.secondaryCta.href, { variant: "outline", size: "lg" })}
      </div>
      <div class="mt-9 flex items-center gap-2.5 text-sm text-muted">
        <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4 text-sage-deep" aria-hidden="true"><path d="M12 3.2 5 6v5.6c0 4.2 2.9 8.1 7 9.2 4.1-1.1 7-5 7-9.2V6l-7-2.8Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="m9.2 12 2 2 3.6-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${esc(hero.reassurance)}
      </div>
    </div>
    <div class="relative">
      ${leafBranch("pointer-events-none absolute -left-10 top-8 z-10 hidden h-64 w-32 text-sage/40 lg:block")}
      ${portrait({ src: hero.portrait.image, alt: hero.portrait.alt, label: hero.portrait.label, extra: "shadow-xl shadow-sage-deep/10" })}
      <div class="absolute -bottom-6 -left-4 max-w-[15rem] rounded-3xl border border-line bg-white/95 p-5 shadow-lg shadow-sage-deep/10 backdrop-blur sm:-left-8">
        <p class="font-display text-3xl text-sage-deep">${esc(hero.badge.value)}</p>
        <p class="mt-1 text-xs leading-5 text-muted">${esc(hero.badge.caption)}</p>
      </div>
    </div>
  </div>
</section>

${trustBar()}

<section class="bg-cream"><div class="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.1fr] lg:gap-16 lg:px-8 lg:py-24">
  ${portrait({ src: aboutPreview.portrait.image, alt: aboutPreview.portrait.alt, label: aboutPreview.portrait.label })}
  <div class="flex flex-col justify-center">
    ${sectionHeading({
      eyebrow: esc(aboutPreview.eyebrow),
      title: esc(aboutPreview.title),
      intro: aboutPreview.paragraphs.map((text, i) => `<p${i ? ' class="mt-4"' : ""}>${esc(text)}</p>`).join(""),
    })}
    <p class="mt-6 font-display text-2xl leading-snug text-sage-deep">${esc(aboutPreview.quote)}</p>
    <div class="mt-8 flex flex-wrap items-center gap-4">
      ${button(esc(aboutPreview.cta.label), aboutPreview.cta.href, { variant: "outline" })}
      <p class="text-sm text-muted">${esc(aboutPreview.credentialLine)}</p>
    </div>
  </div>
</div></section>

<section class="relative overflow-hidden border-y border-line bg-cream-deep">
  ${leafBranch("pointer-events-none absolute -right-10 top-16 h-80 w-40 text-sage/15")}
  <div class="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
    ${sectionHeading({ eyebrow: esc(services.eyebrow), title: esc(services.title), intro: esc(services.intro), align: "center" })}
    <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${serviceCards.map(serviceCardHtml).join("")}</div>
    <div class="mt-12 text-center">${button(esc(services.cta.label), services.cta.href, { variant: "outline" })}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
  ${sectionHeading({ eyebrow: esc(assessmentSection.eyebrow), title: esc(assessmentSection.title), intro: esc(assessmentSection.intro) })}
  <div class="mt-12 grid gap-6 lg:grid-cols-2">
    ${assessmentSection.cards.map((item) => `
    <div class="relative overflow-hidden rounded-4xl bg-sage-dark p-9 text-sage-soft sm:p-11">
      ${psiMark("pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-white/[0.06]")}
      <p class="relative text-[0.6875rem] uppercase tracking-[0.2em] text-sage-soft/70">${esc(item.eyebrow)}</p>
      <h3 class="relative mt-4 font-display text-[2.25rem] leading-tight text-white">${esc(item.title)}</h3>
      <p class="relative mt-4 text-[0.9375rem] leading-7 text-sage-soft/85">${esc(item.body)}</p>
      <div class="relative mt-8">${button(esc(item.cta), item.href, { variant: "light" })}</div>
    </div>`).join("")}
  </div>
</div></section>

<section class="relative overflow-hidden border-y border-line bg-sage-mist">
  ${leafBranch("pointer-events-none absolute -left-12 top-10 h-80 w-40 text-sage/25")}
  <div class="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
    ${sectionHeading({ eyebrow: esc(beliefsCopy.eyebrow), title: esc(beliefsCopy.title), align: "center" })}
    <div class="mt-14 grid gap-6 sm:grid-cols-2">
      ${beliefs.map((b) => `<div class="rounded-4xl border border-sage/25 bg-white/80 p-8"><h3 class="font-display text-[1.6rem] leading-snug text-ink">${esc(b.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">${esc(b.body)}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
  ${sectionHeading({ eyebrow: esc(process.eyebrow), title: esc(process.title), intro: esc(process.intro) })}
  <ol class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
    ${processSteps.map((s) => `<li><span class="font-display text-5xl text-sage/45">${s.step}</span><h3 class="mt-3 font-display text-2xl text-ink">${esc(s.title)}</h3><p class="mt-3 text-[0.9375rem] leading-7 text-muted">${esc(s.body)}</p></li>`).join("")}
  </ol>
</div></section>

<section class="border-t border-line bg-cream-deep"><div class="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
  <div class="flex flex-wrap items-end justify-between gap-6">
    ${sectionHeading({ eyebrow: esc(insightsCopy.eyebrow), title: esc(insightsCopy.title) })}
    ${button(esc(insightsCopy.cta.label), insightsCopy.cta.href, { variant: "outline" })}
  </div>
  <div class="mt-12 grid gap-6 lg:grid-cols-3">${featuredArticles.slice(0, 3).map(articleCardHtml).join("")}</div>
</div></section>

${letterPanel(letterCopy)}

<section class="relative overflow-hidden bg-sage-mist">
  ${leafBranch("pointer-events-none absolute -left-14 bottom-0 h-96 w-48 text-sage/30")}
  ${psiMark("pointer-events-none absolute -right-10 top-1/4 h-72 w-72 text-sage/15")}
  <div class="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
    <svg viewBox="0 0 24 24" fill="none" class="mx-auto h-7 w-7 text-sage-deep" aria-hidden="true"><path d="M12 20.4S3.8 15.5 3.8 9.6A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8.2 2.4c0 5.9-8.2 10.8-8.2 10.8Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
    <h2 class="mt-7 font-display text-[2.5rem] leading-[1.08] text-ink sm:text-[3.25rem]">${richLines(closing.titleLines)}</h2>
    <p class="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(closing.intro)}</p>
    <div class="mt-9 flex flex-wrap justify-center gap-3">
      ${button(esc(closing.primaryCta.label), closing.primaryCta.href, { size: "lg" })}
      ${button(whatsappIcon() + " " + esc(closing.whatsappCtaLabel), whatsappLink, { variant: "outline", size: "lg" })}
    </div>
    <div class="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
      <a href="mailto:${contactDetails.email}" class="underline-offset-4 hover:text-sage-deep hover:underline">${contactDetails.email}</a>
      <span aria-hidden="true" class="hidden h-4 w-px bg-line sm:block"></span>
      <a href="${contactDetails.instagramUrl}" target="_blank" rel="noopener noreferrer" class="underline-offset-4 hover:text-sage-deep hover:underline">${contactDetails.instagram}</a>
    </div>
  </div>
</section>`,
});

/* ------------------------------------------------------------------ *
 * Service pages
 * ------------------------------------------------------------------ */

for (const page of servicePages) {
  const related = serviceCards.filter((c) => page.related.includes(c.href));
  addPage({
    path: page.path,
    title: page.title,
    description: page.description,
    body: `
${quietExit()}
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] text-sage-soft/40")}
  ${leafBranch("pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-28">
    <p class="eyebrow">${esc(page.eyebrow)}</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.06] text-ink sm:text-6xl">${esc(page.title)}</h1>
    <div class="mt-7 max-w-2xl space-y-4 text-lg leading-[1.75] text-ink-soft">${page.heroCopy.map((l) => `<p>${esc(l)}</p>`).join("")}</div>
    <div class="mt-9 flex flex-wrap items-center gap-4">
      ${button(esc(page.ctaLabel), servicePageCopy.closingCta.href, { size: "lg" })}
      ${page.ctaNote ? `<p class="text-sm text-muted">${esc(page.ctaNote)}</p>` : ""}
    </div>
  </div>
</section>

<section class="border-b border-line bg-cream"><div class="mx-auto max-w-5xl px-6 py-16 lg:px-8">
  <div class="grid gap-10 rounded-4xl border border-line bg-white p-8 sm:p-10 lg:grid-cols-2">
    <div>
      <h2 class="font-display text-3xl text-ink">${esc(servicePageCopy.formatTitle)}</h2>
      <ul class="mt-5 space-y-3">${page.format.map((l) => `<li class="flex gap-3 text-[0.9375rem] leading-7 text-ink-soft"><span aria-hidden="true" class="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-sage"></span>${esc(l)}</li>`).join("")}</ul>
    </div>
    <div class="lg:border-l lg:border-line lg:pl-10">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="font-display text-3xl text-ink">${esc(servicePageCopy.feesTitle)}</h2>${currencyToggle()}
      </div>
      <dl class="mt-5 space-y-4">
        ${page.fees.map((fee) => `<div class="border-b border-line-soft pb-4 last:border-0 last:pb-0">
          <div class="flex items-baseline justify-between gap-4"><dt class="text-[0.9375rem] text-ink-soft">${esc(fee.label)}</dt><dd class="font-display text-2xl text-sage-dark">${price(fee.amount)}</dd></div>
          ${fee.note ? `<p class="mt-1 text-xs text-muted">${esc(fee.note)}</p>` : ""}
        </div>`).join("")}
      </dl>
      ${page.feeNote ? `<p class="mt-5 text-sm leading-6 text-muted">${esc(page.feeNote)}</p>` : ""}
    </div>
  </div>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl space-y-14 px-6 py-16 lg:px-8 lg:py-20">
  ${page.sections.map((section) => `<article>
    <h2 class="font-display text-[2rem] leading-tight text-ink">${esc(section.title)}</h2>
    ${section.list
      ? `<ul class="mt-5 space-y-3.5">${section.content.map((i) => `<li class="flex gap-3.5 text-[1.0625rem] leading-[1.75] text-ink-soft">${checkIcon("mt-1.5 h-4 w-4 shrink-0 text-sage-deep")}${esc(i)}</li>`).join("")}</ul>`
      : `<div class="mt-5 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${section.content.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`}
  </article>`).join("")}
</div></section>

<section class="relative overflow-hidden bg-sage-mist">
  ${leafBranch("pointer-events-none absolute -right-8 -top-6 h-72 w-40 rotate-12 text-sage/25")}
  <div class="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
    <h2 class="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">${esc(servicePageCopy.closingTitle)}</h2>
    <p class="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.75] text-ink-soft">${esc(servicePageCopy.closingIntro)}</p>
    <div class="mt-8 flex justify-center">${button(esc(servicePageCopy.closingCta.label), servicePageCopy.closingCta.href, { size: "lg" })}</div>
  </div>
</section>

${related.length ? `<section class="border-t border-line bg-cream"><div class="mx-auto max-w-6xl px-6 py-16 lg:px-8">
  <h2 class="font-display text-3xl text-ink">${esc(servicePageCopy.relatedTitle)}</h2>
  <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    ${related.map((c) => `<a href="${c.href}" class="group rounded-3xl border border-line bg-white p-7 transition hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-lg hover:shadow-sage-deep/5"><h3 class="font-display text-2xl text-ink">${esc(c.title)}</h3><p class="mt-3 text-sm leading-6 text-muted">${esc(c.tagline)}</p><p class="mt-6 text-sm text-sage-deep">${esc(servicePageCopy.relatedCtaLabel)}</p></a>`).join("")}
  </div>
</div></section>` : ""}`,
  });
}

/* ------------------------------------------------------------------ *
 * Assessments
 * ------------------------------------------------------------------ */

const assessmentPage = (assessment, sibling) => ({
  path: "/" + assessment.slug,
  title: assessment.name,
  description: assessment.metaDescription,
  // The quiz only needs the instrument itself; the page copy beside it is
  // already rendered into the HTML, so keep it out of the inline payload.
  bodyScripts: `<script>window.ASSESSMENT=${JSON.stringify(assessment, (key, value) =>
    ["headline", "metaDescription", "siblingBlurb"].includes(key) ? undefined : value,
  )};window.ASSESSMENT_COPY=${JSON.stringify(assessmentPageCopy.quiz)};</script><script src="/assets/assessment.js" defer></script>`,
  body: `
${quietExit()}
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-40 -top-48 h-[40rem] w-[40rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-12 bottom-0 h-80 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">${esc(assessment.name)}</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">${esc(assessment.headline)}</h1>
    <p class="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">${esc(assessment.intro)}</p>
    <div class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
      <span>${esc(assessment.eyebrow)}</span><span aria-hidden="true" class="hidden h-4 w-px bg-line sm:block"></span><span>${esc(assessmentPageCopy.privacyNote)}</span>
    </div>
    <a href="#assessment" class="mt-9 inline-flex rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark">${esc(assessmentPageCopy.startLabel)}</a>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <div id="assessment" tabindex="-1" class="scroll-mt-28 rounded-4xl border border-line bg-white p-7 outline-none sm:p-10">
    <noscript><p class="text-[1.0625rem] leading-7 text-ink-soft">This assessment needs JavaScript enabled. If you would rather go through it with me directly, <a href="/contact" class="text-sage-deep underline">book a free conversation</a>.</p></noscript>
  </div>
</div></section>

<section class="border-t border-line bg-cream-deep"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <h2 class="font-display text-3xl text-ink">${esc(assessmentPageCopy.aboutTitle)}</h2>
  <div class="mt-6 grid gap-6 sm:grid-cols-2">
    <div class="rounded-3xl border border-line bg-white p-7"><h3 class="font-display text-2xl text-sage-deep">${esc(assessmentPageCopy.isTitle)}</h3><ul class="mt-4 space-y-2.5 text-[0.9375rem] leading-7 text-ink-soft">${assessmentPageCopy.isItems.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>
    <div class="rounded-3xl border border-line bg-white p-7"><h3 class="font-display text-2xl text-ink">${esc(assessmentPageCopy.isntTitle)}</h3><ul class="mt-4 space-y-2.5 text-[0.9375rem] leading-7 text-ink-soft">${assessmentPageCopy.isntItems.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>
  </div>
</div></section>

<section class="bg-cream"><div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
  <a href="/${sibling.slug}" class="group flex flex-col gap-3 rounded-4xl border border-line bg-white p-9 transition hover:border-sage/50 hover:shadow-lg hover:shadow-sage-deep/5">
    <span class="eyebrow">${esc(assessmentPageCopy.siblingEyebrow)}</span>
    <h2 class="font-display text-3xl text-ink">${esc(sibling.name)}</h2>
    <p class="text-[0.9375rem] leading-7 text-muted">${esc(sibling.siblingBlurb)}</p>
    <span class="mt-2 text-sm text-sage-deep">${esc(assessmentPageCopy.siblingCtaLabel)}</span>
  </a>
</div></section>`,
});

addPage(assessmentPage(selfAudit, relationalRisk));
addPage(assessmentPage(relationalRisk, selfAudit));

/* ------------------------------------------------------------------ *
 * Insights
 * ------------------------------------------------------------------ */

const [lead, ...rest] = sortedArticles;

addPage({
  path: "/insights",
  title: insightsPage.seo.title,
  description: insightsPage.seo.description,
  body: `
<section class="relative overflow-hidden border-b border-line bg-cream-deep">
  ${blob("pointer-events-none absolute -right-40 -top-44 h-[38rem] w-[38rem] text-sage-soft/45")}
  ${leafBranch("pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20")}
  <div class="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
    <p class="eyebrow">${esc(insightsPage.eyebrow)}</p>
    <h1 class="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">${esc(insightsPage.title)}</h1>
    <p class="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">${esc(insightsPage.intro)}</p>
    <div class="mt-9 flex flex-wrap gap-2">${categories.map((c) => `<span class="rounded-full border border-line bg-white/70 px-4 py-2 text-xs text-ink-soft">${esc(c)}</span>`).join("")}</div>
  </div>
</section>

<section class="bg-cream"><div class="mx-auto max-w-6xl px-6 py-16 lg:px-8">
  <a href="/insights/${lead.slug}" class="group grid gap-8 rounded-4xl border border-line bg-white p-9 transition hover:border-sage/50 hover:shadow-xl hover:shadow-sage-deep/8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
    <div>
      <span class="inline-flex rounded-full bg-sage-mist px-3 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-sage-deep">${esc(insightsPage.leadBadgePrefix)} · ${esc(lead.category)}</span>
      <h2 class="mt-5 font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">${esc(lead.title)}</h2>
      <p class="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(lead.excerpt)}</p>
      <p class="mt-6 text-sm text-muted">${formatArticleDate(lead.date)} · ${lead.readingMinutes} min read</p>
      <p class="mt-6 text-sm text-sage-deep">${esc(insightsPage.leadCtaLabel)}</p>
    </div>
    <div class="relative hidden aspect-square items-center justify-center rounded-[2rem] bg-sage-mist lg:flex">${leafBranch("h-3/4 w-auto text-sage/40")}</div>
  </a>
</div></section>

<section class="border-t border-line bg-cream-deep"><div class="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
  ${sectionHeading({ eyebrow: esc(insightsPage.archiveEyebrow), title: esc(insightsPage.archiveTitle) })}
  <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${rest.map(articleCardHtml).join("")}</div>
</div></section>

${letterPanel({ eyebrow: insightsPage.letterEyebrow, title: insightsPage.letterTitle, intro: insightsPage.letterIntro })}`,
});

function renderArticleBody(blocks) {
  const out = [];
  let list = [];
  const flush = () => {
    if (!list.length) return;
    out.push(`<ul class="my-6 space-y-3">${list.map((i) => `<li class="flex gap-3.5 text-[1.0625rem] leading-[1.8] text-ink-soft"><span aria-hidden="true" class="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage"></span>${esc(i)}</li>`).join("")}</ul>`);
    list = [];
  };
  for (const block of blocks) {
    if (block.startsWith("- ")) { list.push(block.slice(2)); continue; }
    flush();
    if (block.startsWith("## ")) out.push(`<h2 class="mt-12 font-display text-[2rem] leading-tight text-ink">${esc(block.slice(3))}</h2>`);
    else if (block.startsWith("> ")) out.push(`<blockquote class="my-9 border-l-2 border-sage pl-6 font-display text-[1.6rem] leading-snug text-sage-deep">${esc(block.slice(2))}</blockquote>`);
    else out.push(`<p class="mt-5 text-[1.0625rem] leading-[1.85] text-ink-soft">${esc(block)}</p>`);
  }
  flush();
  return out.join("");
}

for (const article of articles) {
  const related = articles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 2);
  const suggestions = related.length ? related : articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  addPage({
    path: `/insights/${article.slug}`,
    title: article.title,
    description: article.excerpt,
    body: `
<article>
  <header class="relative overflow-hidden border-b border-line bg-cream-deep">
    ${leafBranch("pointer-events-none absolute -right-10 -top-6 h-72 w-40 rotate-12 text-sage/20")}
    <div class="relative mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
      <a href="/insights" class="text-sm text-muted underline-offset-4 transition hover:text-sage-deep hover:underline">${esc(insightsPage.articleBackLabel)}</a>
      <p class="eyebrow mt-8">${esc(article.category)}</p>
      <h1 class="mt-4 font-display text-[2.5rem] leading-[1.08] text-ink sm:text-[3.25rem]">${esc(article.title)}</h1>
      <p class="mt-6 text-lg leading-[1.8] text-ink-soft">${esc(article.excerpt)}</p>
      <p class="mt-8 text-sm text-muted">${esc(practitioner.shortName)} · ${formatArticleDate(article.date)} · ${article.readingMinutes} min read</p>
    </div>
  </header>
  <div class="bg-cream"><div class="mx-auto max-w-3xl px-6 py-14 lg:px-8 lg:py-16">
    ${renderArticleBody(article.body)}
    <div class="mt-14 rounded-4xl bg-sage-mist p-8 sm:p-10">
      <h2 class="font-display text-[1.75rem] leading-snug text-ink">${esc(insightsPage.articleCtaTitle)}</h2>
      <p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">${esc(insightsPage.articleCtaIntro)}</p>
      <div class="mt-6 flex flex-wrap gap-3">${button(esc(insightsPage.articleCtaPrimary.label), insightsPage.articleCtaPrimary.href)}${button(esc(insightsPage.articleCtaSecondary.label), insightsPage.articleCtaSecondary.href, { variant: "outline" })}</div>
    </div>
  </div></div>
</article>

<section class="border-t border-line bg-cream-deep"><div class="mx-auto max-w-5xl px-6 py-16 lg:px-8">
  <h2 class="font-display text-3xl text-ink">${esc(insightsPage.readNextTitle)}</h2>
  <div class="mt-8 grid gap-6 sm:grid-cols-2">${suggestions.map(articleCardHtml).join("")}</div>
</div></section>`,
  });
}

/* ------------------------------------------------------------------ *
 * Remaining pages come from pages-extra.mjs to keep this file readable
 * ------------------------------------------------------------------ */

const { extraPages } = await import("./pages-extra.mjs");
extraPages().forEach(addPage);

/* ------------------------------------------------------------------ *
 * Write everything out
 * ------------------------------------------------------------------ */

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dest);
    else await copyFile(src, dest);
  }
}

if (existsSync(DIST)) await rm(DIST, { recursive: true });
await mkdir(DIST, { recursive: true });

for (const page of pages) {
  const dir = page.path === "/" ? DIST : path.join(DIST, page.path);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), layout(page), "utf8");
}

// 404 — Apache serves this via .htaccess
await writeFile(
  path.join(DIST, "404.html"),
  layout({
    path: "/404",
    title: notFound.metaTitle,
    description: notFound.intro,
    canonical: false,
    body: `<section class="relative overflow-hidden bg-cream-deep">
      ${leafBranch("pointer-events-none absolute -left-12 bottom-0 h-80 w-40 text-sage/20")}
      <div class="relative mx-auto max-w-2xl px-6 py-28 text-center lg:px-8">
        <p class="font-display text-7xl text-sage/50">404</p>
        <h1 class="mt-4 font-display text-[2.5rem] leading-tight text-ink">${esc(notFound.title)}</h1>
        <p class="mx-auto mt-5 max-w-md text-[1.0625rem] leading-[1.8] text-ink-soft">${esc(notFound.intro)}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-2.5">
          ${notFound.links.map((link) => `<a href="${esc(link.href)}" class="rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink-soft transition hover:border-sage/50 hover:bg-sage-mist">${esc(link.label)}</a>`).join("")}
        </div>
        <div class="mt-9 flex justify-center">${button(esc(notFound.homeLabel), "/", { size: "lg" })}</div>
      </div>
    </section>`,
  }),
  "utf8",
);

// Assets
await copyDir(path.join(HERE, "assets"), path.join(DIST, "assets"));

/*
 * Theme. The compiled Tailwind bundle defines the palette as custom properties
 * and every utility reads them (`.bg-sage{background-color:var(--color-sage)}`),
 * so redefining those properties in a later stylesheet retints the whole site
 * without recompiling Tailwind. theme.css is linked last for that reason.
 */
const themeCss = [
  ":root{",
  ...Object.entries(theme.colors).map(([k, v]) => `--color-${k}:${v};`),
  `--font-cormorant:${theme.fonts.display};`,
  `--font-inter:${theme.fonts.body};`,
  "}",
].join("");
await writeFile(path.join(DIST, "assets", "theme.css"), themeCss, "utf8");

// Images uploaded through the admin. Committed to the repo, so they deploy with
// everything else rather than depending on a second service staying up.
if (existsSync(path.join(ROOT, "content", "uploads"))) {
  await copyDir(path.join(ROOT, "content", "uploads"), path.join(DIST, "uploads"));
}

// Self-hosted fonts. assets/styles.css references these as ../media/*.woff2,
// so they have to land in dist/media — a sibling of dist/assets, not inside it.
await copyDir(path.join(HERE, "media"), path.join(DIST, "media"));
await writeFile(
  path.join(DIST, "assets", "data.js"),
  `window.PRICE_BOOK=${JSON.stringify(priceBook)};\n` +
    `window.CURRENCY_META=${JSON.stringify(Object.fromEntries(Object.entries(currencyMeta).map(([k, v]) => [k, v.symbol])))};\n` +
    `window.PRACTICE_EMAIL=${JSON.stringify(contactDetails.email)};\n` +
    `/* Set FORM_ENDPOINT to a form service URL (Formspree, Web3Forms, …) to have\n` +
    `   the contact form POST there. Left empty, it opens the visitor's mail app\n` +
    `   with the message prefilled instead. */\n` +
    `window.FORM_ENDPOINT="";\n`,
  "utf8",
);

// Book cover
if (existsSync(path.join(ROOT, "public", "abc-of-marriage.jpg"))) {
  await copyFile(path.join(ROOT, "public", "abc-of-marriage.jpg"), path.join(DIST, "abc-of-marriage.jpg"));
}

// Favicon
await copyFile(path.join(ROOT, "src", "app", "icon.svg"), path.join(DIST, "favicon.svg"));

// robots.txt + sitemap.xml — ORIGIN is defined in template.mjs
await writeFile(path.join(DIST, "robots.txt"), `User-Agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`, "utf8");
await writeFile(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map((p) => `  <url><loc>${ORIGIN}${p.path === "/" ? "" : p.path}</loc></url>`).join("\n") +
    `\n</urlset>\n`,
  "utf8",
);

// Apache config: clean URLs, 404 page, long-lived asset caching
await writeFile(
  path.join(DIST, ".htaccess"),
  `# Serve /about from /about/index.html and strip trailing slashes
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)$ /$1/index.html [L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
`,
  "utf8",
);

console.log(`Built ${pages.length} pages → ${path.relative(ROOT, DIST)}`);
