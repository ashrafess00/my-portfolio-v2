"use client";

import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";

export type SectionId = "top" | "about" | "projects" | "skills" | "contact";

export function scrollToSection(id: SectionId) {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior });
  }
}

/**
 * Goes to a homepage section: scrolls there when already on the homepage,
 * otherwise links back to the homepage with the section's hash.
 */
export function SectionLink({
  id,
  className,
  children,
  label,
  current,
}: {
  id: SectionId;
  className?: string;
  children: ReactNode;
  /** Accessible name, for icon-only renderings. */
  label?: string;
  current?: boolean;
}) {
  const onHome = usePathname() === "/";

  if (onHome) {
    return (
      <button
        type="button"
        aria-label={label}
        aria-current={current ? "true" : undefined}
        className={className}
        onClick={() => scrollToSection(id)}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={id === "top" ? "/" : { pathname: "/", hash: id }}
      aria-label={label}
      className={className}
    >
      {children}
    </Link>
  );
}
