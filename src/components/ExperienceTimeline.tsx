"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const ExperienceTimeline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("AboutPage.experienceTimeline");
  const experienceT: {
    id: number;
    title: string;
    company: string;
    period: string;
    description: string;
  }[] = t.raw("experience");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("experience-timeline");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const experiences = [
    {
      id: 1,
      title: experienceT[0]?.title,
      company: experienceT[0]?.company,
      period: experienceT[0]?.period,
      description: experienceT[0]?.description,
      technologies: ["React", "Typescript", "Tailwind CSS"],
    },
    {
      id: 2,
      title: experienceT[1]?.title,
      company: experienceT[1]?.company,
      period: experienceT[1]?.period,
      description: experienceT[1]?.description,
      technologies: ["Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    },
  ];

  return (
    <section
      id="experience-timeline"
      className="py-20 bg-gray-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-blue-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-blue-200 mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gray-200 dark:bg-slate-800"></div>

          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative mb-12 ${
                index % 2 === 0
                  ? "md:pr-8 md:text-right"
                  : "md:pl-8 md:text-left"
              } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 dark:bg-blue-700 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></div>

              {/* Content */}
              <div className="ml-12 md:ml-0 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-blue-100">
                    {experience.title}
                  </h3>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {experience.period}
                  </span>
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-blue-200 mb-3">
                  {experience.company}
                </div>
                <p className="text-gray-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {experience.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
