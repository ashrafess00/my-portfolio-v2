import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power3.out" }
    );

    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 section-padding py-6 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-display text-sm font-bold tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors"
      >
        DEV<span className="text-primary">.</span>
      </button>

      <div className="hidden md:flex items-center gap-8">
        {["about", "projects", "skills", "contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
    </nav>
  );
};

export default Navbar;
