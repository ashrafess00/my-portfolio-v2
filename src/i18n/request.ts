import { getRequestConfig } from "next-intl/server";
import { hasLocale, type AbstractIntlMessages } from "next-intl";
import { routing } from "./routing";

// Recursively fills gaps in `override` from `base`. Translation files are not
// all complete (fr.json has no ProjectsPage yet), and without this a missing
// namespace makes t.raw() return undefined and the page throw at render.
function withFallback(
  base: AbstractIntlMessages,
  override: AbstractIntlMessages,
): AbstractIntlMessages {
  const merged: AbstractIntlMessages = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const fallbackValue = merged[key];
    merged[key] =
      isMessageObject(value) && isMessageObject(fallbackValue)
        ? withFallback(fallbackValue, value)
        : value;
  }

  return merged;
}

function isMessageObject(value: unknown): value is AbstractIntlMessages {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Comes from the [locale] URL segment now, not a cookie.
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages: AbstractIntlMessages = (
    await import(`../../messages/${locale}.json`)
  ).default;

  if (locale === routing.defaultLocale) {
    return { locale, messages };
  }

  const fallbackMessages: AbstractIntlMessages = (
    await import(`../../messages/${routing.defaultLocale}.json`)
  ).default;

  return { locale, messages: withFallback(fallbackMessages, messages) };
});
