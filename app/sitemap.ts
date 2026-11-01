import type { MetadataRoute } from "next";
import { publicProjects } from "@/content/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: 0.9 },
    ...publicProjects.map((project) => ({ url: `${siteUrl}/work/${project.slug}`, changeFrequency: "yearly" as const, priority: project.visibility === "featured" ? 0.75 : 0.55 })),
  ];
  return pages;
}
