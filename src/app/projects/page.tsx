"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

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
  console.log("filteredProjects", filteredProjects);

  const handleCategoryChange = (category: string) => {
    if (category === filter) return;
    console.log("category: ", category);

    setIsAnimating(true);
    setTimeout(() => {
      setFilter(category);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
      <div className="flex flex-col md:flex-row h-auto md:h-screen">
        {/* Left Sidebar */}
        <div className="w-full md:w-80 pt-20 bg-transparent border-r border-sidebar-border p-8 flex flex-col">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-sidebar-foreground mb-2">
              {t("title")}
            </h1>
          </div>

          <div className="mb-8">
            <p className="text-sidebar-foreground/80 text-sm leading-relaxed mb-6">
              {t("description")}
            </p>
          </div>

          {/* Category Navigation */}
          <nav className="space-y-2 flex flex-row md:flex-col">
            {filters.map((category, index) => (
              <button
                key={category.id + index}
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                  filter === category.id
                    ? "bg-transparent md:bg-sidebar-accent text-blue-600 foreground border-0 md:border-l-2 border-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {filter === "All" ? "All Projects" : filter}
              </h2>
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
                  className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 animate-slide-in"
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
                      <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
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
                          className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
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
