import React from "react";
import { motion } from "framer-motion";
import { getProducts } from "../lib/productStorage";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  imageUrl: string;
  additionalImages?: string[];
}

const ProductShowcasePage: React.FC = () => {
  const products = getProducts();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full flex flex-col overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {product.category}{" "}
                  {product.subcategory ? `- ${product.subcategory}` : ""}
                </p>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="mt-auto">
                  <Button className="w-full">View Details</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcasePage;
