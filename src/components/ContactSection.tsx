import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import BackgroundTrees from "./BackgroundTrees";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Request a Quote",
  subtitle = "Need a custom tent or have questions about our products? Send us a message and we'll get back to you within 24 hours.",
  backgroundColor = "bg-slate-50 dark:bg-slate-900",
}) => {
  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations = {
      "contact.title": "Request a Quote",
      "contact.subtitle":
        "Need a custom tent or have questions about our products? Send us a message and we'll get back to you within 24 hours.",
      "contact.emailUs": "Email Us",
      "contact.callUs": "Call Us",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Send Message",
      "contact.sending": "Sending...",
      "contact.thankYou": "Thank You!",
      "contact.successMessage":
        "Your message has been sent successfully. We'll get back to you soon.",
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

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <section className="w-full py-16 bg-gray-200 dark:bg-gray-800 rounded-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[#FFF8DC] ">
        <BackgroundTrees count={12} opacity={0.04} />
      </div>
      <div className="px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column - Text content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              {t("contact.title")}
            </h2>
            <motion.p
              className="text-lg text-slate-600 dark:text-slate-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t("contact.subtitle")}
            </motion.p>
            <motion.div
              className="flex flex-col space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                    {t("contact.emailUs")}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    sales@tendasmozambique.com
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                    {t("contact.callUs")}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    +258 843 989 573
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column - Contact form */}
          <motion.div
            className="bg-[#FFF8DC] dark:bg-slate-800 rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {isSubmitted ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center py-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  {t("contact.thankYou")}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {t("contact.successMessage")}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-slate-700 dark:text-slate-200"
                  >
                    {t("contact.name")}
                  </Label>
                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    whileTap="focus"
                    animate="blur"
                  >
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder={t("contact.yourName")}
                      required
                      className="w-full border-slate-300 dark:border-slate-600 focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-slate-700 dark:text-slate-200"
                  >
                    {t("contact.email")}
                  </Label>
                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    whileTap="focus"
                    animate="blur"
                  >
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder={t("contact.yourEmail")}
                      required
                      className="w-full border-slate-300 dark:border-slate-600 focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-slate-700 dark:text-slate-200"
                  >
                    {t("contact.message")}
                  </Label>
                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    whileTap="focus"
                    animate="blur"
                  >
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder={t("contact.yourMessage")}
                      required
                      rows={5}
                      className="w-full border-slate-300 dark:border-slate-600 focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-md flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("contact.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t("contact.send")}
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
