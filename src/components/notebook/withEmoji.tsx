import type { ReactNode } from "react";

// Built from a string: tsconfig targets ES2017, which predates \p{} escapes.
const EMOJI = new RegExp("(\\p{Extended_Pictographic}\\uFE0F?)", "u");

/**
 * Wraps each emoji in a `.emoji` span so it renders in colour and doesn't
 * stretch the line box (which would knock handwriting off the ruled lines).
 */
export function withEmoji(text: string): ReactNode[] {
  return text.split(EMOJI).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="emoji">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
