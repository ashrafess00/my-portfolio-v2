import SectionHeader from "./SectionHeader";
import { motion } from "motion/react";

const projects = [
  {
    title: "Education Tech Platform",
    desc: "My first 6 months internship was at Ederest startup, where i worked on the user and admin dashboard from scratch, and the backend of the platform.",
    tags: ["TypeScript", "NextJs", "Django"],
    img: "/projects/ederest.png",
    size: "large",
  },
  {
    title: "Golden Ambassador",
    desc: "Am exclusive platform for referral system built with Laravel and react",
    tags: ["Laravel", "React", "MySql", "Hostinger", "TypScript"],
    img: "/projects/ga.png",
    size: "small",
  },
  {
    title: "Food Tracker Platform",
    desc: "Natinx is a SaaS platform that tracks food from cooperative until the custom, and a QR code is generated at the end that shows all steps food went through",
    tags: ["React", "Tanstack", "GraphQl", "Supabase"],
    img: "/projects/natinx.png",
    size: "small",
  },
  {
    title: "Carey Car Rental Platform",
    desc: "Carey Car Rental platform allows user to rent cars, and manage cars, contributed to fix bugs, and add some missing features in it.",
    tags: ["TypeScript", "Docker", "React", "PostgreSQL"],
    img: "/projects/carey.png",
    size: "large",
  },
];

const Projects = () => (
  <section id="projects" className="relative py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionHeader label="Portfolio" title="Selected Work" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => (
  <motion.div
    className={`group relative glass rounded-2xl overflow-hidden hover-glow cursor-pointer ${
      project.size === "large" ? "md:col-span-2 md:row-span-2" : ""
    }`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -6, scale: 1.01 }}
  >
    {/* Placeholder image area */}
    <div
      className={`relative overflow-hidden ${project.size === "large" ? "h-64 md:h-80" : "h-48"}`}
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

    <div className="p-6">
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-2">
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

export default Projects;
