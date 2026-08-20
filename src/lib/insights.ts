import insights from "../../content/insights.json" with { type: "json" };

export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  featured?: boolean;
  /**
   * Lightweight block markup. A line starting with `## ` is a subheading,
   * `> ` is a pull quote, and `- ` is a list item. Everything else is a paragraph.
   */
  body: string[];
}

export const categories: string[] = insights.categories;

export const articles: Article[] = insights.articles as Article[];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export const featuredArticles = sortedArticles.filter((article) => article.featured);

export function formatArticleDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
