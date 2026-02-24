import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 88 },
  { name: "UI/UX Design", level: 85 },
  { name: "DevOps / Cloud", level: 78 },
];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects Delivered" },
  // { value: "15+", label: "Happy Clients" },
  // { value: "99%", label: "Client Satisfaction" },
];

const About = () => (
  <section id="about" className="relative py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionHeader label="About" title="Who I Am" />

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground font-body leading-relaxed mb-6">
            I&apos;m a full stack developer with a passion for creating elegant,
            performant web applications. I specialize in building products that
            sit at the intersection of design and engineering — where every
            pixel matters and every millisecond counts.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-10">
            When I&apos;m not coding, you&apos;ll find me exploring new
            technologies, contributing to open source, or sketching UI concepts.
            I believe great software is built with empathy, curiosity, and
            relentless attention to detail.
          </p>

          {/* Skills */}
          {/* <div className="space-y-5">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-heading font-medium text-foreground">
                    {skill.name}
                  </span>
                  <span className="text-primary font-body">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div> */}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center hover-glow transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="font-heading text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-body uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
