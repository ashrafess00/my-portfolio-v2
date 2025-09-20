import { useTranslations } from "next-intl";

const PersonalInfo = () => {
  const t = useTranslations("AboutPage.personalDetails");
  const today = new Date();
  const birthMonth = 9;
  const birthYear = 2000;
  let age = today.getFullYear() - birthYear;
  if (
    today.getMonth() < birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() < 1) // replace 1 with your birth day
  ) {
    age--;
  }
  const personalDetails = [
    { label: t("name"), value: "Achraf Essaoudi" },
    { label: t("age"), value: `${age} ${t("age2")}` },
    { label: t("location"), value: t("location2") },
    { label: t("email"), value: process.env.NEXT_PUBLIC_EMAIL },
    { label: t("phone"), value: process.env.NEXT_PUBLIC_PHONE_NUMBER },
    { label: t("freelance"), value: t("freelance2") },
  ];

  const interests = t.raw("interestsAndHobbies.interestsAndHobbies");

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Personal Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t("title")}
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
              {t("interestsAndHobbies.title")}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest: string) => (
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
