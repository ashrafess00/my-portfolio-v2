"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Send } from "lucide-react";
import { Postmark } from "@/components/notebook/Doodles";
import { SectionHeading } from "@/components/notebook/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { PROFILE_IMAGE, SOCIALS } from "@/lib/site";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("HomePage.contactSection");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useReveal(sectionRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${name}`;
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

  const lineInput =
    "w-full border-b-2 border-ink/70 bg-transparent py-1 font-hand text-[21px] text-ink placeholder:text-ink-faint/70 transition-colors focus:border-cobalt focus:outline-none";
  const addressLink =
    "underline decoration-paper-line decoration-2 underline-offset-4 transition-colors hover:text-cobalt hover:decoration-cobalt";

  return (
    <section ref={sectionRef} className="relative px-4 pb-16 pt-10 sm:px-8 md:pb-24 md:pt-14">
      <SectionHeading
        note={t("note")}
        label={t("sectionLabel")}
        title={
          <>
            {t("titleLine1")}{" "}
            <span className="marker [--marker:var(--mint)]">{t("titleLine2")}</span>
          </>
        }
      />
      <p data-reveal className="mx-auto mt-4 max-w-md text-center text-[15px] leading-relaxed text-ink-soft">
        {t("description")}
      </p>

      {/* The postcard */}
      <div
        data-reveal
        className="airmail mx-auto mt-12 max-w-[980px] rounded-md p-2 shadow-[0_30px_50px_-28px_rgba(28,27,24,0.6)] md:-rotate-[0.6deg]"
      >
        <div className="grid rounded-[3px] bg-[#fffdf8] md:grid-cols-[1.35fr_1fr]">
          {/* Message side */}
          <div className="order-2 border-t-2 border-dashed border-paper-line p-6 sm:p-9 md:order-1 md:border-e-2 md:border-t-0">
            {sent ? (
              <div className="relative flex h-full min-h-[22rem] flex-col items-start justify-center">
                <span
                  aria-hidden
                  className="absolute end-0 top-0 rotate-[-12deg] rounded-md border-4 border-double border-tangerine px-3 py-1 font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-tangerine opacity-85"
                >
                  {t("postcard.delivered")}
                </span>
                <p className="font-hand text-[42px] leading-none text-ink">
                  {t("success.title")}{" "}
                  <span className="emoji">✈️</span>
                </p>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                  {t("success.message")}
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink underline decoration-2 underline-offset-[6px] hover:decoration-wavy"
                >
                  {t("success.sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex h-full flex-col">
                <label htmlFor="postcard-message" className="font-note text-[28px] leading-none text-ink">
                  {t("postcard.dear")}
                </label>
                <textarea
                  id="postcard-message"
                  required
                  maxLength={1000}
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("form.messagePlaceholder")}
                  className="ruled-field mt-3 w-full resize-none rounded-sm bg-transparent font-hand text-[21px] text-ink placeholder:text-ink-faint/70 focus:bg-sky/25 focus:outline-none"
                />

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-note text-[21px] leading-none text-ink-soft">
                      {t("postcard.from")}
                    </span>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("form.namePlaceholder")}
                      className={lineInput}
                    />
                  </label>
                  <label className="block">
                    <span className="font-note text-[21px] leading-none text-ink-soft">
                      {t("postcard.replyTo")}
                    </span>
                    <input
                      type="email"
                      required
                      maxLength={255}
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("form.emailPlaceholder")}
                      className={lineInput}
                    />
                  </label>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex h-12 items-center gap-3 rounded-[4px] bg-ink pe-5 ps-2 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-paper transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--sun)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-[3px] bg-tangerine">
                      <Send
                        aria-hidden
                        className="h-4 w-4 transition-[translate,rotate] group-hover:translate-x-0.5 group-hover:-rotate-12 rtl:-scale-x-100"
                        strokeWidth={2.4}
                      />
                    </span>
                    {isSubmitting ? t("form.sending") : t("form.send")}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Address side */}
          <div className="relative order-1 p-6 sm:p-9 md:order-2">
            <div className="flex items-start justify-between gap-4">
              <Postmark text={t("postcard.postmark")} className="h-24 w-36 -rotate-12 text-cobalt/70" />
              <div className="stamp shrink-0 rotate-3 bg-cream p-2.5 pb-1.5">
                <div className="relative h-24 w-20 overflow-hidden bg-paper-line">
                  {PROFILE_IMAGE && (
                    <Image
                      src={PROFILE_IMAGE}
                      alt=""
                      fill
                      sizes="160px"
                      className="origin-[50%_35%] scale-[1.6] object-cover object-top"
                    />
                  )}
                </div>
                <p className="mt-1 text-center font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink">
                  ★ MA ★
                </p>
              </div>
            </div>

            <p className="mt-6 font-note text-[22px] leading-none text-ink-soft">
              {t("postcard.to")}
            </p>
            <ul className="mt-2 border-t-2 border-paper-line font-hand text-[20px] text-ink">
              <li className="border-b-2 border-paper-line py-1.5">Achraf Essaoudi</li>
              <li className="border-b-2 border-paper-line py-1.5">
                <a href={`mailto:${SOCIALS.email}`} className={addressLink}>
                  {SOCIALS.email}
                </a>
              </li>
              <li className="border-b-2 border-paper-line py-1.5">
                <a
                  href={SOCIALS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className={addressLink}
                >
                  {SOCIALS.phone}
                </a>
              </li>
              <li className="flex gap-5 border-b-2 border-paper-line py-1.5">
                {[
                  { href: SOCIALS.github, label: "GitHub" },
                  { href: SOCIALS.linkedin, label: "LinkedIn" },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 ${addressLink}`}
                  >
                    {label}
                    <ArrowUpRight aria-hidden className="h-4 w-4 rtl:-scale-x-100" strokeWidth={2.2} />
                  </a>
                ))}
              </li>
            </ul>

            <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
              {t("postcard.airmail")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
