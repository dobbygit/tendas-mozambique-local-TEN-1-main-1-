import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "./LanguageContext";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

interface StatisticsSectionProps {
  title?: string;
  description?: string;
  stats?: StatItem[];
  backgroundColor?: string;
}

const StatisticsSection = ({
  title = "Why Choose Our Products",
  description = "We've been crafting premium outdoor Products for over 21 years, delivering quality and reliablity.",
  stats = [],
  backgroundColor = "bg-slate-50 dark:bg-slate-900",
}: StatisticsSectionProps) => {
  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultTranslations = {
    "stats.title": "Why Choose Our Products",
    "stats.description":
      "We've been crafting premium outdoor Products for over 21 years, delivering quality and reliablity.",
    "stats.tentsSold": "Tents Sold",
    "stats.yearsExperience": "Years Experience",
    "stats.tentModels": "Tent Models",
    "stats.satisfactionRate": "Satisfaction Rate",
  };

  // Define t function before using it
  const defaultT = (key: string) => defaultTranslations[key] || key;

  // Try to use the language context, fall back to default if not available
  let t;
  try {
    const languageContext = useLanguage();
    t = languageContext.t;
  } catch (error) {
    // Use the default translation function if not in a LanguageProvider
    t = defaultT;
  }

  const localizedStats = [
    { label: t("stats.tentsSold"), value: 25000, suffix: "+" },
    { label: t("stats.yearsExperience"), value: 15, suffix: "" },
    { label: t("stats.tentModels"), value: 50, suffix: "+" },
    { label: t("stats.satisfactionRate"), value: 98, suffix: "%" },
  ];
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 bg-[#1b5e20] text-white rounded-xl"
    >
      <div className="px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {t("stats.title")}
          </motion.h2>
          <motion.p
            className="text-xl text-green-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("stats.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {localizedStats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              isInView={isInView}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: StatItem;
  isInView: boolean;
  delay: number;
}

const StatCard = ({ stat, isInView, delay }: StatCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.value;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      className="bg-[#2e7d32] rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <h3 className="text-6xl font-bold mb-4 text-white">
        {stat.prefix}
        {count}
        {stat.suffix}
      </h3>
      <p className="text-xl text-green-100">{stat.label}</p>
    </motion.div>
  );
};

export default StatisticsSection;
