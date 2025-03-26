import React from "react";
import { motion } from "framer-motion";

interface LocationMapProps {
  title?: string;
  description?: string;
  address?: string;
  mapUrl?: string;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  title = "Find Us",
  description = "Visit our showroom and workshop in Beira, Mozambique",
  address = "Rua General Viera da Rocha, 244, Munhava Industrial, Beira, Sofala, Mozambique",
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4463.743501863597!2d34.84777449879579!3d-19.816841395016358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1f2a6a6521001531%3A0x7427ffdda7a9a867!2sTendas%20de%20Mozambique!5e0!3m2!1ses!2smz!4v1741769365599!5m2!1ses!2smz",
  className = "",
}) => {
  return (
    <section
      className={`w-full py-16 bg-[#FFF8DC] dark:bg-gray-800 rounded-xl ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-[#1b5e20] dark:text-green-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <motion.div
            className="md:col-span-1 bg-[#FFF8DC] dark:bg-gray-700 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-[#1b5e20] dark:text-green-400">
              Contact Information
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Address:
                </h4>
                <p className="text-gray-600 dark:text-gray-300">{address}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Phone:
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  +258 843 454 750
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  +258 843 989 573
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Email:
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  sales@tendasmozambique.com
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Business Hours:
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Monday 7:30 AM–12:30 PM,1:30–5 PM
                </p>

                <p className="text-gray-600 dark:text-gray-300">
                  Tuesday 7:30 AM–12:30 PM,1:30–5 PM
                </p>

                <p className="text-gray-600 dark:text-gray-300">
                  Wednesday 7:30 AM–12:30 PM,1:30–5 PM
                </p>

                <p className="text-gray-600 dark:text-gray-300">
                  Thursday 7:30 AM–12:30 PM,1:30–5 PM
                </p>

                <p className="text-gray-600 dark:text-gray-300">
                  Friday 7:30 AM–12:30 PM,1:30–5 PM
                </p>

                <p className="text-gray-600 dark:text-gray-300">
                  Saturday Closed , Sunday Closed
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/place/Tendas+de+Mozambique/@-19.8166437,34.8473868,17z/data=!3m1!4b1!4m6!3m5!1s0x1f2a6a6521001531:0x7427ffdda7a9a867!8m2!3d-19.8166488!4d34.8499617!16s%2Fg%2F11bzwnxmjy?hl=es&entry=ttu&g_ep=EgoyMDI1MDMwOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#1b5e20] dark:text-green-400 font-medium hover:underline mt-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Get Directions
            </a>
          </motion.div>

          <motion.div
            className="md:col-span-2 rounded-lg overflow-hidden shadow-md h-[400px] md:h-[450px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tendas Mozambique Location"
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
