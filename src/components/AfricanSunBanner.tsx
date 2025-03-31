import React from "react";
import { motion } from "framer-motion";

interface AfricanSunBannerProps {
  className?: string;
}

const AfricanSunBanner = ({ className = "" }: AfricanSunBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-xl shadow-lg ${className}`}
    >
      <div className="bg-gradient-to-r from-[#ff9800] to-[#ff5722] p-8 md:p-12">
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-white opacity-10">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                fill="currentColor"
                d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-1.5C87,13.3,81.4,26.6,73.7,38.6C66.1,50.6,56.3,61.3,44.2,68.5C32.1,75.8,17.8,79.5,2.9,75.8C-12,72.1,-27.4,61,-39.2,49.8C-51,38.6,-59.2,27.4,-65.2,14.2C-71.2,1,-75,-14.2,-71.8,-27.8C-68.6,-41.3,-58.5,-53.3,-45.8,-61.1C-33.1,-68.9,-17.8,-72.5,-1.3,-70.5C15.3,-68.5,30.5,-83.5,44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Made for the African Sun
            </h3>
          </div>

          <p className="text-white/90 text-lg mb-6">
            Our products are designed and manufactured specifically to withstand
            the harsh African climate. Using UV-resistant materials and durable
            construction techniques, we ensure longevity even under the most
            challenging conditions.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="text-white font-semibold">UV Resistant</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="text-white font-semibold">Weather Proof</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="text-white font-semibold">Durable Materials</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AfricanSunBanner;
