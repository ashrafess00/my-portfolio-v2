import { motion, useScroll, useTransform } from "framer-motion";

const Navbar = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);

  const links = ["About", "Projects", "Contact"];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ backgroundColor: `hsl(220 20% 4% / ${bgOpacity})` }}
    >
      <motion.div
        className="max-w-6xl mx-auto flex items-center justify-between glass rounded-full px-6 py-3"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <a
          href="#"
          className="font-heading font-bold text-lg text-foreground tracking-tight"
        >
          <span className="text-primary">{"<"}</span>dev
          <span className="text-primary">{"/>"}</span>
        </a>
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            Let&apos;s Talk
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
