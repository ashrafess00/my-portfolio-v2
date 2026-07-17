import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    key: "frontend",
    numeral: "i",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    key: "backend",
    numeral: "ii",
    items: ["Laravel", "Node.js", "Django", "REST APIs", "GraphQL", "PostgreSQL"],
  },
  {
    key: "tools",
    numeral: "iii",
    items: ["Git", "Docker", "CI/CD", "Vercel", "Hostinger", "n8n"],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("HomePage.skillsSection");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-item").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative border-b border-hairline bg-surface/30">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="reveal-item flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="font-serif italic text-accent">03</span>
          <span className="h-px w-8 bg-rule" />
          <span>{t("sectionLabel")}</span>
        </div>

        <h2 className="reveal-item mt-8 max-w-3xl font-serif text-[32px] font-light leading-[1.1] tracking-[-0.015em] text-foreground text-balance sm:text-[42px]">
          {t("titleLine1")}{" "}
          <em className="italic text-accent-warm">{t("titleLine2")}</em>
        </h2>

        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-hairline bg-hairline md:grid-cols-3">
          {skills.map((s) => (
            <li
              key={s.key}
              className="reveal-item relative flex flex-col gap-5 bg-background p-8 transition-colors hover:bg-surface"
            >
              <span className="pointer-events-none absolute left-0 top-0 h-px w-8 bg-accent/60" />
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-[15px] italic text-accent">
                  {s.numeral}.
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                  {s.items.length} tools
                </span>
              </div>
              <div className="font-serif text-[24px] font-light leading-none tracking-tight text-foreground">
                {t(`categories.${s.key}`)}
              </div>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-rule px-3 py-1 text-[11px] tracking-wide text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default SkillsSection;
