import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import BackgroundTrees from "./BackgroundTrees";
import WhatsAppChat from "./WhatsAppChat";
import ClickSound from "./ClickSound";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Award,
  Wrench,
  MapPin,
  Users,
} from "lucide-react";
import AfricanSunBanner from "./AfricanSunBanner";

const WhyUsPage = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <WhyUsContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

const WhyUsContent = () => {
  const { theme, toggleTheme } = useTheme();

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations = {
      "whyUs.title": "Why Choose Us",
      "whyUs.subtitle":
        "Tendas de Mozambique - Your trusted partner for high-quality tents and PVC products",
      "whyUs.heading": "Crafting Excellence in Every Stitch",
      "whyUs.paragraph1":
        "A company based in Beira making tarpaulins, tents, carports, bakkie covers, truck frames and canopies, awnings, drop blinds and doing all general heavy duty canvas and PVC work.",
      "whyUs.paragraph2":
        "We make standard tents and custom tents – from the smallest dome tent to the largest party marquee or warehouse tent. Using only the best materials and designs, we are suppliers to many heavy duty users such as safari camps, long term construction camps, the military and the police.",
      "whyUs.paragraph3":
        "Tendas de Mozambique has a wide range of colours in material proven to stand up to the Moçambique sun.",
      "whyUs.contactUs": "Contact Us Today",
      "whyUs.challenge": "Give us a challenge…",
      "whyUs.challengeDescription":
        "Contact us with your requirement and our expert tent staff will guide you through our range.",
      "whyUs.expertiseTitle": "Our Expertise & Services",
      "whyUs.expertiseDescription":
        "With years of experience and dedication to quality, we provide comprehensive solutions for all your tent and PVC needs.",
      "whyUs.ctaTitle": "Give Us a Challenge",
      "whyUs.ctaDescription":
        "Contact us with your requirement and our expert tent staff will guide you through our range. We can come on site to advise on a new camp or to repair an existing tent.",
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
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-gray-900 transition-colors duration-300">
      <ClickSound soundType="mechanical" volume={0.2} />
      <Header onThemeToggle={toggleTheme} isDarkMode={theme === "dark"} />
      <main className="w-full pt-24">
        {/* Hero Banner */}
        <div className="relative w-full h-[500px] md:h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1b5e20] to-[#0d3311]">
            <BackgroundTrees count={15} opacity={0.1} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between text-white px-8 md:px-16 max-w-7xl mx-auto">
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center mb-4">
                <motion.h1
                  className="text-4xl md:text-6xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {t("whyUs.title")}
                </motion.h1>
              </div>
              <motion.p
                className="text-lg md:text-xl max-w-2xl text-green-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t("whyUs.subtitle")}
              </motion.p>
              <Link to="/">
                <motion.button
                  className="mt-6 bg-white text-[#1b5e20] font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {t("whyUs.exploreOurProducts")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </Link>
            </div>
            <motion.div
              className="hidden md:block relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            ></motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          {/* African Sun Banner */}
          <AfricanSunBanner className="mt-8" />
          {/* Main Content */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1b5e20] dark:text-green-400">
                {t("whyUs.heading")}
              </h2>

              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("whyUs.paragraph1")}
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("whyUs.paragraph2")}
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("whyUs.paragraph3")}
              </p>

              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-[#1b5e20] text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-[#2e7d32] transition-colors duration-300"
                >
                  {t("whyUs.contactUs")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-w-16 aspect-h-9"></div>
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-gray-100 dark:bg-gray-800 rounded-xl relative overflow-hidden">
            <BackgroundTrees count={8} opacity={0.05} />
            <div className="relative z-10 max-w-6xl mx-auto px-4">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center">
                  <Link to="/">
                    <img
                      src="/new-logo.svg"
                      alt="Tendas Mozambique Logo"
                      className="h-16 mb-4 cursor-pointer"
                    />
                  </Link>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1b5e20] dark:text-green-400">
                    {t("whyUs.expertiseTitle")}
                  </h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                  {t("whyUs.expertiseDescription")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: (
                      <Award className="h-10 w-10 text-[#1b5e20] dark:text-green-400" />
                    ),
                    title: t("whyUs.premiumQualityMaterials"),
                    description: t("whyUs.premiumQualityMaterialsDesc"),
                  },
                  {
                    icon: (
                      <Wrench className="h-10 w-10 text-[#1b5e20] dark:text-green-400" />
                    ),
                    title: t("whyUs.customSolutions"),
                    description: t("whyUs.customSolutionsDesc"),
                  },
                  {
                    icon: (
                      <Users className="h-10 w-10 text-[#1b5e20] dark:text-green-400" />
                    ),
                    title: t("whyUs.expertStaff"),
                    description: t("whyUs.expertStaffDesc"),
                  },
                  {
                    icon: (
                      <MapPin className="h-10 w-10 text-[#1b5e20] dark:text-green-400" />
                    ),
                    title: t("whyUs.onSiteServices"),
                    description: t("whyUs.onSiteServicesDesc"),
                  },
                  {
                    icon: (
                      <CheckCircle className="h-10 w-10 text-[#1b5e20] dark:text-green-400" />
                    ),
                    title: t("whyUs.trustedByProfessionals"),
                    description: t("whyUs.trustedByProfessionalsDesc"),
                  },
                  {
                    icon: (
                      <div className="h-10 w-10 flex items-center justify-center text-[#1b5e20] dark:text-green-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                      </div>
                    ),
                    title: t("whyUs.wideColorRange"),
                    description: t("whyUs.wideColorRangeDesc"),
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative w-full overflow-hidden rounded-xl bg-[#1b5e20] py-16">
            <BackgroundTrees count={10} opacity={0.07} />
            <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {t("whyUs.ctaTitle")}
              </motion.h2>
              <motion.p
                className="text-xl text-green-100 mb-10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t("whyUs.ctaDescription")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-white text-[#1b5e20] font-semibold py-4 px-8 rounded-md shadow-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  {t("whyUs.contactUs")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppChat phoneNumber="+258843989573" />
    </div>
  );
};

export default WhyUsPage;
