import { useParams, Link } from "react-router-dom";
import { Button } from "./ui/button";
import ImageGallery from "./ImageGallery";
import { useState } from "react";
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
  Edit,
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { LanguageProvider } from "./LanguageContext";
import WhatsAppChat from "./WhatsAppChat";
import ProductImageManager from "./ProductImageManager";
import { loadProducts, updateProductImages } from "../lib/productStorage";

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

// Default product data
const productData: Product[] = [
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
    subcategories: [
      "Cargo tarpaulins",
      "Custom tarpaulins",
      "Warehouse tarpaulins",
    ],
    weight: "Medium",
    seasonality: "All-Season",
  },
  {
    id: 2,
    name: "Vehicle Cover Products",
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
    subcategories: ["Bakkie covers", "Vehicle covers", "Seat covers"],
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
    subcategories: [
      "Standard shade ports",
      "Custom shade ports",
      "Multi-vehicle shade ports",
    ],
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
    subcategories: [
      "Security guard tents",
      "Kitchen tents",
      "Frame tents",
      "Dome tents",
    ],
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
    subcategories: ["PVC solutions", "Canvas products", "Bespoke designs"],
    weight: "Varies",
    seasonality: "All-Season",
  },
  {
    id: 6,
    name: "Awnings and Drop Blinds",
    description:
      "Enhance your outdoor entertaining space at your home, café or business with a cover or blind that is stylish, durable and effective. Retractable options let you choose the balance of sun and shade so you can make the most of being outside whilst remaining cool. Custom designs and a wide range of colours and materials ensure you get the look and feel that you want to add value to your property or business.",
    image: "/images/products/awnings/main.jpg",
    images: [
      "/images/products/awnings/main.jpg",
      "/images/products/awnings/1.jpg",
      "/images/products/awnings/2.jpg",
      "/images/products/awnings/3.jpg",
    ],
    category: "Shade Solutions",
    subcategories: ["Awnings", "Drop blinds", "Retractable shades"],
    weight: "Medium",
    seasonality: "All-Season",
  },
];

// Initialize products from localStorage or defaults
const products: Product[] = loadProducts();

const ProductPageContent = () => {
  const { id } = useParams();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [imageManagerOpen, setImageManagerOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { theme, toggleTheme } = useTheme();

  const productIndex = products.findIndex((p) => p.id === Number(id));
  const product = productIndex !== -1 ? products[productIndex] : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-[#1b5e20] hover:bg-[#0d3d11] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold border-2 border-[#1b5e20]/20"
            onClick={() => window.scrollTo(0, 0)}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const openGallery = (index: number) => {
    setSelectedImage(index);
    setGalleryOpen(true);
  };

  // Get related products (excluding current product)
  const relatedProducts = products.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen bg-[#FFF8DC] dark:bg-gray-900">
      <Header onThemeToggle={toggleTheme} isDarkMode={theme === "dark"} />
      <main className="pt-28 bg-[#FFF8DC] pb-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Link
              to="/"
              className="hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors duration-200"
              onClick={() => window.scrollTo(0, 0)}
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/#products"
              className="hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/#products";
              }}
            >
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {product.name}
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Product Images */}
              <div className="p-8 bg-[#FFF8DC] md:p-10 lg:p-12">
                <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 border border-gray-200 dark:border-gray-600">
                  <img
                    src={product.images?.[selectedImage] || product.image}
                    alt={product.name}
                    className="w-full h-[400px] object-cover cursor-pointer"
                    onClick={() => setGalleryOpen(true)}
                  />
                  <div className="absolute top-5 right-5 flex gap-2">
                    <button
                      className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      onClick={() => setGalleryOpen(true)}
                      title="View Gallery"
                    >
                      <ImageIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.map((img, index) => (
                      <div
                        key={index}
                        className={`overflow-hidden rounded-xl cursor-pointer border-2 transition-all duration-200 ${
                          selectedImage === index
                            ? "border-[#1b5e20] dark:border-green-500 shadow-lg scale-105"
                            : "border-transparent hover:border-gray-300 dark:hover:border-gray-600 hover:scale-105"
                        }`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                      </div>
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
              <div className="p-8 bg-[#FFF8DC] md:p-10 lg:p-12 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex bg-[#FFF8DC] flex-col h-full">
                  <div className="mb-8">
                    <div className="inline-block px-4 py-2 bg-[#1b5e20]/10 dark:bg-green-900/30 text-[#1b5e20] dark:text-green-400 rounded-lg text-sm font-semibold mb-4">
                      {product.category}
                    </div>
                    <motion.h1
                      className="text-3xl md:text-5xl font-bold text-green-800 dark:text-white font-sans tracking-tight leading-tight mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {product.name}
                    </motion.h1>

                    <div className="flex flex-wrap gap-8 mb-8">
                      {product.weight && (
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            <span className="font-medium">Weight:</span>{" "}
                            {product.weight}
                          </span>
                        </div>
                      )}
                      {product.seasonality && (
                        <div className="flex items-center">
                          <Info className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            <span className="font-medium">Seasonality:</span>{" "}
                            {product.seasonality}
                          </span>
                        </div>
                      )}
                      {product.capacity && (
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            <span className="font-medium">Capacity:</span>{" "}
                            {product.capacity}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="prose dark:prose-invert max-w-none mb-10">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      Product Description
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {product.description}
                    </p>

                    {product.subcategories && <div className="mt-6"></div>}
                  </div>

                  <div className="mt-auto space-y-6">
                    <div className="bg-[#FFF8DC] dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-700 shadow-md">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center text-lg">
                        <Check className="h-6 w-6 text-[#1b5e20] dark:text-green-400 mr-2" />
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-[#1b5e20] dark:text-green-400 mr-2 text-lg">
                            •
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 text-base">
                            Premium quality materials built to withstand African
                            climate
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#1b5e20] dark:text-green-400 mr-2 text-lg">
                            •
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 text-base">
                            Custom sizing available to fit your exact
                            requirements
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#1b5e20] dark:text-green-400 mr-2 text-lg">
                            •
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 text-base">
                            Professional installation and maintenance services
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#1b5e20] dark:text-green-400 mr-2 text-lg">
                            •
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 text-base">
                            Wide range of colors and designs available
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        size="lg"
                        className="w-full bg-[#1b5e20] hover:bg-[#0d3d11] text-white font-bold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 py-8 text-xl rounded-xl border-2 border-[#1b5e20]/20"
                        onClick={() => (window.location.href = "/contact")}
                      >
                        Request Quote
                        <ArrowRight className="ml-3 h-7 w-7" />
                      </Button>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Our team will contact you within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full border-2 border-gray-100 dark:border-gray-700 hover:border-[#1b5e20]/30 dark:hover:border-green-500/30"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 bg-[#FFF8DC] flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#1b5e20] dark:group-hover:text-green-400 transition-colors duration-300">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                      <div className="mt-auto pt-3 flex justify-end items-center">
                        <span className="text-sm text-[#1b5e20] dark:text-green-400 font-medium flex items-center">
                          View Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppChat phoneNumber="+258843989573" />
      {product && (
        <>
          <QuoteRequestModal
            isOpen={quoteModalOpen}
            onClose={() => setQuoteModalOpen(false)}
            productName={product.name}
          />
          <ProductImageManager
            isOpen={imageManagerOpen && currentProduct !== null}
            onClose={() => setImageManagerOpen(false)}
            product={currentProduct || product}
            onSave={(updatedImages) => {
              if (productIndex !== -1) {
                // Use the utility function to update product images
                const success = updateProductImages(product.id, updatedImages);

                if (success) {
                  console.log("Product images updated successfully");
                  // Force a page reload to reflect the changes
                  window.location.reload();
                } else {
                  alert("Failed to save changes. Please try again.");
                }
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default function ProductPage() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProductPageContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
