"use client";
import { useTranslations } from "use-intl";

const ContactInfo = () => {
  const t = useTranslations("ContactPage.contactDetails");
  const contactMethods = [
    {
      id: 1,
      title: t("email"),
      value: process.env.NEXT_PUBLIC_EMAIL,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      title: t("phone"),
      value: process.env.NEXT_PUBLIC_PHONE_NUMBER,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      title: "Location",
      value: process.env.NEXT_PUBLIC_LOCATION,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: process.env.NEXT_PUBLIC_GITHUB_URL,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 12.017C20 6.484 15.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: process.env.NEXT_PUBLIC_LINKEDIN_URL,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-200 mb-8">
              {t("getInTouch")}
            </h2>
            <div className="space-y-6">
              {contactMethods.map((method) => (
                <div key={method.title} className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 ${method.bgColor} dark:bg-slate-800 rounded-lg flex items-center justify-center ${method.color} dark:text-blue-300`}
                  >
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-blue-100">
                      {method.title}
                    </h3>
                    <p
                      dir={`${method.id === 1 ? "ltr" : "auto"}`}
                      className="text-gray-600 dark:text-blue-100"
                    >
                      {method.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-200 mb-8">
              {t("followMe")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="text-gray-600 dark:text-blue-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {social.icon}
                  </div>
                  <span className="font-medium text-gray-700 dark:text-blue-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-xl text-white">
              <h3 className="text-xl font-bold mb-2">
                {t("currentAvailability")}
              </h3>
              <p className="text-blue-100 dark:text-blue-200 mb-4">
                {t("currentAvailability2")}
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">{t("currentAvailability3")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-blue-200 mb-4">
            {t("title2")}
          </h3>
          <p className="text-gray-600 dark:text-blue-100 max-w-2xl mx-auto">
            {t("description2")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
