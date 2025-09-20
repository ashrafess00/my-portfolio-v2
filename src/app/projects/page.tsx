"use client";
import ProjectsGrid from "@/components/ProjectsGrid";
import ProjectFilters from "@/components/ProjectFilters";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const t = useTranslations("ProjectsPage");
  const filters: string[] = t.raw("filters");

  return (
    <div className="pt-16">
      <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
      <ProjectFilters
        filtersT={filters}
        activeFilter={filter}
        setFilter={setFilter}
      />
      <ProjectsGrid activeFilter={filter} />
    </div>
  );
}
