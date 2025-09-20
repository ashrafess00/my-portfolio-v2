"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string | null;
  category: string;
  technologies: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
}

const ProjectsGrid = ({ activeFilter }: { activeFilter: string }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const tProjects: {
    title: string;
    description: string;
    category: "web" | "42" | "automation";
    image?: string;
    id: number;
    technologies: string[];
    liveUrl?: string | null;
    featured?: boolean;
    githubUrl?: string | null;
  }[] = useTranslations("ProjectsPage").raw("projects");

  console.log(tProjects);

  // const projects: Project[] = [
  //   {
  //     id: 1,
  //     title: tProjects[0]?.title,
  //     description:
  //       tProjects[0]?.description ||
  //       "E-tech platform focusing specially on SAP, i worked on the user and admin dashboard, and the backend of the platform.",
  //     image: "/projects/ederest.png",
  //     category: "web",
  //     technologies: [
  //       "Next.js",
  //       "TypeScript",
  //       "PostgreSQL",
  //       "Django",
  //       "Tailwind CSS",
  //       "Django",
  //     ],
  //     liveUrl: "https://ederest.com/",
  //     githubUrl: null,
  //     featured: false,
  //   },
  //   {
  //     id: 2,
  //     title: tProjects[1]?.title,
  //     description:
  //       tProjects[1]?.description ||
  //       "Carey Car Rental platform allows user to rent cars, and manage cars, and manage clients.",
  //     image: "/projects/carey.png",
  //     category: "web",
  //     technologies: ["NextJs", "Node.js", "Socket.io", "Postgresql"],
  //     liveUrl: "https://carey.ma",
  //     githubUrl: null,
  //     featured: false,
  //   },
  //   {
  //     id: 3,
  //     title: tProjects[2]?.title,
  //     description:
  //       tProjects[2]?.description || "My personal portfolio website.",
  //     image: "/projects/portfolio.png",
  //     category: "web",
  //     technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
  //     liveUrl: "https://ashrafess.me",
  //     githubUrl: "https://github.com/ashrafess00/my-portfolio-v2",
  //     featured: false,
  //   },
  //   {
  //     //Cub3D
  //     id: 4,
  //     title: tProjects[3]?.title,
  //     description: tProjects[3]?.description,
  //     image: null,
  //     category: "42",
  //     technologies: ["Docker", "wordpress", "MariaDB", "php"],
  //     liveUrl: null,
  //     githubUrl: "https://github.com/ashrafess00/Inception",
  //     featured: false,
  //   },
  //   {
  //     id: 5,
  //     title: tProjects[4]?.title || "",
  //     description: tProjects[4]?.description,
  //     image: null,
  //     category: "42",
  //     technologies: ["C++", "HTML", "CSS"],
  //     liveUrl: null,
  //     githubUrl: "https://github.com/ashrafess00/webserv",
  //     featured: false,
  //   },
  //   {
  //     id: 6,
  //     title: tProjects[5]?.title,
  //     description: tProjects[5]?.description,
  //     image: null,
  //     category: "42",
  //     technologies: [
  //       "C++",
  //       "HTML",
  //       "CSS",
  //       "JavaScript",
  //       "React",
  //       "Node.js",
  //       "Express",
  //       "MongoDB",
  //     ],
  //     liveUrl: null,
  //     githubUrl: "https://github.com/ashrafess00/ft_transcendence",
  //     featured: false,
  //   },
  // ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tProjects
            .filter((project) => {
              if (activeFilter === "all") return true;
              return project.category === activeFilter;
            })
            .map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:opacity-0 transition-opacity duration-300"></div>
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
                      <div className="text-6xl text-blue-500 opacity-20">
                        💻
                      </div>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}

                  {/* Hover Overlay */}
                  {hoveredProject === project.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300">
                      <div className="flex space-x-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                          >
                            View Code
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Project Links */}
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                    <div className="flex space-x-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
