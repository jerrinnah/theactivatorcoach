import type { Metadata } from "next";
import Image from "next/image";
import PortraitFrame from "@/components/ui/PortraitFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { booksPage as content } from "@/lib/pageContent";

const { hero, also } = content;

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: {
    title: content.seo.shareTitle,
    description: content.seo.shareDescription,
    ...(hero.cover.image ? { images: [hero.cover.image] } : {}),
  },
};

export default function BooksPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-44 -top-40 h-[36rem] w-[36rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-12 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.5rem]">
                {hero.title}
              </h1>
              <p className="mt-4 text-lg text-sage-deep">{hero.subtitle}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">{hero.byline}</p>

              <div className="mt-7 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
                {hero.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={hero.primaryCta.href} size="lg">
                  {hero.primaryCta.label}
                </ButtonLink>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xs lg:max-w-sm">
              {hero.cover.image ? (
                <Image
                  src={hero.cover.image}
                  alt={hero.cover.alt}
                  width={512}
                  height={768}
                  priority
                  sizes="(min-width: 1024px) 24rem, 20rem"
                  className="w-full rounded-2xl shadow-2xl shadow-sage-deep/25"
                />
              ) : (
                <PortraitFrame
                  src={null}
                  alt={hero.cover.alt}
                  aspect="aspect-[4/5]"
                  label={hero.cover.label}
                  className="shadow-xl shadow-sage-deep/10"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-8 rounded-4xl border border-line bg-white p-8 sm:flex-row sm:items-center sm:p-10">
            <Image
              src={also.cover.image}
              alt={also.cover.alt}
              width={512}
              height={768}
              sizes="10rem"
              className="w-40 shrink-0 rounded-2xl shadow-lg shadow-sage-deep/10"
            />
            <div>
              <p className="eyebrow">{also.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl text-ink">{also.title}</h2>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">{also.byline}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
