import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const MarqueeTentGallery = () => {
  const tentImages = [
    {
      src: "https://images.unsplash.com/photo-1478827387698-1527781a4887?w=800&q=80",
      alt: "Large white marquee tent setup for an outdoor event",
      caption: "18x9m Marquee Tent - Event Setup",
    },
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      alt: "Interior of a spacious marquee tent with seating arrangement",
      caption: "Interior View - 18x9m Marquee",
    },
    {
      src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      alt: "Elegant marquee tent decorated for a wedding reception",
      caption: "Wedding Reception Setup",
    },
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      alt: "Large marquee tent with open sides showing the structure",
      caption: "18x9m Marquee Structure",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        18x9m Marquee Tent Gallery
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Our premium 18x9m marquee tents are perfect for large events, weddings,
        corporate functions, and exhibitions. These spacious structures provide
        ample room for seating, entertainment, and catering services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {tentImages.map((image, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-gray-50 dark:bg-gray-800">
              <p className="text-gray-700 dark:text-gray-200 font-medium">
                {image.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Specifications:
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Dimensions: 18m x 9m (162 square meters)</li>
          <li>Height: 4m peak height, 2.5m side height</li>
          <li>Material: Heavy-duty PVC with aluminum frame</li>
          <li>Wind resistance: Up to 80km/h</li>
          <li>Setup time: Approximately 4-6 hours with professional team</li>
          <li>Capacity: Up to 200 people seated or 300 standing</li>
        </ul>
      </div>

      <div className="text-center">
        <Button
          className="bg-[#1b5e20] hover:bg-[#0d3d11] text-white px-6 py-3 rounded-md shadow-md"
          onClick={() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            } else {
              window.location.href = "/#contact";
            }
          }}
        >
          Request Quote for 18x9m Marquee
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MarqueeTentGallery;
