import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsOverview from "@/components/SkillsOverview";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      <FeaturedProjects />
      <SkillsOverview />
      <ContactCTA />
    </div>
  );
}
