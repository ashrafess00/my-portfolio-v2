"use client";

import { useState, useEffect } from "react";

const ExperienceTimeline = () => {
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

    const element = document.getElementById("experience-timeline");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const experiences = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description:
        "Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.",
      technologies: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL"],
    },
    {
      id: 2,
      title: "Full-Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description:
        "Built and maintained multiple web applications from concept to deployment. Collaborated with design and product teams to deliver user-centric solutions.",
      technologies: [
        "Next.js",
        "MongoDB",
        "Express.js",
        "Tailwind CSS",
        "Socket.io",
      ],
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Digital Agency ABC",
      period: "2019 - 2020",
      description:
        "Developed responsive websites and web applications for various clients. Focused on performance optimization and accessibility.",
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "Webpack"],
    },
    {
      id: 4,
      title: "Junior Developer",
      company: "Web Solutions Ltd.",
      period: "2018 - 2019",
      description:
        "Started my professional journey building websites and learning modern web development practices.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
    },
  ];

  return (
    <section id="experience-timeline" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My professional journey in web development and software engineering.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gray-200"></div>

          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative mb-12 ${
                index % 2 === 0
                  ? "md:pr-8 md:text-right"
                  : "md:pl-8 md:text-left"
              } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>

              {/* Content */}
              <div className="ml-12 md:ml-0 bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {experience.title}
                  </h3>
                  <span className="text-sm text-blue-600 font-medium">
                    {experience.period}
                  </span>
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-3">
                  {experience.company}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {experience.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
