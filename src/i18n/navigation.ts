import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware replacements for next/link and next/navigation.
// Paths passed to these are locale-free ("/projects"); the prefix is added here.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
