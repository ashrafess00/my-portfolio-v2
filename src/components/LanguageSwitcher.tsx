"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useLocale } from "next-intl";
import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const languages: {
  code: Locale;
  label: string;
  full: string;
}[] = [
  { code: "en", label: "EN", full: "English" },
  { code: "ar", label: "ع", full: "العربية" },
  { code: "fr", label: "FR", full: "Français" },
];

const LanguageSwitcher = () => {
  const active = useLocale() as Locale;
  const router = useRouter();
  // Locale-free ("/projects"), so switching only swaps the prefix.
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && itemsRef.current) {
      gsap.fromTo(
        itemsRef.current.children,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.04, ease: "power2.out" },
      );
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const currentLang = languages.find((l) => l.code === active) ?? languages[0];

  const handleLanguageChange = (code: Locale) => {
    setOpen(false);
    router.replace(pathname, { locale: code });
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={currentLang.full}
        className="inline-flex h-9 items-center gap-1.5 rounded-[4px] border-2 border-ink bg-paper px-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-sun"
      >
        <Globe aria-hidden className="h-3.5 w-3.5" strokeWidth={2.2} />
        <span lang={currentLang.code}>{currentLang.label}</span>
        <ChevronDown
          aria-hidden
          className={cn("h-3 w-3 transition-[rotate]", open && "rotate-180")}
          strokeWidth={2.6}
        />
      </button>

      {open && (
        <div
          ref={itemsRef}
          role="menu"
          className="absolute end-0 top-full z-50 mt-2 min-w-[170px] rounded-md border-2 border-ink bg-paper p-1 shadow-[4px_4px_0_var(--ink)]"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="menuitem"
              lang={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                "flex w-full items-center gap-3 rounded-[3px] px-3 py-2 text-start text-ink transition-colors",
                active === lang.code ? "bg-sun" : "hover:bg-sun/40",
              )}
            >
              <span className="w-6 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
                {lang.label}
              </span>
              <span className="text-[13px]">{lang.full}</span>
              {active === lang.code && (
                <Check aria-hidden className="ms-auto h-3.5 w-3.5" strokeWidth={2.6} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
