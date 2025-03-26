import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "./LanguageContext";

interface HeaderProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

const Header = ({
  onThemeToggle = () => {},
  isDarkMode = false,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations = {
      "nav.home": "Home",
      "nav.tents": "Tents",
      rental: "Rental",
      "nav.whyUs": "Why Us",
      "nav.contact": "Contact",
    };
    return defaultTranslations[key] || key;
  };

  // Try to use the language context, fall back to default if not available
  let t = defaultT;
  try {
    const languageContext = useLanguage();
    t = languageContext.t;
  } catch (error) {
    // Use the default translation function if not in a LanguageProvider
  }

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const isHomePage = currentPath === "/";

  const navLinks = [
    { name: t("nav.home"), href: "#", id: "hero" },
    { name: t("nav.tents"), href: "#products", id: "products" },
    {
      name: "Rentals",
      href: "/rental",
      id: "rentals",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (isHomePage) {
          window.location.href = "/rental";
        } else {
          window.location.href = "/rental";
        }
      },
    },
    { name: t("nav.whyUs"), href: "#statistics", id: "statistics" },
    { name: t("nav.location"), href: "#location", id: "location" },
    { name: t("nav.contact"), href: "#contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent z-50 transition-colors duration-300">
      <div className="container mx-auto  bg- [#FFF8DC] py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <img
              src="/new-logo.svg"
              alt="Tendas Mozambique"
              className="h-16 mr-2"
            />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#A9A9A9]">
                {" "}
                {/* Changed text color to light grey */}
                Tendas Mozambique
              </span>
              <div className="hidden md:flex text-xs text-[#A9A9A9] font-medium space-x-4">
                {" "}
                {/* Updated text color */}
                <span>Rua General Viera da Rocha, 244, Munhava Industrial</span>
                <span>|</span>
                <span>+258 843 454 750</span>
                <span>|</span>
                <span>sales@tendasmozambique.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={
                isHomePage
                  ? link.href
                  : link.href.startsWith("#")
                  ? `/${link.href}`
                  : link.href
              }
              onClick={(e) => {
                e.preventDefault();
                if (link.onClick) {
                  link.onClick(e);
                } else {
                  if (isHomePage) {
                    const element = document.getElementById(link.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  } else {
                    window.location.href = isHomePage
                      ? link.href
                      : `/${link.href}`;
                  }
                }
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-[#A9A9A9] font-medium transition-colors duration-200 cursor-pointer"
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Language Selector, Theme Toggle, and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-[#1b5e20]/10 dark:hover:bg-[#4caf50]/10"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={
                    isHomePage
                      ? link.href
                      : link.href.startsWith("#")
                      ? `/${link.href}`
                      : link.href
                  }
                  className="text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-[#4caf50] py-2 font-medium transition-colors duration-200 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    if (link.onClick) {
                      link.onClick(e);
                    } else {
                      if (!isHomePage) {
                        window.location.href = isHomePage
                          ? link.href
                          : `/${link.href}`;
                      } else {
                        window.location.href = isHomePage
                          ? link.href
                          : `/${link.href}`;
                      }

                      const element = document.getElementById(link.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
