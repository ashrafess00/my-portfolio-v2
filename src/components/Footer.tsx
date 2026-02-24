const socialAccounts = [
  {
    name: "GitHub",
    link: "https://github.com/ashrafess00",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/achrafessaoudi/",
  },
];
const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground font-body">
        © 2026 Achraf Essaoudi. Built with passion.
      </span>
      <div className="flex items-center gap-6">
        {socialAccounts.map((s) => (
          <a
            key={s.name}
            href={s.link}
            target="_blank"
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
          >
            {s.name}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
