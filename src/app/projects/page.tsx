"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";

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

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const t = useTranslations("ProjectsPage");
  const tProjects: TProjectTypes[] =
    useTranslations("ProjectsPage").raw("projects");
  const filtersT: string[] = t.raw("filters");
  const filters = [
    { id: "all", label: filtersT ? filtersT[0] : "All Projects" },
    { id: "web", label: filtersT ? filtersT[2] : "Web Development" },
    { id: "42", label: filtersT ? filtersT[1] : "42 Projects" },
    { id: "automation", label: filtersT ? filtersT[3] : "Automation" },
  ];
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredProjects = tProjects.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });
  // console.log("filteredProjects", filteredProjects);

  const handleCategoryChange = (category: string) => {
    if (category === filter) return;
    setIsAnimating(true);
    setTimeout(() => {
      setFilter(category);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-background grain">
      <div className="flex flex-col md:flex-row h-auto md:h-screen">
        {/* Left Sidebar */}
        <div className="w-full md:w-80 pt-20 bg-transparent border-b md:border-b-0 md:border-r border-hairline p-8 md:px-10 flex flex-col">
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            Home
          </Link>
          <div className="mb-8">
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-5">
              <span className="font-serif italic text-accent">✦</span>
              <span className="h-px w-8 bg-rule" />
              <span>Archive</span>
            </div>
            <h1 className="font-serif text-4xl font-light leading-tight text-foreground mb-4">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Category Navigation */}
          <nav className="space-y-1 flex flex-row flex-wrap md:flex-col md:mt-4">
            {filters.map((category, index) => (
              <button
                key={category.id + index}
                onClick={() => handleCategoryChange(category.id)}
                className={`text-left px-4 py-2.5 rounded-sm transition-all duration-200 text-[13px] tracking-wide ${
                  filter === category.id
                    ? "text-accent md:border-l-2 border-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 md:p-10 pt-10 md:pt-20">
            <div className="mb-8 flex items-baseline gap-3">
              <h2 className="font-serif text-2xl font-light capitalize text-foreground">
                {filters.find((f) => f.id === filter)?.label ?? filter}
              </h2>
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {filteredProjects.length} projects
              </span>
            </div>

            {/* Projects Grid */}
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity duration-150 ${
                isAnimating ? "opacity-0" : "opacity-100 animate-fade-in-up"
              }`}
            >
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group overflow-hidden rounded-sm bg-card border-hairline hover:border-accent/50 transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="font-bold text-2xl w-full h-full flex items-center justify-center uppercase text-muted-foreground bg-muted">
                        {project.title}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-serif text-xl font-light text-card-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <Badge
                          key={tech + index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      {project?.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="inline-flex items-center text-sm text-accent hover:text-accent-warm transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Live Demo
                        </a>
                      )}
                      {project?.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
