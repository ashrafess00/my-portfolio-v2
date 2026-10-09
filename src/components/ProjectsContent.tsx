"use client";
import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SectionHeading } from "@/components/notebook/SectionHeading";
import { Tape, type TapeColor } from "@/components/notebook/Tape";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface TProjectTypes {
  title: string;
  description: string;
  category: "web" | "42" | "automation";
  image?: string;
  id: number;
  technologies: string[];
  liveUrl?: string | null;
  featured?: boolean;
  githubUrl?: string | null;
}

type FilterId = "all" | TProjectTypes["category"];

const FILTER_COLORS: Record<FilterId, string> = {
  all: "bg-sun",
  web: "bg-mint",
  "42": "bg-sky",
  automation: "bg-blush",
};

// Each card is taped on slightly differently.
const CARD_TILTS = ["-rotate-[1.2deg]", "rotate-[0.8deg]", "-rotate-[0.5deg]", "rotate-[1.4deg]"];
const CARD_TAPES: TapeColor[] = ["yellow", "pink", "blue", "mint"];

const buttonLink =
  "inline-flex items-center gap-1.5 rounded-[4px] border-2 border-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)]";

export default function ProjectsContent() {
  const [filter, setFilter] = useState<FilterId>("all");
  const t = useTranslations("ProjectsPage");
  const tProjects: TProjectTypes[] = t.raw("projects") ?? [];
  const filtersT: string[] = t.raw("filters");
  const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: filtersT ? filtersT[0] : "All Projects" },
    { id: "web", label: filtersT ? filtersT[2] : "Web Development" },
    { id: "42", label: filtersT ? filtersT[1] : "42 Projects" },
    { id: "automation", label: filtersT ? filtersT[3] : "Automation" },
  ];

  const countFor = (id: FilterId) =>
    id === "all" ? tProjects.length : tProjects.filter((p) => p.category === id).length;

  const filteredProjects = tProjects.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  return (
    <>
      <Navbar />

      <section className="relative px-4 pb-20 pt-8 sm:px-8 md:pb-28 md:pt-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-note text-[22px] text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft
            aria-hidden
            className="h-4 w-4 transition-[translate] group-hover:-translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0.5"
            strokeWidth={2.4}
          />
          {t("back")}
        </Link>

        <div className="mt-6">
          <SectionHeading as="h1" note={t("note")} label={t("title")} />
          <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-ink-soft text-pretty">
            {t("description")}
          </p>
        </div>

        {/* Filters, as stickers */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {filters.map((category) => {
            const active = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(category.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-[translate,box-shadow,background-color]",
                  active
                    ? cn(FILTER_COLORS[category.id], "-translate-y-0.5 shadow-[3px_3px_0_var(--ink)]")
                    : "bg-white hover:-translate-y-0.5",
                )}
              >
                {category.label}
                <span className="rounded-full bg-ink px-1.5 py-px text-[10px] text-paper">
                  {countFor(category.id)}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center font-note text-[21px] text-ink-soft">
          {t("count", { count: filteredProjects.length })}
        </p>

        {/* Remounts per filter so the cards deal themselves out again. */}
        <ul
          key={filter}
          className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <li
              key={project.id}
              className={cn(
                "anim-rise polaroid relative flex flex-col p-3 pb-6 transition-[rotate,translate] duration-300 hover:-translate-y-1.5 hover:rotate-0",
                CARD_TILTS[index % CARD_TILTS.length],
              )}
              style={{ "--d": `${index * 0.07}s` } as CSSProperties}
            >
              <Tape
                color={CARD_TAPES[index % CARD_TAPES.length]}
                className="-top-3 left-1/2 -translate-x-1/2 -rotate-2"
              />
              <div className="relative aspect-[16/10] overflow-hidden bg-paper-line">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 340px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-cream p-4 text-center font-pixel text-[44px] leading-none text-ink/80">
                    {project.title}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col px-1 pt-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">
                  {filters.find((f) => f.id === project.category)?.label}
                </p>
                <h2 className="mt-1.5 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-ink">
                  {project.title}
                </h2>
                <p className="mt-2 line-clamp-4 text-[14px] leading-relaxed text-ink-soft">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, i) => (
                    <li
                      key={tech + i}
                      className="rounded-full border-[1.5px] border-ink/25 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-soft"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {(project.liveUrl || project.githubUrl) && (
                  <div className="mt-auto flex flex-wrap gap-3 pt-5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonLink, "bg-sun")}
                      >
                        {t("live")}
                        <ArrowUpRight aria-hidden className="h-3.5 w-3.5 rtl:-scale-x-100" strokeWidth={2.6} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonLink, "bg-white")}
                      >
                        {t("code")}
                        <ArrowUpRight aria-hidden className="h-3.5 w-3.5 rtl:-scale-x-100" strokeWidth={2.6} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </>
  );
}
