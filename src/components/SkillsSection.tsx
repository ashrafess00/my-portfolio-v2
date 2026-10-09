"use client";

import { useRef, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { CheckDoodle, Squiggle } from "@/components/notebook/Doodles";
import { SectionHeading } from "@/components/notebook/SectionHeading";
import { Tape, type TapeColor } from "@/components/notebook/Tape";
import { withEmoji } from "@/components/notebook/withEmoji";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

const skills: {
  key: string;
  note: string;
  tilt: string;
  tape: TapeColor;
  items: string[];
}[] = [
  {
    key: "frontend",
    note: "var(--cream)",
    tilt: "-rotate-2",
    tape: "pink",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    key: "backend",
    note: "var(--mint)",
    tilt: "rotate-[1.5deg]",
    tape: "yellow",
    items: ["Laravel", "Node.js", "Django", "REST APIs", "GraphQL", "PostgreSQL"],
  },
  {
    key: "tools",
    note: "var(--blush)",
    tilt: "-rotate-1",
    tape: "blue",
    items: ["Git", "Docker", "CI/CD", "Vercel", "Hostinger", "n8n"],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("HomePage.skillsSection");

  useReveal(sectionRef);

  return (
    <section ref={sectionRef} className="relative px-4 pb-20 pt-10 sm:px-8 md:pb-28 md:pt-14">
      <SectionHeading
        note={t("note")}
        label={t("sectionLabel")}
        title={
          <>
            {t("titleLine1")}{" "}
            <span className="marker [--marker:var(--sky)]">{t("titleLine2")}</span>
          </>
        }
      />

      <ul className="mx-auto mt-16 grid max-w-[1080px] grid-cols-1 justify-items-center gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ key, note, tilt, tape, items }) => (
          <li
            key={key}
            data-reveal
            className={cn(
              "sticky-note w-full max-w-[330px] px-7 pb-8 pt-10 transition-[rotate,translate] duration-300 hover:-translate-y-1.5 hover:rotate-0 sm:last:col-span-2 lg:last:col-span-1",
              tilt,
            )}
            style={{ "--note": note } as CSSProperties}
          >
            <Tape color={tape} className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <h3 className="font-hand text-[30px] leading-none text-ink">
              {t(`categories.${key}`)}
            </h3>
            <Squiggle className="mt-2 h-3 w-24 text-tangerine" />
            <ul className="mt-5 space-y-1">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-3 font-hand text-[21px] leading-8 text-ink">
                  <CheckDoodle className="h-6 w-6 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p data-reveal className="mt-14 text-center font-note text-[24px] text-ink-soft -rotate-2">
        {withEmoji(t("aside"))}
      </p>
    </section>
  );
};

export default SkillsSection;
