import SectionHeader from "./SectionHeader";
import { motion } from "motion/react";
import Link from "next/link";
import { projects } from "@/data/projects";

const Projects = () => {
  const largeProjects = projects.filter((p) => p.size === "large");
  const smallProjects = projects.filter((p) => p.size === "small");

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Portfolio" title="Selected Work" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-6">
            {largeProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

          <div className="md:col-span-1 flex flex-col gap-6">
            {smallProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const isExternal = project.uri.startsWith("http");
  const cardContent = (
    <motion.div
      className="group relative glass rounded-2xl overflow-hidden hover-glow cursor-pointer h-full flex flex-col"
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: 0.85,
        ease: [0.22, 0.61, 0.36, 1],
        delay: index * 0.12,
      }}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      <div
        className={`relative overflow-hidden flex-shrink-0 ${project.size === "large" ? "h-64 md:h-80" : "h-48"}`}
      >
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="text-sm font-heading font-medium text-primary border border-primary/30 rounded-full px-5 py-2">
            View Project →
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-body text-primary/80 bg-primary/[0.08] rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a
        href={project.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={project.uri} className="block h-full">
      {cardContent}
    </Link>
  );
};

export default Projects;
