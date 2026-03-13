"use client";
// import FloatingOrbs from "@/components/FloatingOrbs";
// import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
// import Projects from "@/components/Projects";
// import About from "@/components/About";
// import Contact from "@/components/Contact";
// import Footer from "@/components/Footer";
import IntroSection from "@/components/IntroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="relative noise-bg">
      <Navbar />
      <IntroSection />
      <div id="about">
        <AboutSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="skills">
        <SkillsSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
}
