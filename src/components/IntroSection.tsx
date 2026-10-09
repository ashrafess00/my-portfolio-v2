"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import {
  DoodleArrow,
  Flower,
  GooglyEye,
  HorizonArc,
  ScribbleBox,
  Swoosh,
} from "@/components/notebook/Doodles";
import { scrollToSection } from "@/components/notebook/SectionLink";

// Staggers the CSS entrance animations (see .anim-* in globals.css).
const at = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

const IntroSection = () => {
  const t = useTranslations("HomePage.introSection");

  return (
    <section id="top" className="relative px-4 pb-24 pt-12 sm:px-8 md:pb-32 md:pt-16">
      <h1 className="flex flex-col items-center text-center">
        <span className="anim-rise relative font-note text-[22px] leading-none text-ink-soft md:text-[26px]" style={at(0.05)}>
          {t("myNameIs")}
          <Swoosh
            className="absolute -bottom-3.5 left-1/2 h-3 w-[120%] -translate-x-1/2 text-ink-soft"
            delay={0.3}
          />
        </span>

        {/* Name in a scribbled box, with stickers + tags around it */}
        <span className="relative mt-8 inline-block">
          <span
            className="anim-pop block px-[0.3em] pb-[0.08em] pt-[0.14em] font-pixel text-[clamp(84px,15vw,176px)] leading-[0.8] tracking-[0.02em] text-ink"
            style={at(0.15)}
          >
            ACHRAF
          </span>
          <ScribbleBox
            className="pointer-events-none absolute inset-0 h-full w-full text-tangerine"
            delay={0.45}
          />

          <span
            aria-hidden
            className="anim-pop absolute -top-4 -start-3 rounded-md border-[1.5px] border-ink bg-mint px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink -rotate-6 sm:-start-16 sm:text-[10px]"
            style={at(0.95)}
          >
            {t("stickerBuild")}
          </span>
          <span
            aria-hidden
            className="anim-pop absolute -top-3 -end-3 rounded-md border-[1.5px] border-ink bg-cream px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink rotate-[4deg] sm:-end-20 sm:text-[10px]"
            style={at(1.05)}
          >
            {t("stickerDetail")}
          </span>

          <span
            aria-hidden
            className="anim-pop absolute start-[-0.5rem] top-[calc(100%+4.25rem)] whitespace-nowrap bg-sun px-3 py-0.5 font-note text-[19px] text-ink shadow-[0_2px_0_rgba(28,27,24,0.15)] -rotate-3 sm:start-[-7.5rem] sm:top-[calc(100%+1.6rem)] sm:text-[21px]"
            style={at(1.15)}
          >
            {t("badgeTitle")}
          </span>
          <DoodleArrow
            className="absolute start-[-3.25rem] top-[calc(100%-0.6rem)] hidden h-11 w-12 text-ink sm:block rtl:-scale-x-100"
            delay={1.3}
          />

          <span
            aria-hidden
            className="anim-pop absolute end-[-0.5rem] top-[calc(100%+4.5rem)] whitespace-nowrap bg-mint px-3 py-0.5 font-note text-[19px] text-ink shadow-[0_2px_0_rgba(28,27,24,0.15)] rotate-3 sm:end-[-7rem] sm:top-[calc(100%+1.9rem)] sm:text-[21px]"
            style={at(1.25)}
          >
            {t("place")}
          </span>
          <DoodleArrow
            className="absolute end-[-3.25rem] top-[calc(100%-0.6rem)] hidden h-11 w-12 -scale-x-100 text-ink sm:block rtl:scale-x-100"
            delay={1.4}
          />
        </span>

        <span className="sr-only">
          Essaoudi — {t("role")}, {t("place")}
        </span>
      </h1>

      <p
        className="anim-rise mt-6 flex items-center justify-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink sm:text-[11px]"
        style={at(1.2)}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cobalt opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cobalt" />
        </span>
        {t("available")}
      </p>

      <p
        className="anim-rise mx-auto mt-24 max-w-[19ch] text-center text-[clamp(34px,5.4vw,64px)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink text-balance sm:mt-16"
        style={at(0.3)}
      >
        {t("headline1")}{" "}
        <GooglyEye className="inline-block h-[0.8em] w-[0.8em] align-[-0.1em]" />
        <br className="max-sm:hidden" /> {t("headline2")}{" "}
        <Flower className="anim-spin inline-block h-[0.8em] w-[0.8em] align-[-0.08em]" />
      </p>

      <div
        className="anim-rise mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
        style={at(0.45)}
      >
        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="group inline-flex h-12 items-center gap-3 rounded-[4px] bg-ink pe-5 ps-2 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-paper transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--sun)]"
        >
          <span className="grid h-8 w-8 place-items-center rounded-[3px] bg-cobalt">
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-[rotate] duration-300 group-hover:rotate-45 rtl:-scale-x-100"
              strokeWidth={2.6}
            />
          </span>
          {t("getInTouch")}
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("projects")}
          className="font-note text-[23px] text-ink-soft underline decoration-tangerine decoration-wavy decoration-2 underline-offset-[7px] transition-colors hover:text-ink"
        >
          {t("orSeeWork")} ↓
        </button>
      </div>

      <HorizonArc className="pointer-events-none absolute inset-x-0 bottom-4 h-12 w-full text-[#cdc8bd] md:h-16" />
    </section>
  );
};

export default IntroSection;
