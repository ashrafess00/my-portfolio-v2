"use client";
import Navbar from "@/components/Navbar";
import IntroSection from "@/components/IntroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomeContent() {
  return (
    <>
      <Navbar />
      <IntroSection />
      {/* scroll-mt keeps section tops clear of the sticky navbar */}
      <div id="about" className="scroll-mt-14">
        <AboutSection />
      </div>
      <div id="projects" className="scroll-mt-14">
        <ProjectsSection />
      </div>
      <div id="skills" className="scroll-mt-14">
        <SkillsSection />
      </div>
      <div id="contact" className="scroll-mt-14">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}
