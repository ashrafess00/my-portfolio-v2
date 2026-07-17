import Image from "next/image";
import { HERO_MOCKUP_IMAGE } from "@/lib/site";

/**
 * Editorial desk scene: a monitor on a stand showing a landing page.
 * If HERO_MOCKUP_IMAGE is set, that screenshot fills the screen.
 */
const HeroMockup = () => {
  return (
    <div className="relative isolate mx-auto w-full max-w-[640px] lg:mx-0 lg:ml-auto">
      {/* soft warm floor wash */}
      <div
        aria-hidden
        className="absolute inset-x-[-10%] bottom-[-6%] h-56 rounded-[50%] opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,163,115,0.22), transparent 65%)",
        }}
      />

      {/* Monitor */}
      <div className="relative">
        {/* Bezel */}
        <div
          className="relative rounded-[14px] border border-[#1a2e40] p-[10px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(237,228,211,0.06)]"
          style={{
            background:
              "linear-gradient(180deg, #0e2033 0%, #0a1a2a 50%, #061525 100%)",
          }}
        >
          {/* Screen */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] bg-[#f2ead9]">
            {HERO_MOCKUP_IMAGE && (
              <Image
                src={HERO_MOCKUP_IMAGE}
                alt="Landing page preview"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40rem"
                className="object-cover object-top"
              />
            )}
            {/* subtle glare */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.05) 100%)",
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#233a52]" />
          </div>
        </div>

        {/* Neck */}
        <div className="relative mx-auto -mt-[2px] h-8 w-3 bg-gradient-to-b from-[#152838] to-[#0a1826]" />
        {/* Base */}
        <div
          className="relative mx-auto h-2 w-40 rounded-[3px]"
          style={{
            background: "linear-gradient(180deg, #182c40 0%, #0c1c2b 100%)",
            boxShadow: "0 6px 20px -6px rgba(0,0,0,0.6)",
          }}
        />

        {/* Desk surface line */}
        <div className="relative mt-3 h-px bg-gradient-to-r from-transparent via-[#2a4560] to-transparent" />
        <div
          className="relative -mt-px h-14"
          style={{
            background:
              "linear-gradient(180deg, rgba(212,163,115,0.06) 0%, transparent 100%)",
          }}
        />

        {/* notebook */}
        <div className="pointer-events-none absolute -left-2 bottom-4 hidden items-end gap-4 sm:flex">
          <div className="relative">
            <div className="h-3 w-24 rounded-sm bg-[#c4a179] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]" />
            <div className="h-1 w-24 bg-[#a68562]" />
          </div>
        </div>
        {/* mug */}
        <div className="pointer-events-none absolute -right-2 bottom-3 hidden sm:block">
          <div className="relative">
            <div className="h-8 w-8 rounded-b-[6px] rounded-t-[3px] bg-gradient-to-b from-[#ede4d3] to-[#c9bfa8] shadow-[0_6px_14px_-4px_rgba(0,0,0,0.6)]" />
            <div className="absolute -right-2 top-1 h-4 w-3 rounded-r-full border-2 border-[#ede4d3]" />
            <div className="absolute inset-x-1 top-1 h-1 rounded-full bg-[#5a3a24]/70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;
