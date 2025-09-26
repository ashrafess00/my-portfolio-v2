"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const SkillsOverview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("HomePage.skillsOverview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("skills-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const skillCategories = [
    {
      category: t("frontendDevelopment"),
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 90 },
        { name: "HTML/CSS", level: 95 },
      ],
    },
    {
      category: t("backendDevelopment"),
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "Django", level: 75 },
        { name: "PostgreSQL", level: 70 },
        { name: "MongoDB", level: 75 },
      ],
    },
    {
      category: t("toolsOthers"),
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 70 },
        { name: "Vercel", level: 70 },
        { name: "Prisma", level: 70 },
        { name: "Supabase", level: 70 },
      ],
    },
  ];

  return (
    <section
      id="skills-section"
      className="py-20 bg-gray-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-blue-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-blue-200 mb-4">
            {t("skillsTitle")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("skillsDescription")}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.category}
              className={`bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-900 dark:to-blue-950 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-slate-800 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{
                animationDelay: `${categoryIndex * 200}ms`,
              }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-blue-200 mb-6 text-center">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className={`flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300 ${
                      isVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{
                      animationDelay: `${
                        categoryIndex * 200 + skillIndex * 100
                      }ms`,
                    }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-blue-100">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-blue-200 mb-8">
            {t("additionalSkills")}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "REST APIs",
              "GraphQL",
              "Redux",
              "Zustand",
              "Webpack",
              "Vite",
              "n8n",
              "zapier",
              "SEO",
              "Performance Optimization",
              "Responsive Design",
              "Accessibility",
              "AI Automation",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-medium text-gray-700 dark:text-blue-100 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;
