"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { TProjectTypes } from "@/app/projects/page";

const FeaturedProjects = () => {
  const t = useTranslations("HomePage.featuredProjects");
  const tProjects = useTranslations();

  const projectsT: TProjectTypes[] = tProjects
    .raw("ProjectsPage.projects")
    .slice(0, 3);
  const locale = useLocale();

  // const featuredProjects = [
  //   {
  //     id: 1,
  //     title: projectsT[0]?.title || "",
  //     description: projectsT[0]?.description || "",
  //     image: "/projects/ederest.png",
  //     tags: ["Next.js", "TypeScript", "Redux", "Django", "Tailwind CSS"],
  //     link: "https://ederest.com/",
  //     featured: false,
  //   },
  //   {
  //     id: 2,
  //     title: projectsT[1]?.title || "",
  //     description: projectsT[1]?.description || "",
  //     image: "/projects/carey.png",
  //     tags: ["React", "Node.js", "prisma", "Tailwind CSS"],
  //     link: "https://carey.ma/en",
  //     featured: false,
  //   },
  //   {
  //     id: 3,
  //     title: projectsT[2]?.title || "",
  //     description: projectsT[2]?.description || "",
  //     image: "/projects/portfolio.png",
  //     tags: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
  //     link: "/projects/portfolio-website",
  //     featured: false,
  //   },
  // ];

  return (
    <section className="py-20 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-blue-200 mb-4">
            {t("featuredProjects")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("featuredProjectsDescription")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projectsT.map((project) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-900 dark:to-blue-950 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-slate-800"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:opacity-0 transition-opacity duration-300 dark:bg-gradient-to-br dark:from-blue-800/30 dark:to-purple-800/30"></div>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-blue-500 dark:text-blue-300 opacity-20">
                      📱
                    </div>
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-blue-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index: number) => (
                    <span
                      key={tech + index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                <Link
                  href={project.liveUrl || project.githubUrl || "#"}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  {t("viewProject")}
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    style={{
                      transform: locale === "ar" ? "rotate(180deg)" : "none",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 dark:bg-gradient-to-r dark:from-blue-800 dark:to-purple-800 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t("viewAllProjects")}
            <svg
              className="ml-2 w-5 h-5"
              style={{
                transform: locale === "ar" ? "rotate(180deg)" : "none",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
