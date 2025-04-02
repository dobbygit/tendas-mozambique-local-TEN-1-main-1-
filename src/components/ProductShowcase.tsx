import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Eye,
  Star,
  Image as ImageIcon,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Tag,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import BackgroundTrees from "./BackgroundTrees";
import ImageGallery from "./ImageGallery";
import { useNavigate, Link } from "react-router-dom";
import { loadProducts } from "../lib/productStorage";
import { defaultProducts } from "../lib/productStorage";
import useEmblaCarousel from "embla-carousel-react";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  images?: string[];
  category: string;
  subcategories?: string[];
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
  products = loadProducts() || defaultProducts,
}: ProductShowcaseProps) => {
  // Removed category filter state
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations: Record<string, string> = {
      "products.title": "Premium Outdoor Tents",
      "products.subtitle":
        "Explore our range of high-quality tents for camping, events, and outdoor adventures",
      "products.viewDetails": "View Details",
      "products.requestQuote": "Request Quote",
      "products.ourProducts": "Our Products",
      "products.leadingManufacturer": "Leading manufacturer of PVC products",
      "products.professionalGrade":
        "Professional-grade tarpaulins, tents, and custom PVC products designed to withstand the african climate",
      "product.photos": "photos",
    };
    return defaultTranslations[key] || key;
  };

  // Try to use the language context, fall back to default if not available
  let t: ((key: string) => string) | null = null;
  try {
    const languageContext = useLanguage();
    if (languageContext && typeof languageContext.t === "function") {
      t = languageContext.t;
    } else {
      t = defaultT;
    }
  } catch (error) {
    console.error("Error accessing language context:", error);
    // Use the default translation function if not in a LanguageProvider
    t = defaultT;
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Extract unique categories from products
  const categories = useMemo(() => {
    if (!products) return [];
    const categorySet = new Set(products.map((product) => product.category));
    return Array.from(categorySet).sort();
  }, [products]);

  // Removed subcategory filter state and logic

  // Using all products without filtering
  const filteredProducts = products;

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
      className="w-full relative py-24 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl overflow-hidden"
      ref={ref}
      id="products"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] dark:from-gray-900 dark:to-gray-800"></div>

        <BackgroundTrees count={15} opacity={0.03} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1b5e20]/5 dark:bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1b5e20]/5 dark:bg-green-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-8 relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 py-10">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center mb-6 px-6 py-2 bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 rounded-full shadow-md border border-[#1b5e20]/10 dark:border-green-500/20 backdrop-blur-md"
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
            <span className="font-semibold text-sm uppercase tracking-wider flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-[#1b5e20] dark:text-green-400" />
              {t ? t("products.ourProducts") : "Our Products"}
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-sm"
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1b5e20] via-[#2e7d32] to-[#388e3c] dark:from-green-500 dark:via-green-400 dark:to-green-300">
              {t
                ? t("products.leadingManufacturer")
                : "Leading manufacturer of PVC products"}
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
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
            {t
              ? t("products.professionalGrade")
              : "Professional-grade tarpaulins, tents, and custom PVC products designed to withstand the African climate"}
          </motion.p>
        </div>

        {/* Category and subcategory filters removed */}

        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="relative">
            <ProductCarousel
              products={filteredProducts || []}
              itemVariants={itemVariants}
              controls={controls}
            />
          </div>
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

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations: Record<string, string> = {
      "products.viewDetails": "View Details",
      "product.photos": "photos",
    };
    return defaultTranslations[key] || key;
  };

  // Try to use the language context, fall back to default if not available
  let t: ((key: string) => string) | null = null;
  try {
    const languageContext = useLanguage();
    if (languageContext && typeof languageContext.t === "function") {
      t = languageContext.t;
    } else {
      t = defaultT;
    }
  } catch (error) {
    console.error("Error accessing language context:", error);
    // Use the default translation function if not in a LanguageProvider
    t = defaultT;
  }

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleCategoryClick = (e: React.MouseEvent, category: string) => {
    e.stopPropagation();
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
    navigate(`/category/${categorySlug}`);
  };

  const handleSubcategoryClick = (e: React.MouseEvent, subcategory: string) => {
    e.stopPropagation();
    const subcategorySlug = subcategory.toLowerCase().replace(/\s+/g, "-");
    navigate(`/type/${subcategorySlug}`);
  };

  return (
    <motion.div
      variants={variants}
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full cursor-pointer border-2 border-gray-100 dark:border-gray-700 hover:border-[#1b5e20] dark:hover:border-green-500"
      onMouseEnter={() => {
        setIsHovered(true);
        controls.start("hover");
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        controls.start("initial");
      }}
      onClick={handleProductClick}
      whileHover={{ y: -8, scale: 1.02 }}
      initial="initial"
      animate={controls}
    >
      <div className="relative overflow-hidden h-[220px]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex"></div>

        {/* Featured badge if it's a popular product */}
        {product.id === 1 || product.id === 4 ? (
          <div className="absolute top-4 left-4 z-20 bg-[#1b5e20] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            Featured
          </div>
        ) : null}

        <motion.div
          className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
          className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
          onError={(e) => {
            console.error(
              `Failed to load product image: ${e.currentTarget.src}`,
            );
            // Use a placeholder image
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80";
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
            <span
              className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 rounded-full text-xs font-medium border-0 shadow-sm cursor-pointer hover:bg-[#1b5e20] hover:text-white transition-colors duration-300 flex items-center"
              onClick={(e) => handleCategoryClick(e, product.category)}
            >
              <Tag className="h-3 w-3 mr-1" />
              {product.category}
            </span>
            {product.weight && (
              <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 rounded-full text-xs font-medium border-0 shadow-sm flex items-center">
                <ShieldCheck className="h-3 w-3 mr-1" />
                {product.weight}
              </span>
            )}
          </div>
        </motion.div>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 flex flex-col flex-grow relative">
        <div className="mb-3 flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white font-sans tracking-tight leading-tight group-hover:text-[#1b5e20] dark:group-hover:text-green-400 transition-colors duration-300">
            {product.name}
          </h3>
          <motion.div
            className="bg-[#1b5e20]/10 dark:bg-green-500/20 p-2 rounded-full"
            whileHover={{ rotate: 15, scale: 1.1 }}
            variants={{
              initial: { scale: 0.9, opacity: 0.5 },
              hover: { scale: 1, opacity: 1 },
            }}
          >
            <Star className="h-4 w-4 text-[#1b5e20] dark:text-green-400" />
          </motion.div>
        </div>

        <div className="relative min-h-[60px]">
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 font-sans leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Subcategories */}
        {product.subcategories && product.subcategories.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mt-2">
              {product.subcategories.slice(0, 3).map((subcategory, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium cursor-pointer hover:bg-[#1b5e20]/10 hover:text-[#1b5e20] dark:hover:bg-green-900/30 dark:hover:text-green-400 transition-colors duration-300 flex items-center"
                  onClick={(e) => handleSubcategoryClick(e, subcategory)}
                >
                  {subcategory}
                </span>
              ))}
              {product.subcategories.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs font-medium">
                  +{product.subcategories.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <motion.div
          className="mt-auto pt-4 border-t border-gray-200/70 dark:border-gray-700/70 flex justify-between items-center"
          variants={{
            initial: { opacity: 0.7 },
            hover: { opacity: 1 },
          }}
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center font-medium">
            <ImageIcon className="h-3.5 w-3.5 mr-1" />
            {product.images?.length || 1} {t ? t("product.photos") : "photos"}
          </span>
          <motion.div
            className="text-sm text-white font-medium flex items-center bg-[#1b5e20] dark:bg-green-600 px-4 py-2 rounded-full shadow-md"
            whileHover={{ scale: 1.05, x: 2 }}
          >
            {t ? t("products.viewDetails") : "View Details"}
            <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface ProductCarouselProps {
  products: Product[];
  itemVariants: any;
  controls: any;
}

const ProductCarousel = ({
  products,
  itemVariants,
  controls,
}: ProductCarouselProps) => {
  // Switch from carousel to grid layout
  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  );
};

export default ProductShowcase;
