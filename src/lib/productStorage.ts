import { Product } from "../components/ProductPage";

// Default product data that will be used if no saved data exists
export const defaultProducts: Product[] = [
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
      "https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/vehicle-cover-1.jpg",
      "https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/vehicle-cover-2.jpg",
      "https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/vehicle-cover-3.jpg",
      "https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/vehicle-cover-4.jpg",
      "https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/vehicle-cover-5.jpg",
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
      "We offer a diverse range of tents designed for various events and needs. Whether it's for a wedding, corporate event, or outdoor party, we have a tent solution that fits your requirements. Contact us for options on custom sizes and layouts.",
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
    id: 7,
    name: "18x9 Marquee tent",
    description:
      "Our 18x9 Marquee tent is perfect for large gatherings, providing ample space and elegant cover. Ideal for weddings, corporate events, and large parties. ",
    image: "public/images/products/tents/1.jpg",
    images: [
      "public/images/products/tents/1.jpg",
      "public/images/products/tents/2.jpg",
      "public/images/products/tents/3.jpg",
    ],
    category: "Tents",
    capacity: "Large Groups",
    weight: "Heavy",
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
      "Enhance your outdoor entertaining space at your home, café or business with a cover or blind that is stylish, durable and effective. Retractable options let you choose the balance of sun and shade so you can make the most of being outside whilst remaining cool. Custom designs and a wide range of colours and materials ensure you get the look and feel that you want to add value to your property or business.",
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
