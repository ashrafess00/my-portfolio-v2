"use client";

import { useState, useEffect } from "react";

const SkillsHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const expertiseAreas = [
    {
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces",
      icon: "🎨",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend Development",
      description: "Building robust server-side applications and APIs",
      icon: "⚙️",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Database Design",
      description: "Designing efficient and scalable database systems",
      icon: "🗄️",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "DevOps & Deployment",
      description: "Managing infrastructure and deployment pipelines",
      icon: "🚀",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Skills & Expertise
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I've developed a comprehensive skill set through years of hands-on
              experience in web development, design, and software engineering.
              My expertise spans from frontend to backend, with a focus on
              creating scalable, maintainable solutions.
            </p>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseAreas.map((area, index) => (
            <div
              key={area.title}
              className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${area.color} rounded-lg flex items-center justify-center text-2xl mb-4`}
              >
                {area.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {area.title}
              </h3>
              <p className="text-gray-600 text-sm">{area.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
            <div className="text-gray-600">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsHero;
