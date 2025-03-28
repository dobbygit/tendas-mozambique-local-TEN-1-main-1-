import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { submitRentalRequest } from "../lib/api";
import { Calendar, Tent, Truck } from "lucide-react";
import BackgroundTrees from "./BackgroundTrees";

interface RentalRequestSectionProps {
  className?: string;
  backgroundImage?: string;
  selectedRentalType?: string;
}

const RentalRequestSection: React.FC<RentalRequestSectionProps> = ({
  className = "",
  backgroundImage = "https://images.unsplash.com/photo-1658509942695-ba0fe6453ffb?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  selectedRentalType = "",
}) => {
  const [rentalType, setRentalType] = useState(selectedRentalType);
  const [duration, setDuration] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Update rental type when selectedRentalType prop changes
  useEffect(() => {
    if (selectedRentalType) {
      setRentalType(selectedRentalType);
    }
  }, [selectedRentalType]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real implementation, you would send data to your backend
      // const response = await fetch('/api/rental-requests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ rentalType, duration, phoneNumber }),
      // });
      //
      // if (!response.ok) throw new Error('Failed to submit request');

      console.log("Rental request submitted:", {
        rentalType,
        duration,
        phoneNumber,
      });

      // Show success message
      setSubmitted(true);

      // Reset form after delay
      setTimeout(() => {
        setRentalType("");
        setDuration("");
        setPhoneNumber("");
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting rental request:", err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                      <option
                        value="18x9 200man Marquee tent"
                        className="text-gray-700"
                      >
                        18x9 200man Marquee Tent
                      </option>

                      <option value="5x5 event tents" className="text-gray-700">
                        5x5 event tents
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
                  {error && (
                    <p className="text-red-300 text-sm mb-4">{error}</p>
                  )}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#1b5e20] hover:bg-[#2e7d32] text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors duration-300 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        Processing...
                      </div>
                    ) : (
                      "Request Rental Information"
                    )}
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
