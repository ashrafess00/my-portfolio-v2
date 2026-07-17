import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import axios from "axios";
import { useTranslations } from "next-intl";
import { SOCIALS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    aria-hidden
  >
    <path d="M3 10h14M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("HomePage.contactSection");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-item").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    setIsSubmitting(true);
    try {
      await axios.post("/api/contact", { name, email, subject, message });
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success(t("toast.success"));
    } catch {
      toast.error(t("toast.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full border-b border-hairline bg-transparent py-2 text-[14px] text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors";
  const labelClass =
    "mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground";

  return (
    <section ref={sectionRef} className="relative border-b border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: pitch + info */}
          <div className="reveal-item lg:col-span-5">
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="font-serif italic text-accent">04</span>
              <span className="h-px w-8 bg-rule" />
              <span>{t("sectionLabel")}</span>
            </div>

            <h2 className="mt-8 font-serif text-[38px] font-light leading-[1.03] tracking-[-0.02em] text-foreground text-balance sm:text-[52px]">
              {t("titleLine1")}{" "}
              <em className="italic text-accent-warm">{t("titleLine2")}</em>
            </h2>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-muted-foreground">
              {t("description")}
            </p>

            <dl className="mt-12 space-y-6 border-t border-hairline pt-8 text-[13px]">
              <div className="grid grid-cols-[110px_1fr] items-baseline gap-4">
                <dt className={labelClass + " mb-0"}>{t("contactInfo.email")}</dt>
                <dd>
                  <a
                    href={`mailto:${SOCIALS.email}`}
                    className="border-b border-rule pb-1 text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {SOCIALS.email}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] items-baseline gap-4">
                <dt className={labelClass + " mb-0"}>{t("contactInfo.phone")}</dt>
                <dd dir="ltr" className="text-foreground">
                  <a
                    href={SOCIALS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-rule pb-1 transition-colors hover:border-accent hover:text-accent"
                  >
                    {SOCIALS.phone}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] items-baseline gap-4">
                <dt className={labelClass + " mb-0"}>Elsewhere</dt>
                <dd className="flex flex-wrap gap-4 text-foreground">
                  <a
                    href={SOCIALS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-rule pb-0.5 transition-colors hover:border-accent hover:text-accent"
                  >
                    GitHub
                  </a>
                  <a
                    href={SOCIALS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-rule pb-0.5 transition-colors hover:border-accent hover:text-accent"
                  >
                    LinkedIn
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: form */}
          <div className="reveal-item lg:col-span-7">
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-start justify-center rounded-sm border border-hairline bg-surface/40 p-8 md:p-10">
                <span className="font-serif text-[15px] italic text-accent">
                  ✦
                </span>
                <h3 className="mt-4 font-serif text-[28px] font-light text-foreground">
                  {t("success.title")}
                </h3>
                <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
                  {t("success.message")}
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 border-b border-rule pb-1 text-[12px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {t("success.sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="rounded-sm border border-hairline bg-surface/40 p-6 md:p-10">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <label className="block">
                      <span className={labelClass}>{t("form.name")}</span>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("form.namePlaceholder")}
                        className={inputClass}
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>{t("form.email")}</span>
                      <input
                        type="email"
                        required
                        maxLength={255}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("form.emailPlaceholder")}
                        className={inputClass}
                      />
                    </label>
                  </div>

                  <div className="mt-6">
                    <span className={labelClass}>{t("form.message")}</span>
                    <textarea
                      required
                      maxLength={1000}
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("form.messagePlaceholder")}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {t("footer.role")}
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-[13px] font-medium tracking-wide text-accent-foreground transition-all hover:bg-accent-warm disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? t("form.sending") : t("form.send")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
