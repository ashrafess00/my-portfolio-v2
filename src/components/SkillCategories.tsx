"use client";

import { useState, useEffect } from "react";

const SkillCategories = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("skill-categories");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const skillCategories = [
    {
      category: "Frontend Development",
      skills: [
        { name: "React", level: 95, color: "from-blue-500 to-cyan-500" },
        { name: "Next.js", level: 90, color: "from-gray-800 to-gray-900" },
        { name: "TypeScript", level: 85, color: "from-blue-600 to-blue-700" },
        {
          name: "JavaScript",
          level: 95,
          color: "from-yellow-400 to-yellow-500",
        },
        { name: "HTML/CSS", level: 98, color: "from-orange-500 to-red-500" },
        { name: "Tailwind CSS", level: 90, color: "from-cyan-400 to-blue-500" },
      ],
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Node.js", level: 90, color: "from-green-500 to-green-600" },
        { name: "Express.js", level: 85, color: "from-gray-600 to-gray-700" },
        { name: "Python", level: 80, color: "from-blue-500 to-yellow-500" },
        { name: "PostgreSQL", level: 75, color: "from-blue-600 to-blue-700" },
        { name: "MongoDB", level: 80, color: "from-green-500 to-green-600" },
        { name: "REST APIs", level: 90, color: "from-purple-500 to-pink-500" },
      ],
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", level: 95, color: "from-orange-500 to-red-500" },
        { name: "Docker", level: 75, color: "from-blue-500 to-blue-600" },
        { name: "AWS", level: 70, color: "from-orange-500 to-yellow-500" },
        { name: "Figma", level: 80, color: "from-purple-500 to-pink-500" },
        { name: "Agile", level: 85, color: "from-green-500 to-blue-500" },
        { name: "CI/CD", level: 75, color: "from-gray-600 to-gray-700" },
      ],
    },
  ];

  return (
    <section id="skill-categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My proficiency levels across various technologies and frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.category}
              className={`bg-gray-50 rounded-xl p-6 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${
                          skill.color
                        } h-2 rounded-full transition-all duration-1000 ease-out ${
                          isVisible ? "w-full" : "w-0"
                        }`}
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${
                            categoryIndex * 200 + skillIndex * 100
                          }ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillCategories;
