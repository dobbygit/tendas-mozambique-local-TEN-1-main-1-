import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, Star, Image as ImageIcon, ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import BackgroundTrees from "./BackgroundTrees";
import ImageGallery from "./ImageGallery";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  images?: string[];
  category: string;
  capacity?: string;
  weight?: string;
  seasonality?: string;
}

interface ProductShowcaseProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
}

const ProductShowcase = ({
  title = "Premium Outdoor Tents",
  subtitle = "Explore our range of high-quality tents for camping, events, and outdoor adventures",
  products = [
    {
      id: 1,
      name: "Tarpaulins",
      description:
        "Heavy-duty waterproof PVC tarpaulins for various outdoor applications. Using our specialized high frequency sealing machines we are able to custom make tarpaulins to fit your load and storage needs which means the tarps never end up too big or too small. We can also stencil your company name in bold 30cm letters onto the tarp for advertising while the truck is out and identification if the tarp is stolen. We can fit solid brass eyelets to your requirements and have a quick turn-around time on all tarpaulin repairs.",
      image: "/images/products/tarpaulins/main.jpg",
      images: [
        "/images/products/tarpaulins/main.jpg",
        "/images/products/tarpaulins/1.jpg",
        "/images/products/tarpaulins/2.jpg",
        "/images/products/tarpaulins/3.jpg",
      ],
      category: "PVC Products",
      weight: "Medium",
      seasonality: "All-Season",
    },
    {
      id: 2,
      name: "Vehicle Covers",
      description:
        "Custom-fit protective covers for cars, trucks, and other vehicles. Flat covers on the back of pickup trucks. Txopela doors and roofs. Boat covers. Frames and covers for large trucks.",
      image: "/images/products/vehicle-covers/main.jpg",
      images: [
        "/images/products/vehicle-covers/main.jpg",
        "/images/products/vehicle-covers/1.jpg",
        "/images/products/vehicle-covers/2.jpg",
        "/images/products/vehicle-covers/3.jpg",
      ],
      category: "Covers",
      weight: "Medium",
      seasonality: "All-Season",
    },
    {
      id: 3,
      name: "Car Shade Ports",
      description:
        "Protect your car from the sun, heat, weathering and bird droppings with one of our car shade ports. We have standard designs or we can make custom shade ports to suit your yard and needs. We have a wide range of colours in material proven to stand up to the Moçambique sun.",
      image: "/images/products/shade-ports/main.jpg",
      images: [
        "/images/products/shade-ports/main.jpg",
        "/images/products/shade-ports/1.jpg",
        "/images/products/shade-ports/2.jpg",
        "/images/products/shade-ports/3.jpg",
      ],
      category: "Shade Structures",
      capacity: "1-2 Vehicles",
      weight: "Heavy",
      seasonality: "All-Season",
    },
    {
      id: 4,
      name: "Tents",
      description:
        "Using only the best materials and designs we are suppliers to many heavy duty users such as: Safari camps. Long term construction camps. The military. The Police. We make standard tents and custom tents – from the smallest dome tent to the largest party marquee or warehouse tent.",
      image: "/images/products/tents/main.jpg",
      images: [
        "/images/products/tents/main.jpg",
        "/images/products/tents/1.jpg",
        "/images/products/tents/2.jpg",
        "/images/products/tents/3.jpg",
      ],
      category: "Tents",
      capacity: "Various Sizes",
      weight: "Medium to Heavy",
      seasonality: "All-Season",
    },
    {
      id: 5,
      name: "Custom Work",
      description:
        "Bespoke PVC and canvas solutions tailored to your specific requirements",
      image: "/images/products/custom-work/main.jpg",
      images: [
        "/images/products/custom-work/main.jpg",
        "/images/products/custom-work/1.jpg",
        "/images/products/custom-work/2.jpg",
        "/images/products/custom-work/3.jpg",
      ],
      category: "Custom",
      weight: "Varies",
      seasonality: "All-Season",
    },
    {
      id: 6,
      name: "Awnings and Drop Blinds",
      description:
        "Stylish and functional awnings and drop blinds for residential and commercial spaces",
      image: "/images/products/awnings/main.jpg",
      images: [
        "/images/products/awnings/main.jpg",
        "/images/products/awnings/1.jpg",
        "/images/products/awnings/2.jpg",
        "/images/products/awnings/3.jpg",
      ],
      category: "Shade Solutions",
      weight: "Medium",
      seasonality: "All-Season",
    },
  ],
}: ProductShowcaseProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations = {
      "products.title": "Premium Outdoor Tents",
      "products.subtitle":
        "Explore our range of high-quality tents for camping, events, and outdoor adventures",

      "products.viewDetails": "View Details",
      "products.requestQuote": "Request Quote",
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
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      className="w-full relative py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#FFF8DC] "></div>

        <BackgroundTrees count={15} opacity={0.03} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1b5e20]/5 dark:bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1b5e20]/5 dark:bg-green-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container bg-[#FFF8DC] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center mb-4 px-5 py-1.5 bg-white text-[#1b5e20]  rounded-full shadow-lg border border-[#1b5e20] backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <span className="font-medium text-sm uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-[#1b5e20] rounded-full mr-2 animate-pulse"></span>
              Our Products
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-[#1b5e20] drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.1 },
              },
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1b5e20] to-[#2e7d32] dark:from-green-500 dark:to-green-400">
              Leading manufacturer of PVC products
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.2 },
              },
            }}
          >
            Professional-grade tarpaulins, tents, and custom PVC products
            designed to withstand the african climate
          </motion.p>
        </div>

        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.1 * index },
                  },
                }}
              >
                <ProductCard product={product} variants={itemVariants} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.5 },
            },
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  variants: any;
}

const ProductCard = ({ product, variants }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const controls = useAnimation();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      variants={variants}
      className="group flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-[#1b5e20] dark:hover:border-green-500"
      onMouseEnter={() => {
        setIsHovered(true);
        controls.start("hover");
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        controls.start("initial");
      }}
      onClick={handleProductClick}
      whileHover={{ y: -5 }}
      initial="initial"
      animate={controls}
    >
      <div className="relative overflow-hidden h-[280px] group-hover:h-[300px] transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex"></div>

        <motion.div
          className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          variants={{
            initial: { scale: 0.8, opacity: 0 },
            hover: { scale: 1, opacity: 1, transition: { delay: 0.1 } },
          }}
        >
          <Eye className="h-4 w-4 text-[#1b5e20] dark:text-green-400" />
        </motion.div>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
          onError={(e) => {
            console.error(
              `Failed to load product image: ${e.currentTarget.src}`
            );
            // Use a placeholder image
            e.currentTarget.src = "/images/products/placeholder.jpg";
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
          variants={{
            initial: { y: 100, opacity: 0 },
            hover: { y: 0, opacity: 1, transition: { delay: 0.1 } },
          }}
        >
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 rounded-full text-xs font-medium border border-[#1b5e20]/20 dark:border-green-500/20 shadow-sm">
              {product.category}
            </span>
            {product.weight && (
              <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 rounded-full text-xs font-medium border border-[#1b5e20]/20 dark:border-green-500/20 shadow-sm">
                {product.weight}
              </span>
            )}
          </div>
        </motion.div>
      </div>
      <div className="p-6 bg-[#FFF8DC] flex flex-col flex-grow relative">
        <motion.div
          className="absolute -top-6 left-0 bg-[#FFF8DC] right-0 h-12 bg-gradient-to-b from-transparent to-white dark:to-gray-800 z-10"
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1 },
          }}
        />

        <div className="mb-3 flex justify-between items-start">
          <h3 className="text-xl font-bold text-green-800 dark:text-white font-sans tracking-tight leading-tight group-hover:text-[#1b5e20] dark:group-hover:text-green-400 transition-colors duration-300">
            {product.name}
          </h3>
          <motion.div
            className="bg-[#1b5e20]/10 dark:bg-green-500/20 p-1.5 rounded-full"
            whileHover={{ rotate: 15, scale: 1.1 }}
            variants={{
              initial: { scale: 0.9, opacity: 0.5 },
              hover: { scale: 1, opacity: 1 },
            }}
          >
            <Star className="h-4 w-4 text-[#1b5e20] dark:text-green-400" />
          </motion.div>
        </div>

        <div className="relative min-h-[100px]">
          <p className="text-gray-800 dark:text-gray-200 text-sm mb-4 line-clamp-3 font-sans leading-relaxed group-hover:opacity-0 transition-opacity duration-200">
            {product.description}
          </p>
          <motion.div
            className="absolute inset-0 bg-[#FFF8DC] dark:bg-gray-800/95 backdrop-blur-sm p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto max-h-[150px] z-20 shadow-lg border border-gray-100 dark:border-gray-700"
            variants={{
              initial: { y: 20, opacity: 0 },
              hover: { y: 0, opacity: 1, transition: { delay: 0.2 } },
            }}
          >
            <p className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed">
              {product.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center"
          variants={{
            initial: { opacity: 0.7 },
            hover: { opacity: 1 },
          }}
        >
          <span className="text-xs text-gray-700 dark:text-gray-300 flex items-center font-medium">
            <ImageIcon className="h-3 w-3 mr-1" />
            {product.images?.length || 1} photos
          </span>
          <motion.span
            className="text-sm text-[#1b5e20] dark:text-green-400 font-medium flex items-center bg-[#1b5e20]/5 dark:bg-green-500/10 px-3 py-1.5 rounded-full"
            whileHover={{ x: 3 }}
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductShowcase;
