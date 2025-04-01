export interface Product {
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

// Default product data that will be used if no saved data exists
export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Custom Tarpaulins",
    description:
      "Professional-grade custom tarpaulins tailored to your specific requirements. Our high-frequency sealing machines create custom-fit tarpaulins for various applications.",
    image: "/images/products/tarpaulins/main.jpg",
    images: [
      "/images/products/tarpaulins/main.jpg",
      "/images/products/tarpaulins/1.jpg",
      "https://images.unsplash.com/photo-1518889735218-3e3a03fd3128?w=800&q=80",
      "https://images.unsplash.com/photo-1531913223931-b0d3198229ee?w=800&q=80",
    ],
    category: "Tarpaulins",
    subcategories: ["Custom Tarpaulins"],
    weight: "Medium",
    seasonality: "All-Season",
  },
  {
    id: 2,
    name: "Bakkie Covers",
    description:
      "Premium bakkie covers designed to protect your pickup truck from weather elements and UV damage. Our custom-designed covers are durable and provide excellent protection.",
    image: "/images/products/vehicle-covers/main.jpg",
    images: [
      "/images/products/vehicle-covers/main.jpg",
      "/images/products/vehicle-covers/1.jpg",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    ],
    category: "Vehicle Covers",
    subcategories: ["Bakkie Covers"],
    weight: "Medium",
    seasonality: "All-Season",
  },
  {
    id: 3,
    name: "Vehicle Covers",
    description:
      "High-quality vehicle covers for cars and trucks. Protect your vehicle from dust, sun damage, and environmental elements with our durable and custom-fitted covers.",
    image: "/images/products/vehicle-covers/2.jpg",
    images: [
      "/images/products/vehicle-covers/2.jpg",
      "/images/products/vehicle-covers/3.jpg",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    ],
    category: "Vehicle Covers",
    subcategories: ["Vehicle Covers"],
    weight: "Medium",
    seasonality: "All-Season",
  },
  {
    id: 4,
    name: "Txopela Door Covers",
    description:
      "Specialized door covers for Txopela vehicles. Our products are designed to enhance functionality and provide protection for your Txopela doors.",
    image: "/images/products/txopela-accessories/main.jpg",
    images: [
      "/images/products/txopela-accessories/main.jpg",
      "/images/products/txopela-accessories/1.jpg",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    ],
    category: "Txopela Accessories",
    subcategories: ["Txopela Door Covers"],
    weight: "Medium",
    seasonality: "All-Season",
  },
  {
    id: 5,
    name: "Awnings",
    description:
      "Durable and stylish awnings for residential and commercial applications. Provide shade and protection from the elements with our custom-designed awnings.",
    image: "/images/products/awnings/main.jpg",
    images: [
      "/images/products/awnings/main.jpg",
      "/images/products/awnings/1.jpg",
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80",
    ],
    category: "Awnings",
    subcategories: ["Awnings"],
    weight: "Medium to Heavy",
    seasonality: "All-Season",
  },
  {
    id: 6,
    name: "Drop Blinds",
    description:
      "Custom drop blinds for patios, verandas, and outdoor spaces. Control light, privacy, and temperature with our high-quality drop blinds.",
    image: "/images/products/blinds/main.jpg",
    images: [
      "/images/products/blinds/main.jpg",
      "/images/products/blinds/1.jpg",
      "https://images.unsplash.com/photo-1533603208986-24fd819e718a?w=800&q=80",
    ],
    category: "Blinds",
    subcategories: ["Drop Blinds"],
    weight: "Light to Medium",
    seasonality: "All-Season",
  },
  {
    id: 7,
    name: "2.5m x 2.5m 4-Man Dome Tent",
    description:
      "Compact 2.5m x 2.5m dome tent perfect for small groups or families. Comfortably fits 4 people with easy setup and takedown.",
    image: "/images/products/tents/main.jpg",
    images: [
      "/images/products/tents/main.jpg",
      "/images/products/tents/1.jpg",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    ],
    category: "Tents",
    subcategories: ["2.5m x 2.5m 4-Man Dome Tent"],
    capacity: "4 People",
    weight: "Medium",
    seasonality: "All-Season",
  },
  {
    id: 8,
    name: "3m x 3m 6-Man Dome Tent",
    description:
      "Spacious 3m x 3m dome tent ideal for larger groups. Comfortably accommodates 6 people with durable materials and weather-resistant design.",
    image: "/images/products/tents/2.jpg",
    images: [
      "/images/products/tents/2.jpg",
      "/images/products/tents/1.jpg",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    ],
    category: "Tents",
    subcategories: ["3m x 3m 6-Man Dome Tent"],
    capacity: "6 People",
    weight: "Medium to Heavy",
    seasonality: "All-Season",
  },
  {
    id: 9,
    name: "Seat Covers",
    description:
      "Premium seat covers for vehicles of all types. Protect your car's interior with our durable and stylish seat covers that are easy to install and clean.",
    image: "/images/products/vehicle-covers/3.jpg",
    images: [
      "/images/products/vehicle-covers/3.jpg",
      "/images/products/vehicle-covers/1.jpg",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    ],
    category: "Vehicle Covers",
    subcategories: ["Seat Covers"],
    weight: "Light",
    seasonality: "All-Season",
  },
  {
    id: 10,
    name: "All Custom Work",
    description:
      "Bespoke PVC and canvas solutions tailored to your specific requirements. Our team of experts can design and manufacture custom products to meet your unique needs and specifications.",
    image: "/images/products/custom-work/main.jpg",
    images: [
      "/images/products/custom-work/main.jpg",
      "/images/products/custom-work/1.jpg",
      "/images/products/custom-work/2.jpg",
      "https://images.unsplash.com/photo-1581093458791-9d15482442f5?w=800&q=80",
    ],
    category: "Custom Work",
    subcategories: ["All Custom Work"],
    weight: "Varies",
    seasonality: "All-Season",
  },
];

/**
 * Load products from localStorage or use defaults if not available
 */
export const loadProducts = (): Product[] => {
  try {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : defaultProducts;
  } catch (error) {
    console.error("Error loading products from localStorage:", error);
    return defaultProducts;
  }
};

/**
 * Get products - alias for loadProducts for better semantic naming
 */
export const getProducts = loadProducts;

/**
 * Save products to localStorage
 */
export const saveProducts = (products: Product[]): boolean => {
  try {
    localStorage.setItem("products", JSON.stringify(products));
    return true;
  } catch (error) {
    console.error("Error saving products to localStorage:", error);
    return false;
  }
};

/**
 * Update a single product's images
 */
export const updateProductImages = (
  productId: number,
  images: string[],
): boolean => {
  try {
    if (!images || images.length === 0) {
      console.error("Cannot update product with empty images array");
      return false;
    }

    const products = loadProducts();
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      // Filter out any empty strings or undefined values
      const validImages = images.filter((img) => img && img.trim() !== "");

      if (validImages.length === 0) {
        console.error("No valid images provided");
        return false;
      }

      products[productIndex] = {
        ...products[productIndex],
        image: validImages[0], // Set the first image as the main image
        images: validImages,
      };

      return saveProducts(products);
    }
    return false;
  } catch (error) {
    console.error("Error updating product images:", error);
    return false;
  }
};

/**
 * Reset products to default values
 */
export const resetProducts = (): boolean => {
  try {
    localStorage.setItem("products", JSON.stringify(defaultProducts));
    return true;
  } catch (error) {
    console.error("Error resetting products:", error);
    return false;
  }
};
