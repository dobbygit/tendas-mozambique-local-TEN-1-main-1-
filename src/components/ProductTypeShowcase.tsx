import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, Star, Image as ImageIcon, ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import BackgroundTrees from "./BackgroundTrees";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { LanguageProvider } from "./LanguageContext";
import WhatsAppChat from "./WhatsAppChat";
import { loadProducts } from "../lib/productStorage";

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

const ProductTypeShowcaseContent = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const controls = useAnimation();
  const [products, setProducts] = useState<Product[]>([]);

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations: Record<string, string> = {
      "products.title": "Premium Outdoor Products",
      "products.subtitle": "Explore our range of high-quality products",
      "products.viewDetails": "View Details",
      "products.requestQuote": "Request Quote",
      "products.ourProducts": "Our Products",
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
    // Load products and filter by type
    const allProducts = loadProducts();
    const decodedType = type ? decodeURIComponent(type.replace(/-/g, " ")) : "";

    // Filter products that have the specified type in their subcategories
    const filteredProducts = allProducts.filter((product) =>
      product.subcategories?.some(
        (subcategory) =>
          subcategory.toLowerCase() === decodedType.toLowerCase(),
      ),
    );

    setProducts(filteredProducts);
    controls.start("visible");
  }, [type, controls]);

  const formattedType = useMemo(() => {
    if (!type) return "";
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [type]);

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

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8DC] dark:bg-gray-900">
        <Header onThemeToggle={toggleTheme} isDarkMode={theme === "dark"} />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-green-800 dark:text-white mb-4">
              No Products Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We couldn't find any products in the {formattedType} category.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-[#1b5e20] hover:bg-[#0d3d11] text-white"
            >
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
        <WhatsAppChat phoneNumber="+258843989573" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC] dark:bg-gray-900">
      <Header onThemeToggle={toggleTheme} isDarkMode={theme === "dark"} />
      <main className="pt-24 pb-16">
        <section className="w-full relative py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#FFF8DC]"></div>
            <BackgroundTrees count={15} opacity={0.03} />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1b5e20]/5 dark:bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1b5e20]/5 dark:bg-green-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 bg-[#FFF8DC]">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center mb-4 px-5 py-1.5 bg-white text-[#1b5e20] rounded-full shadow-lg border border-[#1b5e20] backdrop-blur-sm"
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
                  {formattedType}
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
                  {formattedType} Products
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
                Explore our range of high-quality {formattedType.toLowerCase()}{" "}
                products designed to withstand the African climate
              </motion.p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variants={itemVariants}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppChat phoneNumber="+258843989573" />
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  variants: any;
  index: number;
}

const ProductCard = ({ product, variants, index }: ProductCardProps) => {
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
              className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 rounded-full text-xs font-medium border border-[#1b5e20]/20 dark:border-green-500/20 shadow-sm cursor-pointer hover:bg-[#1b5e20] hover:text-white transition-colors duration-300"
              onClick={(e) => handleCategoryClick(e, product.category)}
            >
              {product.category}
            </span>
            {product.weight && (
              <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 rounded-full text-xs font-medium border border-[#1b5e20]/20 dark:border-green-500/20 shadow-sm">
                {product.weight}
              </span>
            )}
            {product.subcategories &&
              product.subcategories.map((subcategory, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 rounded-full text-xs font-medium border border-[#1b5e20]/20 dark:border-green-500/20 shadow-sm cursor-pointer hover:bg-[#1b5e20] hover:text-white transition-colors duration-300"
                  onClick={(e) => handleSubcategoryClick(e, subcategory)}
                >
                  {subcategory}
                </span>
              ))}
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
            {product.images?.length || 1} {t ? t("product.photos") : "photos"}
          </span>
          <motion.span
            className="text-sm text-[#1b5e20] dark:text-green-400 font-medium flex items-center bg-[#1b5e20]/5 dark:bg-green-500/10 px-3 py-1.5 rounded-full"
            whileHover={{ x: 3 }}
          >
            {t ? t("products.viewDetails") : "View Details"}
            <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProductTypeShowcase = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProductTypeShowcaseContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default ProductTypeShowcase;
