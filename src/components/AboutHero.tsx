"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("AboutPage.aboutHero");
  const description = t.raw("description");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-blue-200 mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-300 mb-6 leading-relaxed">
              {description[0]}
            </p>
            <p className="text-lg text-gray-600 dark:text-slate-400 mb-8 leading-relaxed">
              {description[1]}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-6">
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  1+
                </div>
                <div className="text-sm text-gray-600 dark:text-blue-100">
                  {t("yearsOfExperience")}
                </div>
              </div>
              {/* <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  50+
                </div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div> */}
            </div>
          </div>

          {/* Image */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl text-white font-bold">AE</span>
                  </div>
                  <p className="text-gray-600 dark:text-blue-100">
                    {/* Your Photo Here */}
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 dark:bg-blue-800 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 dark:bg-purple-800 rounded-full animate-bounce animation-delay-1000"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-pink-500 dark:bg-pink-800 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
