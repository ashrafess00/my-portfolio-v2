"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = ["About", "Projects", "Contact"];

  const closeMobile = () => setMobileOpen(false);

  const navLink = (link: string) => (
    <a
      key={link}
      href={`#${link.toLowerCase()}`}
      onClick={closeMobile}
      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
    >
      {link}
    </a>
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
      style={{ backgroundColor: `hsl(220 20% 4% / ${bgOpacity})` }}
    >
      <motion.div
        className="max-w-6xl mx-auto flex items-center justify-between glass rounded-full px-4 sm:px-6 py-3"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <a
          href="#"
          onClick={closeMobile}
          className="font-heading font-bold text-lg text-foreground tracking-tight"
        >
          <span className="text-primary">{"<"}</span>dev
          <span className="text-primary">{"/>"}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(navLink)}
          <a
            href="#contact"
            onClick={closeMobile}
            className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-white/5 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </motion.div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-3 glass rounded-2xl p-4 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={closeMobile}
                  className="py-3 px-4 text-foreground hover:text-primary hover:bg-white/5 rounded-xl transition-colors font-body"
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMobile}
                className="mt-2 py-3 px-4 text-center bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
