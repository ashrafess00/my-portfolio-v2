import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PROFILE_IMAGE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const SectionLabel = ({ index, title }: { index: string; title: string }) => (
  <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
    <span className="font-serif italic text-accent">{index}</span>
    <span className="h-px w-8 bg-rule" />
    <span>{title}</span>
  </div>
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("HomePage.aboutSection");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: (i % 3) * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const services = ["hotels", "restaurants", "custom"] as const;

  return (
    <section ref={sectionRef} className="relative border-b border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="reveal-item">
          <SectionLabel index="01" title={t("sectionLabel")} />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Statement + copy */}
          <div className="lg:col-span-7">
            <p className="reveal-item font-serif text-[32px] font-light leading-[1.15] tracking-[-0.015em] text-foreground text-balance sm:text-[42px] lg:text-[50px]">
              {t("titleLine1")}{" "}
              <em className="italic text-accent-warm">{t("titleLine2")}</em>
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-hairline pt-8 sm:grid-cols-2 md:gap-12">
              <p className="reveal-item text-[14px] leading-relaxed text-muted-foreground">
                {t("paragraph1")}
              </p>
              <p className="reveal-item text-[14px] leading-relaxed text-muted-foreground">
                {t("paragraph2")}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 border-t border-hairline pt-8 sm:grid-cols-3 md:gap-10">
              {services.map((key) => (
                <div key={key} className="reveal-item">
                  <div className="font-serif text-[17px] italic text-accent">
                    {t(`services.${key}.title`)}.
                  </div>
                  <div className="mt-2 text-[13px] leading-snug text-muted-foreground">
                    {t(`services.${key}.desc`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="reveal-item lg:col-span-5">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface">
                {PROFILE_IMAGE ? (
                  <>
                    <Image
                      src={PROFILE_IMAGE}
                      alt="Achraf Essaoudi"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(3,15,24,0) 40%, rgba(3,15,24,0.45) 100%)",
                      }}
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center border border-hairline">
                    <span className="font-serif text-[15px] italic text-muted-foreground">
                      Photo coming soon
                    </span>
                  </div>
                )}
              </div>
              <figcaption className="mt-4 flex items-start gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="mt-2 h-px w-6 bg-rule" />
                <span className="normal-case">
                  <span className="font-serif italic text-foreground">
                    Achraf Essaoudi
                  </span>{" "}
                  — Martil, Morocco.
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
