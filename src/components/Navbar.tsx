"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Briefcase,
  Diamond,
  Github,
  Heart,
  LayoutGrid,
  Linkedin,
  MessageCircle,
  Star,
  User,
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Smiley } from "@/components/notebook/Doodles";
import { SectionLink, type SectionId } from "@/components/notebook/SectionLink";
import { usePathname } from "@/i18n/navigation";
import { SOCIALS } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV: { id: SectionId; key: string; icon: typeof Star; filled?: boolean }[] = [
  { id: "top", key: "home", icon: Star, filled: true },
  { id: "about", key: "about", icon: User },
  { id: "projects", key: "projects", icon: LayoutGrid },
  { id: "skills", key: "skills", icon: Diamond, filled: true },
];

export const SOCIAL_LINKS = [
  { href: SOCIALS.github, label: "GitHub", icon: Github, color: "bg-sun" },
  { href: SOCIALS.linkedin, label: "LinkedIn", icon: Linkedin, color: "bg-bubblegum" },
  { href: SOCIALS.upwork, label: "Upwork", icon: Briefcase, color: "bg-tangerine" },
  { href: SOCIALS.whatsapp, label: "WhatsApp", icon: MessageCircle, color: "bg-leaf" },
];

const SPY_IDS: SectionId[] = ["top", "about", "projects", "skills", "contact"];

const Navbar = () => {
  const t = useTranslations("Navigation");
  const onHome = usePathname() === "/";
  const [active, setActive] = useState<SectionId | null>(onHome ? "top" : null);

  // Scroll-spy: highlight whichever section crosses the middle of the screen.
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-line bg-paper/95 backdrop-blur-sm">
      <div className="flex h-14 items-stretch justify-between gap-2 px-2 sm:px-4 md:px-5">
        <nav className="flex items-stretch">
          <SectionLink
            id="top"
            label="Achraf Essaoudi"
            className="me-1 grid place-items-center px-1.5 sm:me-2"
          >
            <Smiley className="h-8 w-8 transition-[rotate] duration-300 hover:rotate-[-14deg]" />
          </SectionLink>

          {NAV.map(({ id, key, icon: Icon, filled }) => (
            <SectionLink
              key={id}
              id={id}
              label={t(key)}
              current={active === id}
              className={cn(
                "flex items-center gap-2 px-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors md:px-4",
                active === id ? "bg-sun" : "hover:bg-sun/45",
              )}
            >
              <Icon
                aria-hidden
                className="h-3.5 w-3.5"
                strokeWidth={2.4}
                fill={filled ? "currentColor" : "none"}
              />
              <span className="hidden md:inline">{t(key)}</span>
            </SectionLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <ul className="hidden items-center gap-1.5 lg:flex">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon, color }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full border-[1.5px] border-ink text-ink transition-[rotate,scale] hover:-rotate-12 hover:scale-110",
                    color,
                  )}
                >
                  <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={2.2} />
                </a>
              </li>
            ))}
          </ul>

          <LanguageSwitcher />

          <SectionLink
            id="contact"
            label={t("contact")}
            current={active === "contact"}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-[4px] border-2 border-ink px-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors md:px-3",
              active === "contact"
                ? "bg-ink text-paper"
                : "bg-paper text-ink hover:bg-ink hover:text-paper",
            )}
          >
            <Heart aria-hidden className="h-3.5 w-3.5" fill="currentColor" />
            <span className="hidden sm:inline">{t("contact")}</span>
          </SectionLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
