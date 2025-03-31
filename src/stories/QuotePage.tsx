import React from "react";
import { motion } from "framer-motion";
import QuoteRequestSection from "./QuoteRequestSection";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { LanguageProvider } from "./LanguageContext";
import ClickSound from "../components/ClickSound";
import WhatsAppChat from "./WhatsAppChat";

const QuotePage = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <QuotePageContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

const QuotePageContent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-gray-900 transition-colors duration-300">
      <ClickSound soundType="mechanical" volume={0.2} />
      <Header onThemeToggle={toggleTheme} isDarkMode={theme === "dark"} />

      <main className="w-full pt-24">
        {/* Hero Banner */}
        <div className="relative w-full h-64 bg-[#1b5e20] mb-12">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Request a Quote
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Fill out the form below to get a personalized quote for your event
              or project
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quote Request Form */}
          <QuoteRequestSection className="rounded-xl overflow-hidden shadow-xl" />

          {/* Additional Information */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-[#1b5e20] dark:text-green-400">
                Our Process
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We follow a simple 3-step process to ensure you get exactly what
                you need:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Submit your quote request</li>
                <li>Receive a detailed proposal within 24 hours</li>
                <li>Finalize details and confirm your booking</li>
              </ol>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4 text-[#1b5e20] dark:text-green-400">
                What We Offer
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Custom tent solutions for any event size</li>
                <li>Professional installation and setup</li>
                <li>Weather-resistant materials</li>
                <li>Flexible rental periods</li>
                <li>Additional accessories and equipment</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 text-[#1b5e20] dark:text-green-400">
                Contact Information
              </h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Phone:</strong> +258 843 989 573
                </p>
                <p>
                  <strong>Email:</strong> sales@tendasmozambique.com
                </p>
                <p>
                  <strong>Address:</strong> Rua General Viera da Rocha, 244,
                  Munhava Industrial, Beira, Mozambique
                </p>
                <p>
                  <strong>Hours:</strong> Monday-Friday: 8am-5pm, Saturday:
                  9am-1pm
                </p>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-[#1b5e20] dark:text-green-400">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  How far in advance should I book?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We recommend booking at least 2-4 weeks in advance for
                  standard events, and 1-2 months for large events or during
                  peak season.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Do you offer delivery and setup?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes, we provide professional delivery, setup, and takedown
                  services for all our tent rentals throughout Mozambique.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We accept bank transfers, mobile payments (M-Pesa, etc.), and
                  cash payments. A deposit is required to secure your booking.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Can you accommodate custom designs?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Absolutely! We specialize in custom tent solutions. Let us
                  know your specific requirements in the quote request form.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <WhatsAppChat phoneNumber="+258843989573" />
    </div>
  );
};

export default QuotePage;
