import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations: Record<string, string> = {
      "filter.allCategories": "All Categories",
      "filter.filterBy": "Filter by Category",
    };
    return defaultTranslations[key] || key;
  };

  // Try to use the language context, fall back to default if not available
  let t: ((key: string) => string) | null = null;
  try {
    const languageContext = useLanguage();
    if (languageContext && typeof languageContext.t === "function") {
      t = languageContext.t;
    } else {
      t = defaultT;
    }
  } catch (error) {
    console.error("Error accessing language context:", error);
    // Use the default translation function if not in a LanguageProvider
    t = defaultT;
  }

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCategorySelect = (category: string | null) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className="relative z-20 mb-8">
      <div className="flex flex-wrap justify-center gap-2">
        <motion.button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${!selectedCategory ? "bg-[#1b5e20] text-white shadow-md" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#1b5e20] hover:text-[#1b5e20] dark:hover:border-green-500 dark:hover:text-green-400"}`}
          onClick={() => handleCategorySelect(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t ? t("filter.allCategories") : "All Categories"}
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category ? "bg-[#1b5e20] text-white shadow-md" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#1b5e20] hover:text-[#1b5e20] dark:hover:border-green-500 dark:hover:text-green-400"}`}
            onClick={() => handleCategorySelect(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
