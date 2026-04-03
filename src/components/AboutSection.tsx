import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger reveal for text blocks
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Counter animation for years
      const counter = sectionRef.current?.querySelector(".year-counter");
      if (counter) {
        gsap.fromTo(
          { val: 0 },
          { val: 5 },
          {
            val: 5,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
            },
            onUpdate: function () {
              if (counter)
                counter.textContent =
                  Math.round(this.targets()[0].val).toString() + "+";
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: "3+", label: "Years of Experience", className: "year-counter" },
    // { number: "30+", label: "Projects Delivered" },
    // { number: "15+", label: "Happy Clients" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 section-padding"
    >
      <div className="absolute top-0 right-12 md:right-24 text-[15vw] font-display font-bold text-muted/30 select-none pointer-events-none leading-none">
        About Me
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Left label */}
        <div className="md:col-span-3 about-reveal">
          <div className="line-accent mb-4" />
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-body">
            About
          </p>
        </div>

        {/* Main content — offset */}
        <div className="md:col-span-7 md:col-start-5 space-y-8">
          <h2 className="about-reveal font-display text-3xl md:text-5xl font-bold leading-tight">
            I don`&apos;t just write code.
            <br />
            <span className="text-dim">I solve problems.</span>
          </h2>

          <p className="about-reveal text-dim font-body text-base md:text-lg leading-relaxed max-w-lg">
            Achraf Essaoudi is a full stack developer with a passion for
            creating elegant, performant web applications. He specializes in
            building products that sit at the intersection of design and
            engineering — where every pixel matters and every millisecond
            counts.
          </p>
          <p className="about-reveal text-dim font-body text-base md:text-lg leading-relaxed max-w-lg">
            When I&apos;m not coding, you&apos;ll find me exploring new
            technologies, contributing to open source, or sketching UI concepts.
            I believe great software is built with empathy, curiosity, and
            relentless attention to detail.
          </p>

          {/* Stats — intentionally asymmetric */}
          <div className="about-reveal flex flex-wrap gap-12 pt-8">
            {stats.map((stat, i) => (
              <div key={i} className={i === 1 ? "mt-6" : ""}>
                <span
                  className={`font-display text-4xl md:text-5xl font-bold text-gradient ${stat.className || ""}`}
                >
                  {stat.number}
                </span>
                <p className="text-dim text-sm mt-1 font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
