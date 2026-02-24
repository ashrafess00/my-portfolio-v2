"use client";
import FloatingOrbs from "@/components/FloatingOrbs";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative noise-bg">
      <FloatingOrbs />
      <GridBackground />
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
