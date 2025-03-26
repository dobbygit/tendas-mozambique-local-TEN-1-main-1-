import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Calendar, Tent, Truck } from "lucide-react";
import BackgroundTrees from "./BackgroundTrees";

interface RentalRequestSectionProps {
  className?: string;
  backgroundImage?: string;
}

const RentalRequestSection: React.FC<RentalRequestSectionProps> = ({
  className = "",
  backgroundImage = "https://images.unsplash.com/photo-1478827387698-1527781a4887?w=1200&q=80",
}) => {
  const [rentalType, setRentalType] = useState("");
  const [duration, setDuration] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ rentalType, duration, phoneNumber });
    // Show success message
    setSubmitted(true);
    // Reset form after delay
    setTimeout(() => {
      setRentalType("");
      setDuration("");
      setPhoneNumber("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section
      className={`relative w-full overflow-hidden rounded-xl ${className}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b5e20]/90 to-black/70" />
        <BackgroundTrees count={8} opacity={0.07} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex flex-col items-center max-w-6xl mx-auto mb-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Rent Premium Outdoor Equipment
          </motion.h2>
          <motion.p
            className="text-lg text-green-100 max-w-2xl text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            High-quality tents, shade structures, and equipment for your events,
            camping trips, or commercial needs
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 max-w-6xl mx-auto">
          {/* Left content */}
          <motion.div
            className="flex flex-col gap-6 w-full md:w-2/5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <Tent className="mr-2 h-5 w-5" /> Why Rent With Us
              </h3>
              <ul className="space-y-2 text-green-100">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  Premium quality equipment
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  Flexible rental periods
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  Professional setup and takedown
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  Competitive pricing
                </li>
              </ul>
            </div>

            <motion.a
              href="/rental"
              className="bg-white text-[#1b5e20] font-semibold py-4 px-8 rounded-md text-center inline-block shadow-lg"
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              View Full Rental Catalog
            </motion.a>
          </motion.div>

          {/* Form fields */}
          <motion.div
            className="w-full md:w-3/5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Request Received!
                </h3>
                <p className="text-green-100">
                  We'll contact you shortly with rental information and
                  availability.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  Quick Rental Inquiry
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-white text-sm font-medium mb-2">
                      EQUIPMENT TYPE
                    </label>
                    <select
                      className="bg-white/10 border border-white/30 text-white py-3 px-4 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      value={rentalType}
                      onChange={(e) => setRentalType(e.target.value)}
                      required
                    >
                      <option value="" disabled className="text-gray-700">
                        Select equipment type
                      </option>
                      <option value="tent" className="text-gray-700">
                        Tent
                      </option>
                      <option value="carport" className="text-gray-700">
                        Car Shade Port
                      </option>
                      <option value="tarpaulin" className="text-gray-700">
                        Tarpaulin
                      </option>
                      <option value="awning" className="text-gray-700">
                        Awning
                      </option>
                      <option value="other" className="text-gray-700">
                        Other
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-white text-sm font-medium mb-2">
                      RENTAL DURATION
                    </label>
                    <select
                      className="bg-white/10 border border-white/30 text-white py-3 px-4 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    >
                      <option value="" disabled className="text-gray-700">
                        Select duration
                      </option>
                      <option value="1-day" className="text-gray-700">
                        1 Day
                      </option>
                      <option value="weekend" className="text-gray-700">
                        Weekend (2-3 days)
                      </option>
                      <option value="week" className="text-gray-700">
                        1 Week
                      </option>
                      <option value="month" className="text-gray-700">
                        1 Month
                      </option>
                      <option value="custom" className="text-gray-700">
                        Custom Period
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label className="text-white text-sm font-medium mb-2">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      className="bg-white/10 border border-white/30 text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <motion.button
                    type="submit"
                    className="w-full bg-[#1b5e20] hover:bg-[#2e7d32] text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Rental Information
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RentalRequestSection;
