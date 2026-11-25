/** Bookable packages — mirrors src/components/PackagesSection.tsx. */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc, button, sectionHeading, checkIcon } from "./template.mjs";

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "lib") + path.sep;
const { packagesContent: copy, bookablePackages, bookingLink, formatPackagePrice, packageForService } =
  await import(SRC + "packages.ts");

export { packageForService, bookingLink, copy as packagesCopy };

const packageCard = (pkg, heading) => {
  const booking = bookingLink(pkg);
  return `<article class="flex flex-col rounded-4xl border border-line bg-white p-8">
  <p class="eyebrow">${esc(pkg.audience)}</p>
  <${heading} class="mt-4 font-display text-[1.75rem] leading-tight text-ink">${esc(pkg.name)}</${heading}>
  <p class="mt-4 text-[0.9375rem] leading-7 text-muted">${esc(pkg.summary)}</p>
  <ul class="mt-6 flex-1 space-y-3">${pkg.includes.map((item) => `<li class="flex gap-3 text-sm leading-6 text-ink-soft">${checkIcon("mt-1 h-4 w-4 shrink-0 text-sage-deep")}${esc(item)}</li>`).join("")}</ul>
  <div class="mt-8 border-t border-line-soft pt-6">
    <p class="font-display text-4xl text-sage-dark">${esc(formatPackagePrice(pkg))}</p>
    ${button(esc(booking.label), booking.href, { size: "lg", extra: "mt-6 w-full" })}
    ${pkg.servicePath ? `<a href="${esc(pkg.servicePath)}" class="mt-4 block text-center text-sm text-sage-deep underline-offset-4 hover:underline">${esc(copy.learnMoreLabel)} →</a>` : ""}
  </div>
</article>`;
};

/** The packages grid, on the home and Work With Me pages. */
export const packagesSection = ({ heading = "h3", extra = "bg-cream" } = {}) => `
<section id="book" class="scroll-mt-28 ${extra}"><div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
  ${sectionHeading({ eyebrow: esc(copy.eyebrow), title: esc(copy.title), intro: esc(copy.intro) })}
  <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${bookablePackages.map((pkg) => packageCard(pkg, heading)).join("")}</div>
  <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
    <p class="max-w-2xl text-sm leading-6 text-muted">${esc(copy.paymentNote)}</p>
    ${button(esc(copy.introCta.label), copy.introCta.href, { variant: "outline" })}
  </div>
</div></section>`;

/** "Book and pay online" panel beside a service page's fees. */
export const servicePackagePanel = (pkg) => {
  const booking = bookingLink(pkg);
  return `<div class="mt-6 rounded-3xl bg-sage-mist p-6">
  <p class="text-xs uppercase tracking-[0.16em] text-sage-deep">${esc(copy.servicePanelEyebrow)}</p>
  <p class="mt-2 font-display text-2xl text-ink">${esc(pkg.name)}</p>
  <p class="mt-1 text-sm text-muted">${esc(pkg.includes.join(" · "))}</p>
  <div class="mt-5 flex flex-wrap items-center justify-between gap-4">
    <span class="font-display text-3xl text-sage-dark">${esc(formatPackagePrice(pkg))}</span>
    ${button(esc(booking.label), booking.href)}
  </div>
</div>`;
};
