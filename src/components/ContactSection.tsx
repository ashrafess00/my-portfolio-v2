import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
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
      toast.success("Message sent! I'll get back to you soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 section-padding"
    >
      <div className="absolute top-0 left-6 md:left-24 text-[20vw] font-display font-bold text-muted/30 select-none pointer-events-none leading-none">
        05
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="contact-reveal line-accent mb-8 mx-auto" />

        <h2 className="contact-reveal font-display text-[10vw] md:text-[6vw] font-bold leading-[0.9] text-center mb-4">
          Let`&apos;s build
          <br />
          <span className="text-gradient">something great.</span>
        </h2>

        <p className="contact-reveal text-dim font-body text-base md:text-lg text-center max-w-md mx-auto mb-12 leading-relaxed">
          Got a project in mind? Drop me a message and let`&apos;s make it
          happen.
        </p>

        {sent ? (
          <div className="contact-reveal max-w-lg mx-auto text-center py-12 px-6 border border-primary/20 rounded-lg bg-primary/5">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Send className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
              Message sent
            </h3>
            <p className="text-dim font-body text-sm md:text-base mb-8 max-w-sm mx-auto">
              Thanks for reaching out. I`&apos;ll get back to you as soon as I
              can.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-display text-sm tracking-[0.2em] uppercase px-6 py-3 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="contact-reveal max-w-lg mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block font-display text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-border focus:border-primary text-foreground font-body text-sm py-3 px-1 outline-none transition-colors duration-300 placeholder:text-muted-foreground/40"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-display text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-border focus:border-primary text-foreground font-body text-sm py-3 px-1 outline-none transition-colors duration-300 placeholder:text-muted-foreground/40"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-display text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                maxLength={1000}
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-b border-border focus:border-primary text-foreground font-body text-sm py-3 px-1 outline-none transition-colors duration-300 resize-none placeholder:text-muted-foreground/40"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group font-display text-sm tracking-[0.2em] uppercase px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-3 mx-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send message"}
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>
        )}

        <div className="contact-reveal flex items-center justify-center gap-6 mt-16">
          <a
            href="https://github.com/ashrafess00"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            GitHub
          </a>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <a
            href="https://www.linkedin.com/in/achrafessaoudi/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-32 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-dim text-xs font-body">
          © 2025 — Designed & Developed with intention
        </p>
        <p className="text-dim text-xs font-body tracking-[0.2em] uppercase">
          Full Stack Developer
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
