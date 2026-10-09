"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";

/*
 * Hand-drawn SVG bits for the notebook look. Colours come from
 * `currentColor` unless a doodle is a fixed little illustration.
 * Paths with the `anim-draw` class draw themselves in (they need
 * pathLength={1}); stagger them with the `delay` prop.
 */

type DoodleProps = { className?: string; delay?: number };

const delayStyle = (delay = 0) => ({ "--d": `${delay}s` }) as CSSProperties;

/** Wobbly hand-drawn rectangle that stretches over its parent. */
export function ScribbleBox({ className, delay = 0 }: DoodleProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 150"
      preserveAspectRatio="none"
      fill="none"
      className={className}
    >
      <path
        pathLength={1}
        className="anim-draw"
        style={delayStyle(delay)}
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 9 C 100 5, 280 6, 392 8 M389 4 C 393 50, 392 105, 391 144 M394 142 C 280 146, 120 146, 8 143 M11 147 C 7 100, 8 50, 10 4"
      />
    </svg>
  );
}

/** Curvy arrow pointing up and to the right. Mirror it with -scale-x-100. */
export function DoodleArrow({ className, delay = 0 }: DoodleProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 56"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        pathLength={1}
        className="anim-draw"
        style={delayStyle(delay)}
        d="M6 50 C 10 34, 26 16, 54 9"
      />
      <path
        pathLength={1}
        className="anim-draw"
        style={delayStyle(delay + 0.35)}
        d="M42 4 L 55 9 L 46 20"
      />
    </svg>
  );
}

/** Two quick strokes under a word. */
export function Swoosh({ className, delay = 0 }: DoodleProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 18"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      className={className}
    >
      <path
        pathLength={1}
        className="anim-draw"
        style={delayStyle(delay)}
        d="M3 8 C 30 3, 80 2, 117 6"
      />
      <path
        pathLength={1}
        className="anim-draw"
        style={delayStyle(delay + 0.2)}
        d="M16 14 C 42 10, 74 10, 102 12"
      />
    </svg>
  );
}

/** Short wavy underline. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      fill="none"
      className={className}
    >
      <path
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 7 Q 9 1, 16 7 T 30 7 T 44 7 T 58 7 T 72 7 T 86 7 T 100 7 T 114 7"
      />
    </svg>
  );
}

/** Gentle arc spanning the sheet, like the edge of a page curling. */
export function HorizonArc({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 60"
      preserveAspectRatio="none"
      fill="none"
      className={className}
    >
      <path
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth={1.4}
        d="M-10 56 Q 500 -28 1010 46"
      />
    </svg>
  );
}

/** The logo: a pink smiley. */
export function Smiley({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className}>
      <circle cx="16" cy="16" r="16" fill="var(--bubblegum)" />
      <ellipse cx="11.5" cy="12.8" rx="1.9" ry="2.6" fill="#fff" />
      <ellipse cx="20.5" cy="12.8" rx="1.9" ry="2.6" fill="#fff" />
      <path
        d="M9.5 18.5 Q 16 25.5 22.5 18.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Four-point sparkle (✦). */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M12 0 C 12.8 7.5, 16.5 11.2, 24 12 C 16.5 12.8, 12.8 16.5, 12 24 C 11.2 16.5, 7.5 12.8, 0 12 C 7.5 11.2, 11.2 7.5, 12 0 Z"
      />
    </svg>
  );
}

/** Little pink flower. */
export function Flower({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="-12 -12 24 24" className={className}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cy="-5.6"
          rx="3.9"
          ry="5.6"
          transform={`rotate(${angle})`}
          fill="var(--bubblegum)"
          stroke="var(--ink)"
          strokeWidth="0.9"
        />
      ))}
      <circle r="3.2" fill="var(--sun)" stroke="var(--ink)" strokeWidth="0.9" />
    </svg>
  );
}

/** A green googly eye whose pupil follows the cursor around the page. */
export function GooglyEye({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const pupil = pupilRef.current;
    if (!svg || !pupil) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = svg.getBoundingClientRect();
        const dx = e.clientX - (box.left + box.width / 2);
        const dy = e.clientY - (box.top + box.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        // In SVG user units: the white of the eye leaves 3.4 of room.
        const reach = Math.min(1, dist / 160) * 3.2;
        pupil.style.transform = `translate(${(dx / dist) * reach}px, ${(dy / dist) * reach}px)`;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg ref={svgRef} aria-hidden viewBox="-12 -12 24 24" className={className}>
      <circle r="11.3" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="1" />
      <circle r="6.8" fill="#fff" stroke="var(--ink)" strokeWidth="0.9" />
      <circle
        ref={pupilRef}
        r="3.4"
        fill="var(--ink)"
        style={{ transition: "transform 0.25s ease-out" }}
      />
    </svg>
  );
}

/** Hand-drawn tick box with the check overshooting it. */
export function CheckDoodle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 26 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M3.5 6 C 8 5, 14 5.4, 18.5 5 C 19 10, 18.6 15, 19 20 C 14 20.4, 8.5 20, 3.6 20.4 C 3.2 15, 3.8 10, 3.5 6 Z"
        stroke="var(--ink)"
        strokeWidth="1.6"
      />
      <path d="M7 12.5 L 10.5 16.5 L 23 2.5" stroke="var(--cobalt)" strokeWidth="2.4" />
    </svg>
  );
}

/** Round post-office cancellation mark with wavy lines. */
export function Postmark({ text, className }: { text: string; className?: string }) {
  const id = `postmark-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const year = new Date().getFullYear();

  return (
    <svg aria-hidden viewBox="0 0 170 110" fill="none" className={className}>
      <g stroke="currentColor">
        <circle cx="55" cy="55" r="48" strokeWidth="2.2" />
        <circle cx="55" cy="55" r="33" strokeWidth="1.2" />
        {[36, 48, 60, 72].map((y) => (
          <path
            key={y}
            d={`M108 ${y} q 7 -5 14 0 t 14 0 t 14 0 t 14 0`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>
      <path
        id={id}
        d="M 55 55 m -40.5 0 a 40.5 40.5 0 1 1 81 0 a 40.5 40.5 0 1 1 -81 0"
      />
      <text
        fill="currentColor"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="1"
        style={{ fontFamily: "var(--font-mono-stack)" }}
      >
        {/* Twice round the ring. */}
        <textPath href={`#${id}`}>{`${text} ${text}`}</textPath>
      </text>
      <text
        x="55"
        y="60"
        textAnchor="middle"
        fill="currentColor"
        fontSize="15"
        fontWeight="700"
        style={{ fontFamily: "var(--font-mono-stack)" }}
      >
        {year}
      </text>
    </svg>
  );
}
