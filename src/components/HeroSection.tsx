"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("HomePage.heroSection");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-blue-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light mode gradients */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:hidden"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:hidden"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:hidden"></div>
        {/* Dark mode gradients */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-blob dark:block hidden"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-800 via-blue-800 to-gray-800 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-blob animation-delay-2000 dark:block hidden"></div>
        <div className="absolute top-48 left-48 w-96 h-96 bg-gradient-to-tl from-blue-800 via-purple-700 to-gray-900 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-blob animation-delay-4000 dark:block hidden"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            {t("available")}
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 dark:text-slate-300">
            {t.rich("title", {
              name: (chunks) => (
                <span className="uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed dark:text-slate-300">
            {t.rich("subtitle", {
              subtitle: (chunks) => (
                <span className="font-semibold text-gray-900 dark:text-slate-100">
                  {chunks}
                </span>
              ),
            })}
          </p>

          {/* Stats */}
          {/* <div className="flex justify-center items-center space-x-8 mb-12 text-sm text-gray-600"> */}
          {/* <div className="flex items-center">
              <span className="font-bold text-2xl text-blue-600 mr-2">1+</span>
              <span>Years Experience</span>
            </div> */}
          {/* <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center">
              <span className="font-bold text-2xl text-purple-600 mr-2">
                N+
              </span>
              <span>Projects Completed</span>
            </div> */}
          {/* <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center">
              <span className="font-bold text-2xl text-pink-600 mr-2">N+</span>
              <span>Happy Clients</span>
            </div> */}
          {/* </div> */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/projects"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t("viewMyWork")}
            </Link>
            <Link
              href="/contact"
              className="dark:text-slate-300 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              {t("getInTouch")}
            </Link>
          </div>

          {/* Scroll indicator */}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
