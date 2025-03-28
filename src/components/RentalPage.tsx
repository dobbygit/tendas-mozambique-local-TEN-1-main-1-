import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RentalRequestSection from "./RentalRequestSection";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import ClickSound from "./ClickSound";
import WhatsAppChat from "./WhatsAppChat";
import { getAvailableRentalItems } from "../lib/api";
import {
  Tent,
  Car,
  Umbrella,
  Calendar,
  Clock,
  DollarSign,
  Truck,
  CheckCircle,
} from "lucide-react";
import BackgroundTrees from "./BackgroundTrees";

interface RentalItem {
  id: number;
  name: string;
  description: string;
  image: string;
  dailyRate: string;
  weeklyRate: string;
  deposit: string;
  category: string;
  available?: boolean;
}

const RentalPage = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RentalPageContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

const RentalPageContent = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>("tents");
  const [rentalItems, setRentalItems] = useState<RentalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRentalItem, setSelectedRentalItem] = useState<string>("");

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations = {
      ".title": "Equipment Rental",
      "rental.subtitle":
        "High-quality tents, shade structures, and equipment for your events, camping trips, or commercial needs",
      "rental.whyRentWithUs": "Why Rent With Us",
      "rental.catalog": "Rental Catalog",
      "rental.catalogDescription":
        "Browse our selection of high-quality rental equipment for any occasion",
      "rental.allItems": "All Items",
      "rental.tents": "Tents",
      "rental.shadeStructures": "Shade Structures",
      "rental.coversAndTarpaulins": "Covers & Tarpaulins",
      "rental.contactForPricing": "Contact us for pricing and availability",
      "rental.requestQuote": "Request Quote",
      "rental.retry": "Retry",
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

  useEffect(() => {
    async function loadRentalItems() {
      try {
        setIsLoading(true);
        // In a real app, this would fetch from an API
        const items = await getAvailableRentalItems();
        setRentalItems(items);
      } catch (err) {
        console.error("Error loading rental items:", err);
        setError("Failed to load rental items. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    }

    loadRentalItems();
  }, []);

  // No need to filter by category since we're only showing the two specific tents
  const filteredItems = rentalItems;

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 transition-colors duration-300">
      <ClickSound soundType="mechanical" volume={0.2} />
      <Header onThemeToggle={toggleTheme} isDarkMode={theme === "dark"} />
      <main className="w-full bg-[#FFF8DC] pt-24">
        {/* Hero Banner */}
        <div className="relative w-full h-80 overflow-hidden">
          <div className="absolute inset-0 bg-[#2E7D32]">
            <BackgroundTrees count={15} opacity={0.1} />
          </div>

          <div className="absolute inset-0 bg-[#FFF8DC]" />

          <div className="relative z-10 h-full flex flex-col items-center text-center justify-center text-gray-800 px-8 md:px-16 max-w-5xl mx-auto backdrop-blur-sm bg-[#FFF8DC] rounded-lg py-8">
            <div className="flex items-center justify-center mb-6 w-full">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-center relative text-[#1b5e20] dark:text-green-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {" "}
                Rentals
              </motion.h1>
            </div>
            <motion.p
              className="text-lg md:text-xl max-w-2xl text-[#1b5e20] dark:text-green-400 text-center mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              High-quality tents for your events or commercial needs
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Benefits Section */}
          <section className="mb-16">
            <motion.div
              className="flex flex-col items-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/new-logo.svg"
                alt="Tendas Mozambique Logo"
                className="h-16 mb-4"
              />
              <h2 className="text-3xl font-bold text-center text-[#1b5e20] dark:text-green-400">
                Why Rent Tents With Us
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <Calendar className="h-10 w-10 text-[#1b5e20] dark:text-green-400" />
                  ),
                  title: "Flexible Rental Periods",
                  description:
                    "Daily, weekly, or monthly rental options to suit your specific needs",
                },
                {
                  icon: (
                    <CheckCircle className="h-10 w-10 text-[#1b5e20] dark:text-green-400" />
                  ),
                  title: "Premium Quality",
                  description:
                    "All equipment is regularly maintained and cleaned to ensure top condition",
                },
                {
                  icon: (
                    <Truck className="h-10 w-10 text-[#1b5e20] dark:text-green-400" />
                  ),
                  title: "Delivery & Setup",
                  description:
                    "Professional delivery, installation, and takedown services available",
                },
                {
                  icon: (
                    <DollarSign className="h-10 w-10 text-[#1b5e20] dark:text-green-400" />
                  ),
                  title: "Custom Quotes",
                  description:
                    "Personalized quotes based on your specific needs and rental duration",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 bg-[#FFF8DC] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
          {/* Rental Items Grid */}
          {!isLoading && rentalItems.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-green-100 dark:border-green-900"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="relative h-72 overflow-hidden">
                      <div className="absolute top-4 right-4 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                        {item.category}
                      </div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-8 flex-grow bg-[#FFF8DC] flex flex-col">
                      <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 font-sans tracking-tight leading-tight transition-colors duration-300 mb-3">
                        {item.name}
                      </h3>
                      <div className="flex items-center mb-4 text-green-700 dark:text-green-400">
                        <Tent className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 text-base mb-6 font-sans leading-relaxed flex-grow">
                        {item.description}
                      </p>

                      <motion.button
                        className="w-full bg-[#1b5e20] hover:bg-[#2e7d32] text-white py-4 rounded-lg transition-colors duration-300 flex items-center justify-center text-lg font-medium shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          // Set the selected rental type
                          setActiveCategory(item.category);
                          setSelectedRentalItem(item.name);

                          const rentalSection =
                            document.getElementById("rental-form");
                          if (rentalSection) {
                            rentalSection.scrollIntoView({
                              behavior: "smooth",
                            });
                            // Focus on the first input field in the form
                            const firstInput =
                              rentalSection.querySelector("select, input");
                            if (firstInput) {
                              setTimeout(() => {
                                (firstInput as HTMLElement).focus();
                              }, 500);
                            }
                          }
                        }}
                      >
                        <Calendar className="h-5 w-5 mr-2" />
                        {t("Request Quote")}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          {/* Rental Request Form */}
          <section id="rental-form" className="mb-16">
            <RentalRequestSection
              className="shadow-xl"
              selectedRentalType={selectedRentalItem}
            />
          </section>
          {/* FAQ Section */}
          <section className="mb-16"></section>
        </div>
      </main>
      <Footer />
      <WhatsAppChat phoneNumber="+258843989573" />
    </div>
  );
};

export default RentalPage;
