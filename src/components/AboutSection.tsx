"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/notebook/SectionHeading";
import { Tape } from "@/components/notebook/Tape";
import { withEmoji } from "@/components/notebook/withEmoji";
import { useReveal } from "@/hooks/useReveal";
import { useRuleSnap } from "@/hooks/useRuleSnap";
import { HERO_MOCKUP_IMAGE, PROFILE_IMAGE } from "@/lib/site";
import { cn } from "@/lib/utils";

const STAMPS = [
  { key: "websites", emoji: "🌐", color: "bg-sun text-ink", tilt: "-rotate-2" },
  { key: "webApps", emoji: "⚡", color: "bg-leaf text-ink", tilt: "rotate-1" },
  { key: "dashboards", emoji: "📊", color: "bg-bubblegum text-ink", tilt: "rotate-2" },
  { key: "automation", emoji: "🤖", color: "bg-cobalt text-white", tilt: "-rotate-1" },
] as const;

const Polaroid = ({
  src,
  alt,
  caption,
  className,
  frameClass,
  imageClass,
}: {
  src: string | null;
  alt: string;
  caption: string;
  className?: string;
  frameClass: string;
  imageClass?: string;
}) => (
  <figure
    data-reveal
    className={cn(
      "polaroid relative w-full p-2.5 pb-0 transition-[rotate,translate] duration-300 hover:-translate-y-1 hover:rotate-0",
      className,
    )}
  >
    <Tape color="blue" className="-start-5 -top-1 -rotate-[38deg]" />
    <Tape color="yellow" className="-end-5 -top-1 rotate-[38deg]" />
    <div className={cn("relative overflow-hidden bg-paper-line", frameClass)}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 45vw, 240px"
          className={cn("object-cover", imageClass)}
        />
      )}
    </div>
    <figcaption className="py-2.5 text-center font-note text-[19px] leading-none text-ink-soft">
      {caption}
    </figcaption>
  </figure>
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
  const baselineRef = useRef<HTMLSpanElement>(null);
  const t = useTranslations("HomePage.aboutSection");

  useReveal(sectionRef);
  // Sit the handwriting on the sheet's ruled lines.
  useRuleSnap(noteRef, baselineRef);

  return (
    <section ref={sectionRef} className="relative px-4 pb-20 pt-10 sm:px-8 md:pb-28 md:pt-14">
      <SectionHeading note={t("note")} label={t("label")} />

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 [grid-template-areas:'note_note'_'me_desk'] md:grid-cols-[1fr_minmax(0,600px)_1fr] md:gap-x-10 md:[grid-template-areas:'me_note_desk']">
        <div className="[grid-area:note]">
          <p
            ref={noteRef}
            className="relative mx-auto max-w-[600px] text-center font-hand text-[21px] leading-8 text-ink text-pretty sm:text-[25px]"
          >
            <span ref={baselineRef} aria-hidden className="inline-block h-0 w-0 align-baseline" />
            {withEmoji(t("story"))}
          </p>

          <ul className="mx-auto mt-12 flex max-w-[540px] flex-wrap justify-center gap-x-5 gap-y-4">
            {STAMPS.map(({ key, emoji, color, tilt }) => (
              <li
                key={key}
                data-reveal
                className={cn("hover-wiggle flex items-center gap-1.5", tilt)}
              >
                <span className={cn("stamp px-4 py-2.5 text-[15px] font-semibold tracking-[-0.01em] sm:text-[16px]", color)}>
                  {t(`stamps.${key}`)}
                </span>
                <span aria-hidden className={cn("stamp grid h-11 w-11 place-items-center text-[18px]", color)}>
                  <span className="emoji">{emoji}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center [grid-area:me] md:justify-end md:pt-24">
          <Polaroid
            src={PROFILE_IMAGE}
            alt={t("photoAlt")}
            caption={t("photoCaption")}
            className="max-w-[210px] -rotate-[5deg]"
            frameClass="aspect-[4/5]"
            imageClass="object-[50%_22%]"
          />
        </div>

        <div className="flex items-start justify-center [grid-area:desk] md:justify-start md:-mt-4">
          <Polaroid
            src={HERO_MOCKUP_IMAGE}
            alt={t("deskAlt")}
            caption={t("deskCaption")}
            className="mt-6 max-w-[240px] rotate-[4deg] md:mt-0"
            frameClass="aspect-[5/4]"
            imageClass="object-left-top"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
