import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import BackgroundTrees from "./BackgroundTrees";
import WhatsAppChat from "./WhatsAppChat";
import ClickSound from "./ClickSound";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactSection from "./ContactSection";

const ContactPage = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ContactContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

const ContactContent = () => {
  const { theme, toggleTheme } = useTheme();

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations = {
      "contact.title": "Contact Us",
      "contact.subtitle": "We're here to help with all your tent and PVC needs",
      "contact.heading": "Get in Touch",
      "contact.description":
        "Have questions about our products or services? Need a quote for a custom project? We're here to help! Reach out to us using any of the methods below.",
      "contact.address": "Beira, Mozambique",
      "contact.phone": "+258 843989573",
      "contact.email": "info@tendasdemozambique.com",
      "contact.hours": "Monday - Friday: 8am - 5pm",
      "contact.sendMessage": "Send Message",
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
        <div className="relative w-full h-[300px] md:h-[250px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1b5e20] to-[#0d3311]">
            <BackgroundTrees count={10} opacity={0.1} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-8 md:px-16 max-w-7xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t("contact.title")}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl max-w-2xl text-green-100 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("contact.subtitle")}
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Contact Information */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1b5e20] dark:text-green-400">
                {t("contact.heading")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                {t("contact.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: (
                    <MapPin className="h-8 w-8 text-[#1b5e20] dark:text-green-400" />
                  ),
                  title: "Address",
                  content: t("contact.address"),
                },
                {
                  icon: (
                    <Phone className="h-8 w-8 text-[#1b5e20] dark:text-green-400" />
                  ),
                  title: "Phone",
                  content: t("contact.phone"),
                },
                {
                  icon: (
                    <Mail className="h-8 w-8 text-[#1b5e20] dark:text-green-400" />
                  ),
                  title: "Email",
                  content: t("contact.email"),
                },
                {
                  icon: (
                    <Clock className="h-8 w-8 text-[#1b5e20] dark:text-green-400" />
                  ),
                  title: "Business Hours",
                  content: t("contact.hours"),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact Form Section */}
          <ContactSection />

          {/* Map Section */}
          <section className="mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04711154905!2d34.78849242318268!3d-19.844842196590382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1f2a71a0f0a1a3bd%3A0x1e1340ceb2c0d0e4!2sBeira%2C%20Mozambique!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tendas de Mozambique Location"
                  className="w-full h-full"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/place/Beira,+Mozambique",
                      "_blank",
                    )
                  }
                ></iframe>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppChat phoneNumber="+258843989573" />
    </div>
  );
};

export default ContactPage;
