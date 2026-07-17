import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

const SECTIONS = ["about", "projects", "skills", "contact"];

const Navbar = () => {
  const [active, setActive] = useState("");
  const t = useTranslations("Navigation");
  const ti = useTranslations("HomePage.introSection");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-rule font-serif text-[13px] italic text-foreground">
            ae
          </span>
          <span className="hidden text-[13px] tracking-wide text-muted-foreground sm:inline">
            Achraf Essaoudi
          </span>
        </button>

        <nav className="hidden items-center gap-9 text-[13px] text-muted-foreground md:flex">
          {SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`transition-colors hover:text-foreground ${
                active === id ? "text-accent" : ""
              }`}
            >
              {t(id)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("contact")}
            className="group hidden items-center gap-2 rounded-full border border-rule px-4 py-2 text-[12px] tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {ti("available")}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
