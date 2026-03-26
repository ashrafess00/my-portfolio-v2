import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, transformOrigin: "left center" },
      )
        .fromTo(
          nameRef.current,
          { y: 120, opacity: 0, skewY: 8 },
          { y: 0, opacity: 1, skewY: 0, duration: 1 },
          "-=0.6",
        )
        .fromTo(
          roleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4",
        )
        .fromTo(
          taglineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.3",
        )
        .fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2",
        );

      // Parallax on scroll
      // Use `fromTo` with an explicit start value so the parallax tween doesn't
      // re-render from the intro timeline's initial `y: 120` state.
      gsap.fromTo(
        nameRef.current,
        { y: 0 },
        {
          y: -100,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end section-padding pb-16 md:pb-24"
    >
      {/* Background number */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[20vw] font-display font-bold text-muted/30 select-none pointer-events-none leading-none">
        01
      </div>

      <div className="relative z-10 max-w-5xl">
        <div ref={lineRef} className="line-accent mb-8 origin-left" />
        <p
          ref={roleRef}
          className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4"
        >
          Full Stack Developer
        </p>
        <h1
          ref={nameRef}
          className="font-display text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold leading-[0.9] tracking-tight mb-6"
        >
          I build
          <br />
          <span className="text-gradient">digital</span>
          <br />
          experiences.
        </h1>
        <p
          ref={taglineRef}
          className="text-dim font-body text-base md:text-lg max-w-md leading-relaxed"
        >
          Crafting performant, elegant web applications with modern
          technologies. Based in the intersection of design and engineering.
        </p>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-dim text-xs tracking-[0.2em] uppercase font-body">
          Scroll
        </span>
        <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
          <div className="w-full h-1/3 bg-primary animate-[slideDown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
      `}</style>
    </section>
  );
};

export default IntroSection;
