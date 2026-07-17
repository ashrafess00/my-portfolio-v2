import type { Metadata, Viewport } from "next";
import { Geist_Mono, Fraunces, Inter } from "next/font/google";
import "./globals.css";
// import Navigation from "@/components/Navigation";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { PostHogProvider } from "@/providers/PostHogProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif display face — variable, with optical sizing + italics.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Achraf Essaoudi — Full Stack Developer & Web Builder",
  description:
    "I design and build fast, friendly websites and web apps for real businesses — from booking-ready sites for hotels and restaurants to custom platforms. Let's build yours.",
  keywords: ["portfolio", "full stack developer", "web development", "Next.js", "Laravel", "React", "Morocco"],
  authors: [{ name: "Achraf Essaoudi" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030f18",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let locale = await getLocale();

  if (locale !== "en" && locale !== "ar" && locale !== "fr") {
    locale = "en";
  }

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
        >
          <PostHogProvider>
            <NextIntlClientProvider>
              {/* <Navigation /> */}
              <main className="min-h-screen relative">{children}</main>
              <Toaster theme="dark" position="bottom-right" richColors />
            </NextIntlClientProvider>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
