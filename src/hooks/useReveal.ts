"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Sticks every `[data-reveal]` element inside `scope` onto the page as it
 * scrolls into view — a small drop with an overshoot, like slapping on a
 * sticker. Elements already on screen animate straight away.
 *
 * GSAP drives `transform`, so revealed elements should transition only
 * `rotate` / `translate` / `scale` on hover, never `transform` or `all`.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (!items.length) return;

      gsap.set(items, { autoAlpha: 0, y: 26, scale: 0.94 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.7)",
            stagger: 0.08,
            clearProps: "transform",
          }),
      });
    },
    { scope },
  );
}
