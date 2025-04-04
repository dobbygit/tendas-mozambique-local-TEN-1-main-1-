import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft, FileImage, Home } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { LanguageProvider } from "./LanguageContext";
import WhatsAppChat from "./WhatsAppChat";
import LocalProductImageManager from "./LocalProductImageManager";
import PageTransition from "./PageTransition";

const LocalImagePageContent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FFF8DC] dark:bg-gray-900">
        <Header onThemeToggle={toggleTheme} isDarkMode={theme === "dark"} />
        <main className="pt-28 pb-20">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <Link
                to="/"
                className="hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors duration-200 flex items-center"
                onClick={() => window.scrollTo(0, 0)}
              >
                <Home className="h-3.5 w-3.5 mr-1" />
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-[#1b5e20] dark:text-green-400 font-medium flex items-center">
                <FileImage className="h-3.5 w-3.5 mr-1" />
                Local Image Manager
              </span>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <LocalProductImageManager />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center bg-[#1b5e20] hover:bg-[#0d3d11] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold border-2 border-[#1b5e20]/20"
                onClick={() => window.scrollTo(0, 0)}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppChat phoneNumber="+258843989573" />
      </div>
    </PageTransition>
  );
};

export default function LocalImagePage() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LocalImagePageContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
