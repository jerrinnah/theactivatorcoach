import type { MetadataRoute } from "next";
import { articles } from "@/lib/insights";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laurettaogbum.com";

const staticRoutes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "yearly" },
  { path: "/work-with-me", priority: 0.9, changeFrequency: "monthly" },
  { path: "/individual-therapy", priority: 0.8, changeFrequency: "yearly" },
  { path: "/couples-therapy", priority: 0.8, changeFrequency: "yearly" },
  { path: "/before-you-marry", priority: 0.8, changeFrequency: "yearly" },
  { path: "/annual-review", priority: 0.7, changeFrequency: "yearly" },
  { path: "/the-intensive", priority: 0.7, changeFrequency: "yearly" },
  { path: "/diaspora", priority: 0.8, changeFrequency: "yearly" },
  { path: "/self-audit", priority: 0.9, changeFrequency: "yearly" },
  { path: "/relational-risk-assessment", priority: 0.9, changeFrequency: "yearly" },
  { path: "/insights", priority: 0.8, changeFrequency: "monthly" },
  { path: "/academy", priority: 0.7, changeFrequency: "monthly" },
  { path: "/books", priority: 0.6, changeFrequency: "yearly" },
  { path: "/speaking", priority: 0.7, changeFrequency: "yearly" },
  { path: "/letter", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
  { path: "/crisis", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...articles.map((article) => ({
      url: `${BASE_URL}/insights/${article.slug}`,
      lastModified: new Date(`${article.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
