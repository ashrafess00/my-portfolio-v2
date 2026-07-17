import { useTranslations } from "next-intl";
import HeroMockup from "@/components/HeroMockup";

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    aria-hidden
  >
    <path
      d="M3 10h14M12 5l5 5-5 5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IntroSection = () => {
  const t = useTranslations("HomePage.introSection");

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const stats = [
    // { k: t("stats.projectsK"), v: t("stats.projectsV") },
    { k: t("stats.yearsK"), v: t("stats.yearsV") },
    // { k: t("stats.referralK"), v: t("stats.referralV") },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft warm wash top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-[0.15] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212,163,115,0.5), transparent 60%)",
        }}
      />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pb-24 pt-14 md:px-10 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-20">
        {/* Left: copy */}
        <div className="reveal lg:col-span-6 lg:pr-6">
          {/* <div className="mb-9 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="font-serif italic text-accent">{t("eyebrow")}</span>
            <span className="h-px w-8 bg-rule" />
            <span>{t("location")}</span>
          </div> */}

          <h1 className="font-serif text-[42px] font-light leading-[1.03] tracking-[-0.02em] text-foreground text-balance sm:text-[54px] lg:text-[66px]">
            {t("titleLine1")}{" "}
            <em className="italic text-accent-warm">{t("titleHighlight")}</em>{" "}
            {t("titleLine3")}
          </h1>

          <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground text-pretty">
            {t("tagline")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-[13px] font-medium tracking-wide text-accent-foreground transition-all hover:bg-accent-warm"
            >
              {t("viewMyWork")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-2 border-b border-rule pb-1 text-[13px] tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t("getInTouch")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <dl className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-hairline pt-8 text-start">
            {stats.map((s) => (
              <div key={s.v}>
                <dt className="font-serif text-2xl font-light text-foreground">
                  {s.k}
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: desk + monitor */}
        <div
          className="reveal relative lg:col-span-6"
          style={{ animationDelay: "0.15s" }}
        >
          <HeroMockup />
        </div>
      </div>

      {/* Bottom hairline meta */}
      {/* <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:px-10">
          <span>{t("meta")}</span>
          <button
            onClick={() => scrollTo("about")}
            className="hidden items-center gap-2 transition-colors hover:text-accent sm:inline-flex"
          >
            {t("scroll")} <span className="text-accent">↓</span>
          </button>
        </div>
      </div> */}
    </section>
  );
};

export default IntroSection;
