import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { loadProducts } from "../lib/productStorage";
import { Product } from "./ProductPage";
import { Button } from "./ui/button";
import ImageGallery from "./ImageGallery";
import QuoteRequestModal from "./QuoteRequestModal";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  Shield,
  Truck,
  Image as ImageIcon,
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppChat from "./WhatsAppChat";
import BackgroundTrees from "./BackgroundTrees";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const products = loadProducts();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8DC]">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button
            className="bg-[#1b5e20] hover:bg-[#0d3d11] text-white"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const openGallery = (index: number) => {
    setSelectedImage(index);
    setGalleryOpen(true);
  };

  // Get related products (excluding current product)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFF8DC]">
      <Header />
      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-wrap items-center text-sm text-gray-500 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
            <Link
              to="/"
              className="hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors duration-200 font-medium"
              onClick={() => window.scrollTo(0, 0)}
            >
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              to="/#products"
              className="hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors duration-200 font-medium"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/#products";
              }}
            >
              Products
            </Link>
            {product.category && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  to={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors duration-200 font-medium"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {product.category}
                </Link>
              </>
            )}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-[#1b5e20] dark:text-green-400 font-medium">
              {product.name}
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Product Images */}
              <div className="p-6 bg-white dark:bg-gray-800 md:p-8 lg:p-10">
                <div className="relative overflow-hidden rounded-xl shadow-lg mb-6 border border-gray-100 dark:border-gray-700 group">
                  <motion.img
                    src={product.images?.[selectedImage] || product.image}
                    alt={product.name}
                    className="w-full h-[400px] object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                    onClick={() => setGalleryOpen(true)}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80";
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      className="bg-white/90 dark:bg-gray-800/90 hover:bg-[#1b5e20] hover:text-white dark:hover:bg-green-600 text-gray-800 dark:text-white p-3 rounded-full shadow-md transition-colors duration-200"
                      onClick={() => setGalleryOpen(true)}
                      title="View Gallery"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ImageIcon className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* Product badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-[#1b5e20] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md flex items-center">
                      <Tag className="h-3 w-3 mr-1" />
                      {product.category}
                    </span>
                    {product.weight && (
                      <span className="bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium shadow-md flex items-center">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        {product.weight}
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-3">
                    {product.images.map((img, index) => (
                      <motion.div
                        key={index}
                        className={`overflow-hidden rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                          selectedImage === index
                            ? "border-[#1b5e20] dark:border-green-500 shadow-md"
                            : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                        onClick={() => setSelectedImage(index)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-20 object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80";
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                <ImageGallery
                  images={product.images || [product.image]}
                  alt={product.name}
                  isOpen={galleryOpen}
                  onClose={() => setGalleryOpen(false)}
                />
              </div>

              {/* Product Details */}
              <div className="p-6 bg-white dark:bg-gray-800 md:p-8 lg:p-10">
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <motion.h1
                      className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-sans tracking-tight leading-tight mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {product.name}
                    </motion.h1>

                    <motion.div
                      className="flex flex-wrap gap-4 mb-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {product.weight && (
                        <div className="flex items-center bg-white dark:bg-gray-700 px-3 py-2 rounded-lg shadow-sm">
                          <Shield className="h-5 w-5 text-[#1b5e20] dark:text-green-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-200 text-sm">
                            <span className="font-medium">Weight:</span>{" "}
                            {product.weight}
                          </span>
                        </div>
                      )}
                      {product.seasonality && (
                        <div className="flex items-center bg-white dark:bg-gray-700 px-3 py-2 rounded-lg shadow-sm">
                          <Info className="h-5 w-5 text-[#1b5e20] dark:text-green-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-200 text-sm">
                            <span className="font-medium">Seasonality:</span>{" "}
                            {product.seasonality}
                          </span>
                        </div>
                      )}
                      {product.capacity && (
                        <div className="flex items-center bg-white dark:bg-gray-700 px-3 py-2 rounded-lg shadow-sm">
                          <Truck className="h-5 w-5 text-[#1b5e20] dark:text-green-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-200 text-sm">
                            <span className="font-medium">Capacity:</span>{" "}
                            {product.capacity}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    className="prose dark:prose-invert max-w-none mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <span className="w-2 h-6 bg-[#1b5e20] dark:bg-green-500 rounded-sm mr-2"></span>
                      Product Description
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {product.description}
                    </p>

                    {product.subcategories &&
                      product.subcategories.length > 0 && (
                        <div className="mt-6 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <Tag className="h-4 w-4 text-[#1b5e20] dark:text-green-400 mr-2" />
                            Available Types:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.subcategories.map((subcategory, index) => (
                              <Link
                                key={index}
                                to={`/type/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                                className="px-4 py-2 bg-white dark:bg-gray-700 hover:bg-[#1b5e20] text-gray-700 dark:text-gray-200 hover:text-white dark:hover:text-white rounded-lg text-sm font-medium transition-colors duration-300 flex items-center shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600 hover:border-[#1b5e20] dark:hover:border-green-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.scrollTo(0, 0);
                                }}
                              >
                                {subcategory}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                  </motion.div>

                  <div className="mt-auto space-y-6">
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                        <Check className="h-5 w-5 text-[#1b5e20] dark:text-green-400 mr-2" />
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                          <span className="text-[#1b5e20] dark:text-green-400 mr-2 mt-0.5">
                            •
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            Premium quality materials built to withstand African
                            climate
                          </span>
                        </li>
                        <li className="flex items-start bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                          <span className="text-[#1b5e20] dark:text-green-400 mr-2 mt-0.5">
                            •
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            Custom sizing available to fit your exact
                            requirements
                          </span>
                        </li>
                        <li className="flex items-start bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                          <span className="text-[#1b5e20] dark:text-green-400 mr-2 mt-0.5">
                            •
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            Professional installation and maintenance services
                          </span>
                        </li>
                        <li className="flex items-start bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                          <span className="text-[#1b5e20] dark:text-green-400 mr-2 mt-0.5">
                            •
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            Wide range of colors and designs available
                          </span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      className="pt-6 border-t border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Button
                        size="lg"
                        className="w-full bg-[#1b5e20] hover:bg-[#0d3d11] text-white font-bold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 py-7 text-lg rounded-xl border-2 border-[#1b5e20]/20"
                        onClick={() => setQuoteModalOpen(true)}
                      >
                        Request Quote
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </Button>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                        Our team will contact you within 24 hours
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center mb-8">
                <div className="w-2 h-8 bg-[#1b5e20] dark:bg-green-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Related Products
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/product/${relatedProduct.id}`}
                      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700 hover:border-[#1b5e20] dark:hover:border-green-500 hover:-translate-y-1"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-full p-3">
                          <div className="bg-white/90 dark:bg-gray-800/90 text-[#1b5e20] dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                            <Tag className="h-3 w-3 mr-1" />
                            {relatedProduct.category}
                          </div>
                        </div>
                      </div>
                      <div className="p-5 bg-white dark:bg-gray-800 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#1b5e20] dark:group-hover:text-green-400 transition-colors duration-300">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                          {relatedProduct.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {relatedProduct.subcategories?.length || 0} types
                            available
                          </span>
                          <span className="text-sm text-[#1b5e20] dark:text-green-400 font-medium flex items-center">
                            View Details
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppChat phoneNumber="+258843989573" />
      {product && (
        <QuoteRequestModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          productName={product.name}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
