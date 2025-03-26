import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import BackgroundTrees from "./BackgroundTrees";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  backgroundImage?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "Premium Outdoor Tents & Shelters",
  subtitle = "Durable, weather-resistant tents for camping, events, and outdoor adventures",
  ctaText = "Explore Tents",
  backgroundImage = "https://images.unsplash.com/photo-1658509942695-ba0fe6453ffb?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  onCtaClick = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  },
}: HeroSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations = {
      "hero.title": "TENDAS DE MOZAMBIQUE",
      "hero.subtitle":
        "HIGH QUALITY TARPAULINS, TENTS AND MUCH MORE, MADE FOR THE AFRICAN SUN",
      "hero.cta": "Explore Tents",
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

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y,
          opacity,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
      {/* Background Trees */}
      <div className="absolute inset-0 z-[1]">
        <BackgroundTrees count={25} opacity={0.06} />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white max-w-5xl mx-auto">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/new-logo.svg"
            alt="Tendas Mozambique Logo"
            className="h-40 mx-auto"
          />
        </motion.div>
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("hero.title")}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-12 text-gray-200 uppercase tracking-widest max-w-3xl font-light font-sans "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="bg-white text-[#1b5e20] hover:bg-gray-100 px-12 py-7 text-xl rounded-md shadow-xl flex items-center font-semibold"
            onClick={onCtaClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
            {t("hero.cta")}
          </Button>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          animate-alt={{
            y: [0, 10, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </motion.div>
        <div className="w-[401px] h-[189px]"></div>
      </div>
    </section>
  );
};

export default HeroSection;
