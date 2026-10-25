import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/siteUrl";


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
  { path: "/books", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  ];
}
