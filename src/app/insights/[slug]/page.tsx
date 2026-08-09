import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import LetterSignup from "@/components/LetterSignup";
import { ButtonLink } from "@/components/ui/Button";
import { LeafBranch } from "@/components/ui/Ornaments";
import { articles, formatArticleDate, getArticle } from "@/lib/insights";
import { practitioner } from "@/lib/siteData";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const related = articles
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 2);
  const fallback = articles.filter((item) => item.slug !== article.slug).slice(0, 2);
  const suggestions = related.length > 0 ? related : fallback;

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-line bg-cream-deep">
          <LeafBranch className="pointer-events-none absolute -right-10 -top-6 h-72 w-40 rotate-12 text-sage/20" />
          <div className="relative mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
            <Link
              href="/insights"
              className="text-sm text-muted underline-offset-4 transition hover:text-sage-deep hover:underline"
            >
              ← All insights
            </Link>
            <p className="eyebrow mt-8">{article.category}</p>
            <h1 className="mt-4 font-display text-[2.5rem] leading-[1.08] text-ink sm:text-[3.25rem]">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-[1.8] text-ink-soft">{article.excerpt}</p>
            <p className="mt-8 text-sm text-muted">
              {practitioner.shortName} · {formatArticleDate(article.date)} ·{" "}
              {article.readingMinutes} min read
            </p>
          </div>
        </header>

        <div className="bg-cream">
          <div className="mx-auto max-w-3xl px-6 py-14 lg:px-8 lg:py-16">
            <ArticleBody blocks={article.body} />

            <div className="mt-14 rounded-4xl bg-sage-mist p-8 sm:p-10">
              <h2 className="font-display text-[1.75rem] leading-snug text-ink">
                If any of this landed, it is worth a conversation.
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">
                Fifteen minutes, no charge, no obligation, and nothing goes on record.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Book a free conversation</ButtonLink>
                <ButtonLink href="/self-audit" variant="outline">
                  Take the Self-Audit
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-cream-deep">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
          <h2 className="font-display text-3xl text-ink">Read next</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {suggestions.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="group flex flex-col rounded-4xl border border-line bg-white p-8 transition hover:border-sage/50 hover:shadow-lg hover:shadow-sage-deep/8"
              >
                <span className="inline-flex w-fit rounded-full bg-sage-mist px-3 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-sage-deep">
                  {item.category}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-snug text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">{item.excerpt}</p>
                <span className="mt-5 text-sm text-sage-deep transition group-hover:translate-x-0.5">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <div className="rounded-4xl border border-line bg-white p-8 sm:p-10">
            <p className="eyebrow">The Activator Letter</p>
            <h2 className="mt-3 font-display text-3xl text-ink">One letter a month. No noise.</h2>
            <div className="mt-6">
              <LetterSignup />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
