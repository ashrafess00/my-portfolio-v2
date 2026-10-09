import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://achrafessaoudi.com";

// Locale-free paths; every one is emitted once per locale.
const pages = [
  { path: "", priority: 1 },
  { path: "/projects", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      // Mirrors the hreflang tags on the pages themselves — Google wants both.
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}${path}`]),
        ),
      },
    })),
  );
}
