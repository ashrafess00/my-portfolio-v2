"use client";

import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { SOCIAL_LINKS } from "@/components/Navbar";
import { Smiley } from "@/components/notebook/Doodles";
import { SectionLink, scrollToSection, type SectionId } from "@/components/notebook/SectionLink";
import { withEmoji } from "@/components/notebook/withEmoji";
import { cn } from "@/lib/utils";

const SITEMAP: SectionId[] = ["about", "projects", "skills", "contact"];

const Footer = () => {
  const t = useTranslations("HomePage.contactSection");
  const tn = useTranslations("Navigation");

  const year = new Date().getFullYear();

  return (
    <footer className="relative px-4 pb-8 pt-2 sm:px-8">
      <div aria-hidden className="wavy-rule" />

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
        <div>
          <div className="flex items-center gap-3">
            <Smiley className="h-10 w-10" />
            <span className="font-hand text-[26px] leading-none text-ink">Achraf Essaoudi</span>
          </div>
          <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            {t("footer.role")}
          </p>
        </div>

        <nav aria-label="Sitemap">
          <ul className="space-y-2.5">
            {SITEMAP.map((id) => (
              <li key={id}>
                <SectionLink
                  id={id}
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink underline-offset-[5px] hover:underline hover:decoration-wavy hover:decoration-tangerine"
                >
                  {tn(id)}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ul className="flex gap-2">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon, color }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-ink text-ink transition-[rotate,scale] hover:-rotate-12 hover:scale-110",
                    color,
                  )}
                >
                  <Icon aria-hidden className="h-4 w-4" strokeWidth={2.2} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-paper-line pt-5 sm:flex-row sm:items-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          © {year} Achraf Essaoudi
        </span>
        <span className="font-note text-[20px] leading-tight text-ink-soft">
          {withEmoji(t("footer.madeWith"))}
        </span>
        <button
          type="button"
          onClick={() => scrollToSection("top")}
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-cobalt"
        >
          {t("footer.backToTop")}
          <ArrowUp
            aria-hidden
            className="h-3.5 w-3.5 transition-[translate] group-hover:-translate-y-0.5"
            strokeWidth={2.6}
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
