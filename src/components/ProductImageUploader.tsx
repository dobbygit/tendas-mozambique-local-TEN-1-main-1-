import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Product } from "./ProductPage";
import { loadProducts } from "../lib/productStorage";
import ImageUploader from "./ImageUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const ProductImageUploader = () => {
  const [products, setProducts] = useState<Product[]>(loadProducts());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleImagesUpdated = (newImages: string[]) => {
    // Refresh products list
    setProducts(loadProducts());
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-[#1b5e20] dark:text-green-400">
        Product Image Uploader
      </h1>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="tents">Tents</TabsTrigger>
          <TabsTrigger value="covers">Covers</TabsTrigger>
          <TabsTrigger value="shade">Shade Solutions</TabsTrigger>
        </TabsList>

        <TabsContent
          value="all"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleProductSelect}
            />
          ))}
        </TabsContent>

        <TabsContent
          value="tents"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products
            .filter((p) => p.category === "Tents")
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleProductSelect}
              />
            ))}
        </TabsContent>

        <TabsContent
          value="covers"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products
            .filter(
              (p) => p.category === "Covers" || p.category === "PVC Products",
            )
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleProductSelect}
              />
            ))}
        </TabsContent>

        <TabsContent
          value="shade"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products
            .filter(
              (p) =>
                p.category === "Shade Structures" ||
                p.category === "Shade Solutions",
            )
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleProductSelect}
              />
            ))}
        </TabsContent>
      </Tabs>

      {/* Image Uploader Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Images for {selectedProduct?.name}</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <ImageUploader
              productId={selectedProduct.id}
              currentImages={selectedProduct.images || [selectedProduct.image]}
              onImagesUpdated={handleImagesUpdated}
            />
          )}

          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {product.images.length} images
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.category}
        </p>
        <div className="mt-auto">
          <Button
            onClick={() => onSelect(product)}
            className="w-full bg-[#1b5e20] hover:bg-[#0d3d11]"
          >
            Upload Images
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductImageUploader;
