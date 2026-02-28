import { motion } from "motion/react";
const SectionHeader = ({ label, title }: { label: string; title: string }) => (
  <motion.div
    className="mb-16 text-center"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
    transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
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
