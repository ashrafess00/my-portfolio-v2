import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookiesStore = await cookies();
  let locale = cookiesStore.get("lang")?.value || "en";

  if (locale !== "en" && locale !== "ar" && locale !== "fr") {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
