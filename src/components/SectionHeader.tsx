import { motion } from "motion/react";
const SectionHeader = ({ label, title }: { label: string; title: string }) => (
  <motion.div
    className="mb-16 text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
  >
    <span className="text-xs font-body text-primary uppercase tracking-[0.3em] mb-3 block">
      {label}
    </span>
    <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
      {title}
    </h2>
  </motion.div>
);

export default SectionHeader;
