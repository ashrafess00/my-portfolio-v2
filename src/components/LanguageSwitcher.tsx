"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { setCookie } from "@/lib/actions";
import { Globe } from "lucide-react";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0]
  );

  // Initialize selectedLanguage from cookie on mount
  useEffect(() => {
    const getLangFromCookie = () => {
      const match = document.cookie.match(/(?:^|; )lang=([^;]*)/);
      return match ? decodeURIComponent(match[1]) : null;
    };

    const langCode = getLangFromCookie();
    if (langCode) {
      const found = languages.find((lang) => lang.code === langCode);
      if (found) setSelectedLanguage(found);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setCookie("lang", language.code);
    setIsOpen(false);
  };

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       variant="outline"
    //       size="sm"
    //       className="flex items-center gap-2 min-w-[120px] bg-transparent"
    //     >
    //       <span className="text-lg">{selectedLanguage.flag}</span>
    //       <span className="hidden sm:inline">{selectedLanguage.name}</span>
    //       <span className="sm:hidden">
    //         {selectedLanguage.code.toUpperCase()}
    //       </span>
    //       <ChevronDown className="h-4 w-4" />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="w-48">
    //     {languages.map((language) => (
    //       <DropdownMenuItem
    //         key={language.code}
    //         onClick={() => handleLanguageChange(language)}
    //         className="flex items-center gap-3 cursor-pointer"
    //       >
    //         <span className="text-lg">{language.flag}</span>
    //         <div className="flex flex-col">
    //           <span className="font-medium">{language.name}</span>
    //           <span className="text-xs text-muted-foreground">
    //             {language.code.toUpperCase()}
    //           </span>
    //         </div>
    //       </DropdownMenuItem>
    //     ))}
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 text-white hover:scale-105"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {selectedLanguage.code === "en" ? "EN" : "عر"}
        </span>
        <div
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg viewBox="0 0 12 12" fill="currentColor">
            <path
              d="M2 4l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* English Option */}
        <button
          onClick={() =>
            handleLanguageChange({ code: "en", name: "English", flag: "🇺🇸" })
          }
          className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
            selectedLanguage.code === "en"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-700"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
              EN
            </div>
            <span className="font-medium">English</span>
          </div>
          {selectedLanguage.code === "en" && (
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          )}
        </button>

        {/* Arabic Option */}
        <button
          onClick={() =>
            handleLanguageChange({ code: "ar", name: "العربية", flag: "🇸🇦" })
          }
          className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
            selectedLanguage.code === "ar"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-700"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
              عر
            </div>
            <span className="font-medium">العربية</span>
          </div>
          {selectedLanguage.code === "ar" && (
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
}
