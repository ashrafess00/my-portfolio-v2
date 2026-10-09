"use client";

import { useLayoutEffect, type RefObject } from "react";

// Keep in sync with --rule in globals.css.
const RULE = 32;
// How far above the ruled line the text baseline sits.
const LIFT = 3;

/**
 * Nudges a handwritten block down (via padding-top) so its baselines land on
 * the ruled lines of the sheet, like real writing on notebook paper.
 *
 * `text` needs `position: relative` and a line-height equal to RULE.
 * `marker` is a zero-size inline-block at the very start of the text; its
 * offsetTop is the first baseline. Uses offsetTop (not getBoundingClientRect)
 * so scroll-reveal transforms don't throw the measurement off.
 */
export function useRuleSnap(
  text: RefObject<HTMLElement | null>,
  marker: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const el = text.current;
    const mark = marker.current;
    const sheet = el?.closest<HTMLElement>("[data-sheet]");
    if (!el || !mark || !sheet) return;

    const snap = () => {
      el.style.paddingTop = "0px";

      let top = 0;
      let node: HTMLElement | null = el;
      while (node && node !== sheet) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      if (node !== sheet) return;

      const baseline = top + mark.offsetTop;
      // Lines are 1px tall at the bottom of every RULE-sized band.
      const lineTop = RULE - 1 - LIFT;
      const shift = (((lineTop - baseline) % RULE) + RULE) % RULE;
      el.style.paddingTop = `${shift}px`;
    };

    snap();

    // Anything above changing height (resize, late fonts) moves the text.
    // rAF keeps the padding change out of the observer callback itself.
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(snap);
    });
    observer.observe(sheet);
    document.fonts?.ready.then(snap);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [text, marker]);
}
