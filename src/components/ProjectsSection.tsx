import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import Image from "next/image";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const ProjectImageLink = ({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) => {
  const className =
    "group relative block overflow-hidden rounded-sm bg-surface";
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
};

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    aria-hidden
  >
    <path
      d="M3 10h14M12 5l5 5-5 5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("HomePage.projectsSection");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-item").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative border-b border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="reveal-item flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="font-serif italic text-accent">02</span>
            <span className="h-px w-8 bg-rule" />
            <span>{t("sectionLabel")}</span>
          </div>
          <h2 className="max-w-2xl font-serif text-[32px] font-light leading-[1.1] tracking-[-0.015em] text-foreground text-balance sm:text-[42px]">
            {t("titleLine1")}{" "}
            <em className="italic text-accent-warm">{t("titleLine2")}</em>
          </h2>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        {projects.map((project, i) => {
          const imageLeft = i % 2 === 0;
          const last = i === projects.length - 1;
          // Prefer the live site; fall back to the GitHub repo if there's no live URL.
          const href = project.websiteUrl || project.githubUrl || undefined;
          return (
            <article
              key={project.id}
              className={`border-t border-hairline ${last ? "border-b" : ""}`}
            >
              <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-12 lg:gap-12">
                {/* Image */}
                <div
                  className={`reveal-item lg:col-span-7 ${
                    imageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <ProjectImageLink href={href}>
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={project.img}
                        alt={t(`projects.${project.id}.title`)}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(3,15,24,0) 55%, rgba(3,15,24,0.35) 100%)",
                      }}
                    />
                  </ProjectImageLink>
                </div>

                {/* Text */}
                <div
                  className={`reveal-item flex flex-col justify-center lg:col-span-5 ${
                    imageLeft ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    {/* <span className="font-serif text-[56px] font-light italic leading-none text-accent">
                      {n}
                    </span> */}
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {project.year} · {project.tags[0]}
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-[28px] font-light leading-[1.1] tracking-[-0.015em] text-foreground text-balance sm:text-[34px]">
                    {t(`projects.${project.id}.title`)}
                  </h3>

                  <p className="mt-5 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground text-pretty">
                    {t(`projects.${project.id}.desc`)}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-rule px-3 py-1 text-[11px] tracking-wide text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {href && (
                    <div className="mt-8 border-t border-hairline pt-6">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 border-b border-rule pb-1 text-[12px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent"
                      >
                        {project.websiteUrl
                          ? t("viewProject")
                          : t("viewOnGithub")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
