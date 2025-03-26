import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "./LanguageContext";

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  // Default values in case the component is used outside a LanguageProvider
  let language = "en";
  let setLanguage = (lang: "en" | "pt") => {};

  try {
    const languageContext = useLanguage();
    language = languageContext.language;
    setLanguage = languageContext.setLanguage;
  } catch (error) {
    // Use defaults if not in a LanguageProvider
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className="rounded-md bg-white/10 hover:bg-white/20 flex items-center gap-1 px-3 transition-colors duration-200 border-white/20"
          aria-label="Change language"
          onClick={() => setLanguage(language === "en" ? "pt" : "en")}
        >
          <Globe className="h-4 w-4 text-white" />
          <span className="text-[#A9A9A9] text-sm font-medium uppercase">
            {language === "en" ? "EN" : "PT"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector;
