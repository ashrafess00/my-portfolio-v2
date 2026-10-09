import type { ReactNode } from "react";

/**
 * The notebook section header: a scribbled note in the margin, a boxed
 * typed label in the middle, and an optional big headline underneath.
 */
export function SectionHeading({
  note,
  label,
  title,
  as: Heading = "h2",
}: {
  note: string;
  label: string;
  title?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div data-reveal className="relative">
      <p className="mb-3 text-center font-note text-[22px] leading-none text-ink-soft -rotate-3 md:absolute md:start-[4%] md:top-[-0.6rem] md:mb-0 md:text-[24px] lg:start-[7%]">
        {note}
      </p>
      <div className="flex justify-center">
        <Heading className="inline-block rounded-[4px] border-[1.5px] border-ink bg-white px-3 py-0.5 text-[20px] font-medium tracking-[-0.01em] text-ink shadow-[0_1px_0_rgba(28,27,24,0.12)] sm:text-[22px]">
          {label}
        </Heading>
      </div>
      {title && (
        <p className="mx-auto mt-6 max-w-[20ch] text-center text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink text-balance">
          {title}
        </p>
      )}
    </div>
  );
}
