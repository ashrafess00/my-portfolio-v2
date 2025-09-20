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

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setCookie("lang", language.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 min-w-[120px] bg-transparent"
        >
          <span className="text-lg">{selectedLanguage.flag}</span>
          <span className="hidden sm:inline">{selectedLanguage.name}</span>
          <span className="sm:hidden">
            {selectedLanguage.code.toUpperCase()}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs text-muted-foreground">
                {language.code.toUpperCase()}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
