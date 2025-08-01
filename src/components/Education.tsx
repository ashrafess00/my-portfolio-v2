const Education = () => {
  const education = [
    {
      id: 1,
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      period: "2018 - 2020",
      description:
        "Specialized in Software Engineering and Web Technologies. Graduated with honors.",
      gpa: "3.9/4.0",
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      period: "2014 - 2018",
      description:
        "Focused on algorithms, data structures, and software development principles.",
      gpa: "3.8/4.0",
    },
  ];

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google",
      date: "2022",
    },
    {
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2021",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Education & Certifications
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My academic background and professional certifications that support
            my expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Education</h3>
            <div className="space-y-6">
              {education.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-gray-900">
                      {item.degree}
                    </h4>
                    <span className="text-sm text-blue-600 font-medium">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    {item.school}
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="text-sm text-gray-500">
                    GPA:{" "}
                    <span className="font-semibold text-gray-700">
                      {item.gpa}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={cert.name}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">
                      {cert.name}
                    </h4>
                    <span className="text-sm text-blue-600 font-medium">
                      {cert.date}
                    </span>
                  </div>
                  <div className="text-gray-600">{cert.issuer}</div>
                </div>
              ))}
            </div>

            {/* Additional Training */}
            <div className="mt-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Additional Training
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Advanced React Patterns</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">
                    System Design & Architecture
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">DevOps & CI/CD</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">UI/UX Design Principles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
