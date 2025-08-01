import AboutHero from "@/components/AboutHero";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Education from "@/components/Education";
import PersonalInfo from "@/components/PersonalInfo";

export default function About() {
  return (
    <div className="pt-16">
      <AboutHero />
      <PersonalInfo />
      <ExperienceTimeline />
      <Education />
    </div>
  );
}
