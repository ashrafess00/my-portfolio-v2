import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { setCookie } from "@/lib/actions";

const languages: {
  code: "en" | "ar" | "dr" | "fr";
  label: string;
  full: string;
}[] = [
  { code: "en", label: "EN", full: "English" },
  { code: "ar", label: "ع", full: "العربية" },
  { code: "fr", label: "FR", full: "Français" },
];

const LanguageSwitcher = () => {
  const [active, setActive] = useState<"en" | "ar" | "dr" | "fr">("en");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && itemsRef.current) {
      const items = itemsRef.current.children;
      gsap.fromTo(
        items,
        { opacity: 0, y: -8, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25,
          stagger: 0.05,
          ease: "back.out(1.4)",
        },
      );
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const getLangFromCookie = (): "en" | "ar" | "dr" | "fr" | null => {
      const match = document.cookie.match(/(?:^|; )lang=([^;]*)/);
      return match
        ? (decodeURIComponent(match[1]) as "en" | "ar" | "dr" | "fr")
        : null;
    };
    const langCode = getLangFromCookie();
    if (langCode) {
      const found = languages.find((lang) => lang.code === langCode);
      if (found) setActive(found.code as "en" | "ar" | "dr" | "fr");
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === active)!;

  console.log("currentLang", currentLang);

  const handleLanguageChange = (lang: "en" | "ar" | "dr" | "fr") => {
    setActive(lang);
    setCookie("lang", lang);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm bg-secondary/50 hover:border-primary/50 hover:bg-secondary transition-all duration-300"
      >
        <span className="font-display text-xs tracking-[0.15em] uppercase text-foreground group-hover:text-primary transition-colors duration-300">
          {currentLang.label}
        </span>
        <span
          className={`w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[140px] border border-border bg-card/95 backdrop-blur-md rounded-sm overflow-hidden z-50">
          <div ref={itemsRef}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  // setActive(lang.code);
                  // setOpen(false);
                  handleLanguageChange(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-200 hover:bg-secondary/80 ${
                  active === lang.code
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-display text-xs tracking-[0.15em] uppercase w-6">
                  {lang.label}
                </span>
                <span className="font-body text-xs text-inherit">
                  {lang.full}
                </span>
                {active === lang.code && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
