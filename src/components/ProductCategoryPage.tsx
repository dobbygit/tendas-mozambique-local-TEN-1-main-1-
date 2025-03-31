import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadProducts, Product } from "../lib/productStorage";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Eye,
  Star,
  Image as ImageIcon,
  ArrowRight,
  Tag,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundTrees from "./BackgroundTrees";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppChat from "./WhatsAppChat";

const ProductCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const allProducts = loadProducts();

  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Show all products
        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error loading products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [allProducts]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const getCategoryTitle = () => {
    return "All Products";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8DC] dark:bg-gray-900">
      <Header />
      <div className="pt-32 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4 md:mb-0">
              <Button
                variant="outline"
                className="mr-4 text-[#1b5e20] dark:text-green-400 hover:text-white hover:bg-[#1b5e20] dark:hover:bg-green-600 border-[#1b5e20] dark:border-green-500 rounded-full"
                onClick={handleBackClick}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Category
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="w-2 h-6 bg-[#1b5e20] dark:bg-green-500 rounded-sm mr-2"></span>
                  {getCategoryTitle()}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {products.length} products found
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1b5e20]"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                No products found in this category
              </h2>
              <Button
                className="bg-[#1b5e20] hover:bg-[#2e7d32] text-white"
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 overflow-hidden -z-10">
                <BackgroundTrees count={10} opacity={0.03} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-[#1b5e20] dark:hover:border-green-500">
                      <div className="relative overflow-hidden h-[250px]">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex"></div>

                        {/* Featured badge if it's a popular product */}
                        {product.id === 1 || product.id === 4 ? (
                          <div className="absolute top-3 left-3 z-20 bg-[#1b5e20] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md flex items-center">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Featured
                          </div>
                        ) : null}

                        <motion.div
                          className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Eye className="h-4 w-4 text-[#1b5e20] dark:text-green-400" />
                        </motion.div>

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80";
                          }}
                        />

                        <motion.div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 rounded-full text-xs font-medium border border-[#1b5e20]/20 dark:border-green-500/20 shadow-sm cursor-pointer hover:bg-[#1b5e20] hover:text-white transition-colors duration-300 flex items-center">
                              <Tag className="h-3 w-3 mr-1" />
                              {product.category}
                            </span>
                            {product.weight && (
                              <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 rounded-full text-xs font-medium border border-[#1b5e20]/20 dark:border-green-500/20 shadow-sm flex items-center">
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
                            className="bg-[#1b5e20]/10 dark:bg-green-500/20 p-1.5 rounded-full"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                          >
                            <Star className="h-4 w-4 text-[#1b5e20] dark:text-green-400" />
                          </motion.div>
                        </div>

                        <div className="relative min-h-[80px]">
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2 font-sans leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <WhatsAppChat phoneNumber="+258843989573" />
    </div>
  );
};

export default ProductCategoryPage;
