import type { CSSProperties } from "react";

type HandwrittenNameProps = {
  name: string;
  className?: string;
  /** Seconds before the pen starts writing. */
  delay?: number;
};

// How far the ink fill trails behind the traced pen outline.
const INK_LAG = 0.3;

const delayStyle = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/**
 * A name in the script face that writes itself in on load: a soft-edged mask
 * sweeps left to right, revealing a traced outline first and the ink right
 * behind it (see .write-mask / .write-trace in globals.css). Pure CSS, so it
 * runs before hydration like the other hero animations.
 *
 * The viewBox is fitted to Dancing Script 700 at font-size 100, which spans
 * about 268 × 100 units for "Achraf" (ascender to the f's descender). Re-fit it
 * if the name or the font changes.
 */
export function HandwrittenName({ name, className, delay = 0 }: HandwrittenNameProps) {
  const text = {
    x: 140,
    y: 76,
    fontSize: 100,
    textAnchor: "middle",
    children: name,
  } as const;

  return (
    <svg aria-hidden viewBox="0 0 280 108" direction="ltr" className={`font-script ${className ?? ""}`}>
      <defs>
        <linearGradient id="handwritten-edge">
          <stop offset="0.85" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="handwritten-pen">
          <rect className="write-mask" width="340" height="108" fill="url(#handwritten-edge)" style={delayStyle(delay)} />
        </mask>
        <mask id="handwritten-ink">
          <rect className="write-mask" width="340" height="108" fill="url(#handwritten-edge)" style={delayStyle(delay + INK_LAG)} />
        </mask>
      </defs>

      <text {...text} mask="url(#handwritten-ink)" fill="currentColor" />
      <text
        {...text}
        mask="url(#handwritten-pen)"
        className="write-trace"
        style={delayStyle(delay)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
