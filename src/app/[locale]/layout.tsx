import type { Metadata, Viewport } from "next";
import {
  Aref_Ruqaa,
  Caveat,
  Dancing_Script,
  Gochi_Hand,
  IBM_Plex_Sans_Arabic,
  Inter,
  Jersey_15,
  Marhey,
  Space_Mono,
} from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { PostHogProvider } from "@/providers/PostHogProvider";
import { routing } from "@/i18n/routing";

// Headlines + body.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Handwriting: Gochi Hand for longer notes, Caveat for small scribbles.
const gochi = Gochi_Hand({
  variable: "--font-gochi",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

// Joined-up script for the hero name (written in by .write-* in globals.css).
const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: "700",
});

// Pixel display face.
const jersey = Jersey_15({
  variable: "--font-jersey",
  subsets: ["latin"],
  weight: "400",
});

// Typewriter labels.
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Arabic faces. Not preloaded: they're only fetched when Arabic text renders.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

const marhey = Marhey({
  variable: "--font-marhey",
  subsets: ["arabic"],
  preload: false,
});

const arefRuqaa = Aref_Ruqaa({
  variable: "--font-ruqaa",
  subsets: ["arabic"],
  weight: ["400", "700"],
  preload: false,
});

const fontVariables = [
  inter,
  gochi,
  caveat,
  dancing,
  jersey,
  spaceMono,
  plexArabic,
  marhey,
  arefRuqaa,
]
  .map((font) => font.variable)
  .join(" ");

// Pre-renders /en, /fr and /ar at build time instead of on demand.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  // Lets the relative canonical/hreflang URLs in each page resolve to absolute ones.
  metadataBase: new URL("https://achrafessaoudi.com"),
  authors: [{ name: "Achraf Essaoudi" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfaf6",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opts this layout into static rendering for the given locale.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      // Font variables live on <html> so the stacks in globals.css can use them.
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
        >
          <PostHogProvider>
            <NextIntlClientProvider>
              {/* The sheet of paper. Edge to edge on phones, floating on the desk above. */}
              <main
                data-sheet
                className="sheet relative mx-auto min-h-screen w-full max-w-[1240px] overflow-x-clip sm:my-4 sm:w-[calc(100%-2rem)] md:my-8 md:w-[calc(100%-4rem)]"
              >
                {children}
              </main>
              <Toaster
                theme="light"
                position="bottom-right"
                toastOptions={{
                  className:
                    "rounded-md! border-2! border-ink! bg-paper! font-mono! text-ink! shadow-[4px_4px_0_var(--ink)]!",
                }}
              />
            </NextIntlClientProvider>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
