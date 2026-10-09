import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const TAPE_COLORS = {
  yellow: "rgba(246, 212, 102, 0.75)",
  blue: "rgba(140, 170, 255, 0.65)",
  pink: "rgba(255, 158, 192, 0.7)",
  mint: "rgba(132, 212, 168, 0.7)",
} as const;

export type TapeColor = keyof typeof TAPE_COLORS;

/** A strip of washi tape. Position + tilt it with className. */
export function Tape({
  color = "yellow",
  className,
}: {
  color?: TapeColor;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("tape", className)}
      style={{ "--tape": TAPE_COLORS[color] } as CSSProperties}
    />
  );
}
