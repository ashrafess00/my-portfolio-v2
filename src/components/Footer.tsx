import { useTranslations } from "next-intl";
import { SOCIALS } from "@/lib/site";

const Footer = () => {
  const t = useTranslations("HomePage.contactSection");
  const tn = useTranslations("Navigation");

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const year = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-rule font-serif text-[13px] italic text-foreground">
                ae
              </span>
              <span className="font-serif text-[16px] italic text-foreground">
                Achraf Essaoudi
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[12px] leading-relaxed text-muted-foreground">
              {t("footer.role")} — building calm, reliable websites for
              businesses that care about the details.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Sitemap
            </div>
            <ul className="mt-4 space-y-2 text-[13px] text-foreground">
              {["about", "projects", "skills", "contact"].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="hover:text-accent"
                  >
                    {tn(id)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Elsewhere
            </div>
            <ul className="mt-4 space-y-2 text-[13px] text-foreground">
              <li>
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SOCIALS.email}`}
                  className="hover:text-accent"
                >
                  {SOCIALS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row sm:items-center">
          <span>© {year} Achraf Essaoudi</span>
          {/* <span className="normal-case">
            <span className="font-serif italic text-foreground">Set in Fraunces &amp; Inter</span>{" "}
            — handmade with care.
          </span> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
