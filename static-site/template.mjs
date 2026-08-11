/**
 * Shared markup for the static build.
 *
 * Class names deliberately match the original React components, because the
 * stylesheet in assets/styles.css is the compiled Tailwind output from that
 * app. Change a class here and it may no longer have a matching rule — see
 * assets/site.css for the handful of additions made for the static build.
 */

const SRC = new URL("../src/lib/", import.meta.url).pathname;
const { practitioner, siteNav, footerSections, contactDetails, whatsappLink, trustItems } =
  await import(SRC + "siteData.ts");

export { practitioner, siteNav, footerSections, contactDetails, whatsappLink, trustItems };

/** Escape text destined for HTML text nodes or attribute values. */
export function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ------------------------------------------------------------------ *
 * Ornaments — ported verbatim from src/components/ui/Ornaments.tsx
 * ------------------------------------------------------------------ */

export const leafBranch = (cls = "") => `
<svg viewBox="0 0 200 320" fill="none" stroke="currentColor" stroke-width="1" class="${cls}" aria-hidden="true">
  <path d="M100 320V40" stroke-linecap="round"/>
  <path d="M100 90c-30-6-52-28-56-58 30 4 52 26 56 58Z"/><path d="M100 90c30-6 52-28 56-58-30 4-52 26-56 58Z"/>
  <path d="M100 160c-30-6-52-28-56-58 30 4 52 26 56 58Z"/><path d="M100 160c30-6 52-28 56-58-30 4-52 26-56 58Z"/>
  <path d="M100 230c-30-6-52-28-56-58 30 4 52 26 56 58Z"/><path d="M100 230c30-6 52-28 56-58-30 4-52 26-56 58Z"/>
  <circle cx="100" cy="34" r="5"/>
</svg>`;

export const psiMark = (cls = "") => `
<svg viewBox="0 0 100 100" fill="none" class="${cls}" aria-hidden="true">
  <path d="M50 12v76M28 30v18a22 22 0 0 0 44 0V30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
</svg>`;

export const psiBadge = (cls = "") => `
<svg viewBox="0 0 100 100" fill="none" class="${cls}" aria-hidden="true">
  <circle cx="50" cy="50" r="46" stroke="currentColor" stroke-width="2.5"/>
  <path d="M50 26v48M34 38v10a16 16 0 0 0 32 0V38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
</svg>`;

export const blob = (cls = "") => `
<svg viewBox="0 0 600 600" class="${cls}" aria-hidden="true">
  <path fill="currentColor" d="M472 108c56 52 84 137 68 210s-76 134-146 165-155 32-208-8-79-121-64-193 71-133 140-176 154-50 210 2Z"/>
</svg>`;

export const headOutline = (cls = "") => `
<svg viewBox="0 0 240 260" fill="none" stroke="currentColor" stroke-width="1.1" class="${cls}" aria-hidden="true">
  <path d="M168 246c-4-30 2-46 16-62 20-23 32-48 32-76C216 47 172 8 118 8 66 8 24 46 24 100c0 24 9 42 24 58 10 11 14 20 14 33v55" stroke-linecap="round"/>
  <path d="M96 118c-16-4-24-14-22-26 2-13 15-20 28-15 6-16 24-22 37-12 12-9 28-4 33 9 14-1 24 10 22 24-2 12-12 20-25 20M96 118c-10 6-12 18-5 27 6 8 17 10 26 6M96 118c8-6 20-6 28 1M117 152c8 6 20 6 29-1M117 152v34" stroke-linecap="round"/>
</svg>`;

const SERVICE_ICONS = {
  person: `<circle cx="12" cy="8" r="3.6"/><path d="M4.8 20.5c0-3.6 3.2-6.2 7.2-6.2s7.2 2.6 7.2 6.2" stroke-linecap="round"/>`,
  couple: `<circle cx="8.4" cy="8.4" r="3.1"/><circle cx="16.2" cy="9.2" r="2.6"/><path d="M2.8 20c0-3.2 2.5-5.5 5.6-5.5s5.6 2.3 5.6 5.5" stroke-linecap="round"/><path d="M15 14.8c3 0 6.2 1.9 6.2 5.2" stroke-linecap="round"/>`,
  rings: `<circle cx="9" cy="14" r="5.4"/><circle cx="15.4" cy="14" r="5.4"/><path d="M12.2 4.6 10 7.4h4.6L12.2 4.6Z"/>`,
  calendar: `<rect x="3.6" y="5.4" width="16.8" height="15" rx="2.6"/><path d="M3.6 10.2h16.8M8.4 3.4v3.6M15.6 3.4v3.6" stroke-linecap="round"/><path d="m9.4 14.8 1.8 1.8 3.6-3.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  clock: `<circle cx="12" cy="12" r="8.6"/><path d="M12 7v5.4l3.4 2" stroke-linecap="round" stroke-linejoin="round"/>`,
  globe: `<circle cx="12" cy="12" r="8.6"/><path d="M3.6 12h16.8" stroke-linecap="round"/><path d="M12 3.4c2.3 2.4 3.5 5.4 3.5 8.6S14.3 18.2 12 20.6c-2.3-2.4-3.5-5.4-3.5-8.6S9.7 5.8 12 3.4Z"/>`,
};

export const serviceIcon = (name, cls = "h-6 w-6") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" class="${cls}" aria-hidden="true">${SERVICE_ICONS[name]}</svg>`;

export const whatsappIcon = (cls = "h-4 w-4") =>
  `<svg viewBox="0 0 24 24" fill="currentColor" class="${cls}" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09 0 1.23.9 2.42 1.02 2.59.12.16 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.19-.06-.11-.22-.17-.47-.29Z"/></svg>`;

export const checkIcon = (cls = "h-4 w-4") =>
  `<svg viewBox="0 0 20 20" fill="none" class="${cls}" aria-hidden="true"><path d="m4 10.5 4 4 8-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ------------------------------------------------------------------ *
 * Buttons and headings
 * ------------------------------------------------------------------ */

const BTN_BASE =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition duration-200";
const BTN_VARIANT = {
  primary: "bg-sage-deep text-white shadow-sm shadow-sage-deep/20 hover:bg-sage-dark",
  outline: "border border-sage-deep/35 text-sage-dark hover:border-sage-deep hover:bg-sage-mist",
  light: "bg-white text-sage-dark shadow-sm hover:bg-sage-mist",
  onDark: "border border-white/30 text-white hover:bg-white/10",
};
const BTN_SIZE = { md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-[0.9375rem]" };

export function button(label, href, { variant = "primary", size = "md", extra = "" } = {}) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const attrs = external && href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${esc(href)}"${attrs} class="${BTN_BASE} ${BTN_VARIANT[variant]} ${BTN_SIZE[size]} ${extra}">${label}</a>`;
}

export function sectionHeading({ eyebrow, title, intro, align = "left", as = "h2" }) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "items-start";
  const size =
    as === "h1"
      ? "text-[2.6rem] leading-[1.08] sm:text-6xl"
      : "text-[2.1rem] leading-[1.12] sm:text-[2.75rem]";
  return `<div class="flex flex-col gap-4 ${alignment}">
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
    <${as} class="font-display text-ink ${size}">${title}</${as}>
    ${intro ? `<div class="max-w-2xl text-[1.0625rem] leading-[1.75] text-ink-soft ${align === "center" ? "mx-auto" : ""}">${intro}</div>` : ""}
  </div>`;
}

/** Photography slot — mirrors PortraitFrame.tsx, including the placeholder. */
export function portrait({ src = null, alt, aspect = "aspect-[4/5]", label = "Portrait", extra = "" }) {
  if (src) {
    return `<div class="relative overflow-hidden rounded-[2.5rem] ${aspect} ${extra}">
      <img src="${esc(src)}" alt="${esc(alt)}" class="absolute inset-0 h-full w-full object-cover" loading="lazy"/>
    </div>`;
  }
  return `<div class="relative overflow-hidden rounded-[2.5rem] border border-sage/25 bg-gradient-to-br from-sage-mist via-cream-deep to-sage-soft ${aspect} ${extra}" role="img" aria-label="${esc(alt)}">
    ${leafBranch("absolute -left-6 bottom-0 h-3/4 w-32 text-sage/30")}
    ${leafBranch("absolute -right-8 -top-4 h-2/3 w-28 rotate-180 text-sage/25")}
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
      ${headOutline("h-32 w-auto text-sage-deep/40")}
      <p class="text-[0.625rem] uppercase tracking-[0.24em] text-sage-deep/60">${esc(label)}</p>
    </div>
  </div>`;
}

export const quietExit = () => `
<button type="button" data-quick-exit
  title="Leaves this site immediately and removes it from your back button. Shortcut: press Escape three times."
  class="fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-line bg-white/95 px-4 py-2.5 text-xs font-medium text-ink-soft shadow-lg shadow-ink/5 backdrop-blur transition hover:border-sage-deep/50 hover:bg-sage-mist md:bottom-6">
  <svg viewBox="0 0 24 24" fill="none" class="h-3.5 w-3.5" aria-hidden="true"><path d="M14 4h5v16h-5M13 12H3m0 0 4-4m-4 4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  Quick exit
</button>`;

export const currencyToggle = (extra = "") => `
<div class="inline-flex items-center gap-0.5 rounded-full border border-line bg-white/70 p-1 ${extra}" role="group" aria-label="Display fees in">
  ${[["NGN", "₦", "Naira"], ["GBP", "£", "Pounds"], ["USD", "$", "Dollars"]]
    .map(
      ([code, symbol, name]) =>
        `<button type="button" data-currency="${code}" title="Show fees in ${name}" class="rounded-full px-2.5 py-1 text-xs font-medium transition"><span aria-hidden="true">${symbol}</span><span class="sr-only">${name}</span></button>`,
    )
    .join("")}
</div>`;

/** A fee value the currency switcher rewrites at runtime. */
export const price = (key, extra = "") => `<span data-price="${key}" class="${extra}"></span>`;

export const trustBar = () => `
<section class="border-y border-line bg-cream-deep" aria-label="Credentials">
  <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-3 px-6 py-7 lg:px-8">
    ${trustItems.map((item) => `<span class="rounded-full border border-line bg-white/70 px-4 py-2 text-xs text-ink-soft">${esc(item)}</span>`).join("")}
  </div>
</section>`;

export const letterSignup = () => `
<form class="js-subscribe" novalidate>
  <div class="flex flex-col gap-3 sm:flex-row">
    <input name="email" type="email" required autocomplete="email" placeholder="you@example.com" aria-label="Email address"
      class="w-full rounded-full border border-line bg-cream px-6 py-3.5 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:border-sage focus:outline-none"/>
    <button type="submit" class="shrink-0 rounded-full bg-sage-deep px-7 py-3.5 text-sm font-medium text-white transition hover:bg-sage-dark">Send me the letter</button>
  </div>
  <p class="js-status mt-4 text-sm leading-6" role="status"></p>
  <p class="mt-4 text-xs leading-5 text-muted">One email a month. No sequences, no upsells, unsubscribe in one click.</p>
</form>`;

/* ------------------------------------------------------------------ *
 * Page shell
 * ------------------------------------------------------------------ */

function header(current) {
  const isActive = (href) => current === href || (href !== "/" && current.startsWith(href));
  return `
<header class="sticky top-0 z-50 border-b border-line/70 bg-cream/85 backdrop-blur-xl">
  <div class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
    <a href="/" class="flex items-center gap-3" aria-label="${esc(practitioner.shortName)} — home">
      ${psiBadge("h-9 w-9 shrink-0 text-sage-deep")}
      <span class="flex flex-col leading-tight">
        <span class="font-display text-xl text-ink">${esc(practitioner.logoName)}</span>
        <span class="text-[0.6rem] uppercase tracking-[0.24em] text-muted">${esc(practitioner.logoCredential)}</span>
      </span>
    </a>
    <nav class="hidden items-center gap-7 lg:flex" aria-label="Primary">
      ${siteNav
        .map(
          (item) =>
            `<a href="${item.href}"${isActive(item.href) ? ' aria-current="page"' : ""} class="relative py-1 text-sm transition ${
              isActive(item.href)
                ? "text-sage-dark after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-sage-deep"
                : "text-ink-soft hover:text-sage-dark"
            }">${esc(item.label)}</a>`,
        )
        .join("")}
    </nav>
    <div class="hidden items-center gap-3 lg:flex">
      ${currencyToggle()}
      <a href="/contact" class="rounded-full bg-sage-deep px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-sage-deep/20 transition hover:bg-sage-dark">Book a conversation</a>
    </div>
    <button type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav"
      class="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition hover:border-sage-deep/50 hover:bg-sage-mist lg:hidden">
      <span data-menu-label>Menu</span><span aria-hidden="true" class="text-xs" data-menu-icon>☰</span>
    </button>
  </div>
  <div id="mobile-nav" hidden class="border-t border-line bg-cream px-6 pb-6 pt-4 lg:hidden">
    <nav class="flex flex-col gap-1" aria-label="Mobile">
      ${siteNav
        .map(
          (item) =>
            `<a href="${item.href}" class="rounded-2xl px-4 py-3 text-base transition ${
              isActive(item.href) ? "bg-sage-mist text-sage-dark" : "text-ink-soft hover:bg-sage-mist/70"
            }">${esc(item.label)}</a>`,
        )
        .join("")}
      <a href="/contact" class="rounded-2xl px-4 py-3 text-base text-ink-soft transition hover:bg-sage-mist/70">Contact</a>
    </nav>
    <div class="mt-5 flex items-center justify-between border-t border-line pt-5">
      <span class="text-xs uppercase tracking-[0.2em] text-muted">Show fees in</span>
      ${currencyToggle()}
    </div>
  </div>
</header>
<div class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur-xl md:hidden">
  <a href="/contact" class="mx-auto flex max-w-md items-center justify-center rounded-full bg-sage-deep px-5 py-3.5 text-sm font-medium text-white shadow-lg shadow-sage-deep/20 transition hover:bg-sage-dark">Book a free conversation</a>
</div>`;
}

function footer() {
  const columns = [
    ["Work With Me", footerSections.work],
    ["Learn", footerSections.learn],
    ["More", footerSections.more],
  ];
  return `
<footer class="relative overflow-hidden border-t border-sage-dark/20 bg-sage-dark text-sage-soft">
  ${leafBranch("pointer-events-none absolute -left-16 top-10 h-72 w-44 text-white/[0.07]")}
  <div class="pointer-events-none absolute -right-10 top-1/4 hidden lg:block" aria-hidden="true">${psiBadge("h-64 w-64 text-white/[0.05]")}</div>
  <div class="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1.6fr] lg:px-8 lg:py-20">
    <div class="space-y-5">
      <div class="flex items-center gap-3">${psiBadge("h-10 w-10 text-sage-soft")}<span class="font-display text-2xl text-white">${esc(practitioner.logoName)}</span></div>
      <p class="text-sm leading-7 text-sage-soft/85">${esc(practitioner.fullName)} — psychotherapist, founder of the Activator Coaching Academy, and co-author of <em>The ABC of Marriage</em>.</p>
      <div class="space-y-1.5 text-sm text-sage-soft/75"><p>${esc(contactDetails.location)}</p><p>${esc(contactDetails.reach)}</p></div>
      <div class="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a href="mailto:${contactDetails.email}" class="underline-offset-4 hover:text-white hover:underline">${contactDetails.email}</a>
        <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="underline-offset-4 hover:text-white hover:underline">WhatsApp</a>
        <a href="${contactDetails.instagramUrl}" target="_blank" rel="noopener noreferrer" class="underline-offset-4 hover:text-white hover:underline">${contactDetails.instagram}</a>
      </div>
    </div>
    <div class="grid gap-10 sm:grid-cols-3">
      ${columns
        .map(
          ([heading, items]) => `<div>
        <h2 class="mb-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-white/70">${heading}</h2>
        <ul class="space-y-3 text-sm text-sage-soft/80">${items.map((i) => `<li><a href="${i.href}" class="transition hover:text-white">${esc(i.label)}</a></li>`).join("")}</ul>
      </div>`,
        )
        .join("")}
    </div>
  </div>
  <div class="relative border-t border-white/10 px-6 py-8 lg:px-8">
    <div class="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p class="max-w-2xl text-sm leading-6 text-sage-soft/70">This practice is not an emergency service. If you or someone you know is in immediate danger or at risk of harm, please contact emergency services or a crisis line now.</p>
      <a href="/crisis" class="shrink-0 rounded-full border border-white/25 px-5 py-2.5 text-sm text-white transition hover:bg-white/10">Crisis resources →</a>
    </div>
    <div class="mx-auto mt-8 flex max-w-7xl flex-col gap-3 text-xs text-sage-soft/50 sm:flex-row sm:items-center sm:justify-between">
      <p>© ${new Date().getFullYear()} ${esc(practitioner.shortName)}. All rights reserved.</p>
      <div class="flex gap-5"><a href="/privacy" class="transition hover:text-white">Privacy &amp; confidentiality</a><span>Website by OctaveDev</span></div>
    </div>
  </div>
</footer>`;
}

export function layout({ path, title, description, body, extraHead = "", bodyScripts = "" }) {
  const fullTitle = path === "/" ? title : `${title} | ${practitioner.shortName}`;
  return `<!doctype html>
<html lang="en" class="h-full">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}"/>
<link rel="canonical" href="${esc(path)}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${esc(fullTitle)}"/>
<meta property="og:description" content="${esc(description)}"/>
<meta property="og:site_name" content="${esc(practitioner.shortName)}"/>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap"/>
<link rel="stylesheet" href="/assets/styles.css"/>
<link rel="stylesheet" href="/assets/site.css"/>
${extraHead}
</head>
<body class="flex min-h-full min-h-screen flex-col bg-cream text-ink">
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-sage-deep focus:px-5 focus:py-3 focus:text-sm focus:text-white">Skip to content</a>
${header(path)}
<main id="main" class="flex-1 pb-24 md:pb-0">
${body}
</main>
${footer()}
<script src="/assets/data.js" defer></script>
<script src="/assets/main.js" defer></script>
${bodyScripts}
</body>
</html>`;
}
