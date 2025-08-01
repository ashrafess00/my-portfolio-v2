import SkillsHero from "@/components/SkillsHero";
import SkillCategories from "@/components/SkillCategories";
import ToolsAndTechnologies from "@/components/ToolsAndTechnologies";

export default function Skills() {
  return (
    <div className="pt-16">
      <SkillsHero />
      <SkillCategories />
      <ToolsAndTechnologies />
    </div>
  );
}
