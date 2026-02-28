"use client";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import Link from "next/link";

const ProjectDetail = ({ id }: { id: string }) => {
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <p className="text-muted-foreground font-body mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-heading font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background noise-bg">
      {/* Nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 glass rounded-full px-4 sm:px-5 py-2.5 text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Projects</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Image */}
      <motion.div
        className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 -mt-32 sm:-mt-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-body text-primary/80 bg-primary/[0.08] border border-primary/20 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Short desc */}
          <p className="text-base sm:text-lg text-primary/80 font-body mb-6 sm:mb-8">
            {project.desc}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mb-10 sm:mb-14">
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 sm:px-6 py-3 rounded-full font-heading font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass text-foreground px-5 sm:px-6 py-3 rounded-full font-heading font-medium text-sm hover-glow transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-10 sm:mb-14" />

          {/* Full Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">
              About This Project
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed text-sm sm:text-base">
              {project.fullDesc}
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="mt-10 sm:mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {project.tags.map((tag, i) => (
                <motion.div
                  key={tag}
                  className="glass rounded-xl p-4 sm:p-5 text-center hover-glow transition-all duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <span className="font-heading text-sm font-medium text-foreground">
                    {tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

type PageProps = { params: Promise<{ id: string }> };

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ProjectDetail id={id} />;
}
