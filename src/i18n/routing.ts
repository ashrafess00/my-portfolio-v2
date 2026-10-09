import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "ar"],
  defaultLocale: "en",
  // Every locale is prefixed: "/" redirects to "/en".
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
