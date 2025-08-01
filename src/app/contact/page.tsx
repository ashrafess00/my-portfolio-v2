import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";

export default function Contact() {
  return (
    <div className="pt-16">
      <ContactHero />
      <ContactForm />
      <ContactInfo />
    </div>
  );
}
