import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    items: [
      "Laravel",
      "Node.js",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "Docker", "CI/CD", "Vercel", "AWS"],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal skills
      gsap.utils.toArray<HTMLElement>(".skill-group").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Infinite marquee
      if (marqueeRef.current) {
        const marquee = marqueeRef.current;
        gsap.to(marquee, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const marqueeText =
    "REACT · NEXT.JS · TYPESCRIPT · LARAVEL · NODE.JS · TAILWIND · GSAP · POSTGRESQL · ";

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48">
      {/* Marquee band */}
      <div className="overflow-hidden border-y border-border py-6 mb-24 md:mb-32">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap font-display text-4xl md:text-6xl font-bold text-muted/40"
        >
          {marqueeText}
          {marqueeText}
        </div>
      </div>

      <div className="section-padding">
        <div
          className="absolute right-6 md:right-24 text-[20vw] font-display font-bold text-muted/30 select-none pointer-events-none leading-none"
          style={{ top: "30%" }}
        >
          04
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 skill-group">
            <div className="line-accent mb-4" />
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-body mb-2">
              Expertise
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              Tools I use to
              <br />
              <span className="text-gradient">build things.</span>
            </h2>
          </div>

          <div className="md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {skills.map((group, i) => (
              <div
                key={i}
                className={`skill-group ${i === 1 ? "sm:mt-12" : ""}`}
              >
                <h3 className="font-display text-base font-semibold mb-4 text-primary">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-dim font-body text-sm flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
