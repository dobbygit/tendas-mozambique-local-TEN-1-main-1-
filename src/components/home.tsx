import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundTrees from "./BackgroundTrees";
import ClickEffect from "./ClickEffect";
import ClickSound from "./ClickSound";

import Header from "./Header";
import HeroSection from "./HeroSection";
import ProductShowcase from "./ProductShowcase";
import StatisticsSection from "./StatisticsSection";
import LocationMap from "./LocationMap";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import WhatsAppChat from "./WhatsAppChat";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { LanguageProvider } from "./LanguageContext";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [mounted, setMounted] = useState(false);

  // Handle initial mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <HomeContent mounted={mounted} />
      </LanguageProvider>
    </ThemeProvider>
  );
};

interface HomeContentProps {
  mounted: boolean;
}

const HomeContent = ({ mounted }: HomeContentProps) => {
  const { theme, toggleTheme } = useTheme();

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FFF8DC] dark:bg-gray-900 transition-colors duration-300">
      <ClickEffect />
      <ClickSound soundType="mechanical" volume={0.2} />
      <Header onThemeToggle={toggleTheme} isDarkMode={theme === "dark"} />
      <main className="bg-[#FFF8DC]">
        {/* Hero Section with Parallax Effect */}
        <section id="hero" className="w-full">
          <HeroSection />
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative">
          <BackgroundTrees count={10} opacity={0.03} className="fixed" />
          {/* Product Showcase with Interactive Elements */}
          <section id="products">
            <ProductShowcase />
          </section>
          {/* Statistics Section with Animated Counters */}
          <section id="statistics">
            <StatisticsSection />
          </section>
          {/* Location Map Section */}
          <section id="location" className="mb-24">
            <LocationMap />
          </section>
          {/* Rental CTA Section */}
          <section className="-mx-4 sm:-mx-6 lg:-mx-8 mb-24"><div className="relative w-full overflow-hidden rounded-xl bg-[#1b5e20] py-16">
            
              <BackgroundTrees count={10} opacity={0.07} />
              <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Need Equipment for Your Next Event?
                </motion.h2>
                <motion.p
                  className="text-xl text-green-100 mb-10"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  We offer premium tents, shade structures, and outdoor
                  equipment rentals for any occasion
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    to="/rental"
                    className="inline-flex items-center bg-white text-[#1b5e20] font-semibold py-4 px-8 rounded-md shadow-lg hover:bg-gray-50 transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/rental";
                    }}
                  >
                    View Rental Options
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
          {/* Contact Section with Interactive Form */}
          <section id="contact">
            <ContactSection />
          </section>
        </div>
      </main>
      <Footer />
      {/* WhatsApp Contact Button */}
      <WhatsAppChat phoneNumber="+258843989573" />
      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-lg z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Home;
