"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/data/projects";
import { DoodleArrow, Sparkle } from "@/components/notebook/Doodles";
import { SectionHeading } from "@/components/notebook/SectionHeading";
import { Tape, type TapeColor } from "@/components/notebook/Tape";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// One folder colour per project, cycling.
const FOLDERS: { surface: string; tape: TapeColor }[] = [
  { surface: "bg-cobalt text-white", tape: "yellow" },
  { surface: "bg-ink text-paper", tape: "pink" },
  { surface: "bg-sun text-ink", tape: "blue" },
  { surface: "bg-bubblegum text-ink", tape: "mint" },
  { surface: "bg-leaf text-ink", tape: "yellow" },
  { surface: "bg-tangerine text-ink", tape: "blue" },
  { surface: "bg-mint text-ink", tape: "pink" },
];

const linkClass =
  "group/link inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] underline decoration-2 underline-offset-[6px] transition-[text-decoration-color] hover:decoration-wavy";

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={linkClass}
  >
    {children}
    <ArrowUpRight
      aria-hidden
      className="h-3.5 w-3.5 transition-[translate] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 rtl:-scale-x-100"
      strokeWidth={2.6}
    />
  </a>
);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("HomePage.projectsSection");

  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 pb-20 pt-10 sm:px-8 md:px-12 md:pb-28 md:pt-14"
    >
      <SectionHeading
        note={t("note")}
        label={t("sectionLabel")}
        title={
          <>
            {t("titleLine1")} <span className="marker">{t("titleLine2")}</span>
          </>
        }
      />

      <ol className="mt-14 flex flex-col gap-10 [--tab-w:7.5rem] md:mt-20 md:gap-28 xl:[--tab-w:10.5rem]">
        {projects.map((project, i) => {
          const folder = FOLDERS[i % FOLDERS.length];
          const title = t(`projects.${project.id}.title`);
          const number = String(i + 1).padStart(2, "0");
          const href = project.websiteUrl || project.githubUrl || undefined;
          // Where the tab sits along the top edge: spread across the width on
          // desktop (so stacked tabs line up), cycling through 3 spots on phones.
          const tabPosition = {
            "--tab-m": (i % 3) / 2,
            "--tab-d": projects.length > 1 ? i / (projects.length - 1) : 0,
          } as CSSProperties;

          return (
            <li key={project.id} className="folder group " style={tabPosition}>
              {/* Folder tab */}
              <div className="relative h-9 ">
                <span
                  className={cn(
                    "folder-tab absolute bottom-0 flex h-9 items-center gap-2 ps-5 font-mono text-[11px] font-bold uppercase tracking-[0.16em]",
                    folder.surface,
                  )}
                >
                  <Sparkle className="h-2.5 w-2.5" />
                  <span className="hidden xl:inline">{t("tab")}</span>
                  {number}
                </span>
              </div>

              {/* Folder body */}
              <article
                className={cn(
                  "relative grid overflow-hidden rounded-md md:h-[27.5rem] md:grid-cols-[minmax(0,46%)_1fr]",
                  folder.surface,
                  i == 0
                    ? "!rounded-tl-[0]"
                    : i == projects.length - 1
                      ? "rounded-tr-[0]"
                      : "",
                )}
              >
                <div className="relative z-10 flex flex-col p-7 sm:p-9 md:p-11">
                  <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full bg-current"
                    />
                    {project.year} · {project.tags[0]}
                  </p>
                  <h3 className="mt-5 text-[clamp(34px,4.4vw,58px)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance">
                    {title}
                  </h3>
                  <p className="mt-4 line-clamp-4 max-w-[46ch] text-[15px] leading-relaxed opacity-85">
                    {t(`projects.${project.id}.desc`)}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border-[1.5px] border-current/35 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-7">
                    {project.websiteUrl && (
                      <ExternalLink href={project.websiteUrl}>
                        {t("viewProject")}
                      </ExternalLink>
                    )}
                    {project.githubUrl && (
                      <ExternalLink href={project.githubUrl}>
                        {t("viewOnGithub")}
                      </ExternalLink>
                    )}
                    {!href && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] opacity-70">
                        <Lock
                          aria-hidden
                          className="h-3.5 w-3.5"
                          strokeWidth={2.4}
                        />
                        {t("private")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Screenshot, taped on and bleeding off the bottom edge */}
                <div className="relative min-h-[15rem] sm:min-h-[19rem] md:min-h-0">
                  <a
                    href={href}
                    target={href ? "_blank" : undefined}
                    rel={href ? "noopener noreferrer" : undefined}
                    tabIndex={href ? -1 : undefined}
                    aria-hidden
                    className={cn(
                      "absolute -bottom-10 end-6 start-6 top-0 block transition-[rotate,translate] duration-500 group-hover:-translate-y-2 group-hover:rotate-0 sm:end-9 sm:start-9 md:-bottom-12 md:end-10 md:start-2 md:top-11",
                      i % 2 === 0 ? "rotate-2" : "-rotate-2",
                      !href && "pointer-events-none",
                    )}
                  >
                    <Tape
                      color={folder.tape}
                      className="-top-2.5 start-8 -rotate-[8deg]"
                    />
                    <Tape
                      color={folder.tape}
                      className="-top-2 end-8 rotate-[6deg]"
                    />
                    <div className="relative h-full w-full overflow-hidden rounded-[4px] border-[6px] border-white bg-white shadow-[0_24px_40px_-20px_rgba(0,0,0,0.65)]">
                      <Image
                        src={project.img}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 90vw, 640px"
                        className="object-cover object-top"
                      />
                    </div>
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <div data-reveal className="mt-14 flex justify-center md:mt-20">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-note text-[26px] text-ink transition-colors hover:text-cobalt"
        >
          {t("seeAll")}
          <DoodleArrow className="h-9 w-10 rotate-[35deg] transition-[translate] group-hover:translate-x-1 rtl:-scale-x-100" />
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
