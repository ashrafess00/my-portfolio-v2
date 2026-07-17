import { useTranslations } from "next-intl";

const ClientsMarquee = () => {
  const t = useTranslations("HomePage.introSection");
  const items = t.raw("clients") as string[];
  const doubled = [...items, ...items];

  return (
    <section
      aria-label="Who I build for"
      className="border-y border-hairline bg-surface/40 py-6"
    >
      <div className="relative overflow-hidden">
        <div className="marquee flex w-max gap-14 whitespace-nowrap">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-14 font-serif text-[22px] font-light italic text-muted-foreground"
            >
              {item}
              <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
        {/* fade edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24"
          style={{ background: "linear-gradient(90deg, var(--background), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{ background: "linear-gradient(-90deg, var(--background), transparent)" }}
        />
      </div>
    </section>
  );
};

export default ClientsMarquee;
