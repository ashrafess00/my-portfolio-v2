import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsOverview from "@/components/SkillsOverview";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <div className="pt-16">
      {/* <div className="absolute min-w-screen min-h-screen overflow-hidden"> */}
      {/* <div className="sticky top-0 flex justify-center items-center h-screen opacity-10">
          <img
            src="/logo/logo.png"
            alt="hero"
            className="w-1/2 transition-transform duration-500 ease-out"
          />
        </div> */}
      {/* </div> */}
      <HeroSection />
      <FeaturedProjects />
      <SkillsOverview />
      <ContactCTA />
    </div>
  );
}
