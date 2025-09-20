import { useTranslations } from "next-intl";
import Link from "next/link";

const Education = () => {
  const t = useTranslations("AboutPage.educationAndCertifications");
  const education: {
    id: number;
    degree: string;
    school: string;
    period: string;
    description: string;
  }[] = t.raw("education");
  // const education = [
  //   {
  //     id: 1,
  //     degree: "IT & Software Engineering",
  //     school: "1337 Coding School Med",
  //     period: "2018 - present",
  //     description: "Studied at 1337 coding school in Med, Morocco.",
  //   },
  //   {
  //     id: 2,
  //     degree: "English Studies",
  //     school: "University Moulay Ismail",
  //     period: "2018 - 2020",
  //     description:
  //       "Studied in university Moulay Ismail in Meknes, Morocco, focusing on English language and literature.",
  //   },
  // ];

  const certifications = [
    {
      name: "React and ECMAScript",
      issuer: "IBM",
      date: "2022",
      link: "https://www.credly.com/badges/4715e4f6-5231-4bfe-b862-0dc290e7044f?source=linked_in_profile",
    },
    {
      name: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "2021",
      link: "https://www.freecodecamp.org/certification/ashrafess010/javascript-algorithms-and-data-structures",
    },
    {
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2021",
      link: "https://www.freecodecamp.org/certification/ashrafess010/responsive-web-design",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {t("educationTitle")}
            </h3>
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
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {t("certificationsTitle")}
            </h3>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <Link
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div>
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
                </Link>
              ))}
            </div>

            {/* Additional Training */}
            <div className="mt-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                {t("additionalTraining.title")}
              </h4>
              <div className="space-y-3">
                {/* <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Data structures with C</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Docker</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Mobile Development</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Network Principles</span>
                </div> */}
                {t
                  .raw("additionalTraining.additionalSkills")
                  .map((value: string, index: number) => {
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{value}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
