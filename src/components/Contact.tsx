import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import SectionHeader from "./SectionHeader";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("/api/contact", formData);
      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeader label="Contact" title="Let's Work Together" />

        <motion.form
          className="glass-strong rounded-2xl p-8 md:p-10 space-y-6"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-body text-muted-foreground uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-body text-muted-foreground uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-body text-muted-foreground uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-heading font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
