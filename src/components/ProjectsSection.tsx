import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

// interface Project {
//   title: string;
//   description: string;
//   tags: string[];
//   year: string;
//   index: string;
// }

// const projects: Project[] = [
//   {
//     title: "E-Commerce Platform",
//     description:
//       "Full-stack marketplace with real-time inventory, payment processing, and admin dashboard. Built for scale.",
//     tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
//     year: "2025",
//     index: "01",
//   },
//   {
//     title: "SaaS Analytics Dashboard",
//     description:
//       "Data visualization platform with custom charts, user segmentation, and automated reporting for startup teams.",
//     tags: ["React", "D3.js", "Laravel", "Redis"],
//     year: "2024",
//     index: "02",
//   },
//   {
//     title: "AI Content Engine",
//     description:
//       "Content generation tool leveraging LLMs with a sleek editor interface, team collaboration, and API integrations.",
//     tags: ["Next.js", "OpenAI", "Tailwind", "Supabase"],
//     year: "2024",
//     index: "03",
//   },
//   {
//     title: "Fintech Mobile App",
//     description:
//       "Cross-platform financial management app with bank integrations, budget tracking, and real-time notifications.",
//     tags: ["React Native", "Node.js", "Plaid", "MongoDB"],
//     year: "2023",
//     index: "04",
//   },
// ];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-item").forEach((el, i) => {
        const direction = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(
          el,
          { x: direction, opacity: 0 },
          {
            x: 0,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 section-padding"
    >
      <div className="absolute top-0 left-6 md:left-24 text-[20vw] font-display font-bold text-muted/30 select-none pointer-events-none leading-none">
        03
      </div>

      <div className="relative z-10 mb-16 md:mb-24">
        <div className="line-accent mb-4" />
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-body mb-4">
          Selected Work
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold">
          Projects that
          <br />
          <span className="text-gradient">speak for themselves.</span>
        </h2>
      </div>

      <div className="relative z-10 space-y-0">
        {projects.map((project, i) => (
          <div
            key={i}
            className="project-item group border-t border-border py-10 md:py-14 cursor-pointer transition-colors duration-500 hover:bg-secondary/30"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Index */}
              <div className="md:col-span-1">
                <span className="font-display text-sm text-muted-foreground">
                  {project.index}
                </span>
              </div>

              {/* Title — large */}
              <div
                className={`md:col-span-5 ${i % 2 !== 0 ? "md:col-start-3" : ""}`}
              >
                <h3 className="font-display text-2xl md:text-4xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="text-dim text-sm font-body mt-2 block">
                  {project.year}
                </span>
              </div>

              {/* Description + tags */}
              <div
                className={`md:col-span-4 ${i % 2 !== 0 ? "md:col-start-8" : "md:col-start-8"}`}
              >
                <p className="text-dim font-body text-sm md:text-base leading-relaxed mb-4">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs font-body px-3 py-1 border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Bottom border */}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default ProjectsSection;
