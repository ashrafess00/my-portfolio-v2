const ToolsAndTechnologies = () => {
  const additionalSkills = [
    {
      category: "Frameworks & Libraries",
      skills: [
        "Redux",
        "Zustand",
        "React Query",
        "Framer Motion",
        "Three.js",
        "Socket.io",
        "Jest",
        "Cypress",
        "Storybook",
        "Webpack",
        "Vite",
      ],
    },
    {
      category: "Cloud & DevOps",
      skills: [
        "Vercel",
        "Netlify",
        "Heroku",
        "DigitalOcean",
        "Google Cloud",
        "Firebase",
        "Supabase",
        "Redis",
        "Elasticsearch",
        "Kubernetes",
      ],
    },
    {
      category: "Design & UI/UX",
      skills: [
        "Adobe XD",
        "Sketch",
        "InVision",
        "Protopie",
        "Principle",
        "Accessibility",
        "Responsive Design",
        "Design Systems",
        "User Research",
      ],
    },
    {
      category: "Other Skills",
      skills: [
        "SEO",
        "Performance Optimization",
        "Progressive Web Apps",
        "Microservices",
        "GraphQL",
        "Serverless",
        "Machine Learning Basics",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Additional Tools & Technologies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Beyond the core technologies, I work with a wide range of tools and
            frameworks to deliver the best solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {additionalSkills.map((category) => (
            <div
              key={category.category}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Learning Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Always Learning</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            I&apos;m constantly exploring new technologies and methodologies to
            stay current with industry trends and deliver cutting-edge
            solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
              Currently Learning: Rust
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
              Exploring: Web3 & Blockchain
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
              Next: AI/ML Integration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsAndTechnologies;
