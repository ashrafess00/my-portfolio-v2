const PersonalInfo = () => {
  const personalDetails = [
    { label: "Name", value: "Your Name" },
    { label: "Age", value: "28 years" },
    { label: "Location", value: "San Francisco, CA" },
    { label: "Email", value: "hello@yourname.com" },
    { label: "Phone", value: "+1 (555) 123-4567" },
    { label: "Freelance", value: "Available" },
  ];

  const interests = [
    "Web Development",
    "UI/UX Design",
    "Open Source",
    "Reading Tech Blogs",
    "Hiking",
    "Photography",
    "Coffee",
    "Travel",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Personal Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Personal Details
            </h2>
            <div className="space-y-4">
              {personalDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center py-3 border-b border-gray-100"
                >
                  <span className="font-semibold text-gray-700 w-32">
                    {detail.label}:
                  </span>
                  <span className="text-gray-600">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Interests & Hobbies
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <div
                  key={interest}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
