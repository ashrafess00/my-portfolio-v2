import { routing } from "@/i18n/routing";

/**
 * Canonical + hreflang alternates for a locale-free path ("/" or "/projects").
 * Returned URLs are relative and resolve against the `metadataBase` set in the
 * locale layout. Every page must declare its own, otherwise it inherits the
 * layout's and each locale ends up claiming the same canonical URL.
 */
export function localeAlternates(locale: string, path: string) {
  const suffix = path === "/" ? "" : path;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `/${l}${suffix}`;
  }
  // Tells Google which version to show when no hreflang matches the user.
  languages["x-default"] = `/${routing.defaultLocale}${suffix}`;

  return {
    canonical: `/${locale}${suffix}`,
    languages,
  };
}
