import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { updateProductImages, loadProducts } from "../lib/productStorage";
import { Product } from "./ProductPage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  AlertCircle,
  RefreshCw,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

const ProductImageEditor = () => {
  const [products, setProducts] = useState<Product[]>(loadProducts());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setImages(product.images || [product.image]);
    setIsDialogOpen(true);
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newImages = [...images];
      [newImages[index], newImages[index - 1]] = [
        newImages[index - 1],
        newImages[index],
      ];
      setImages(newImages);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < images.length - 1) {
      const newImages = [...images];
      [newImages[index], newImages[index + 1]] = [
        newImages[index + 1],
        newImages[index],
      ];
      setImages(newImages);
    }
  };

  const handleSave = () => {
    if (!selectedProduct || images.length === 0) {
      alert("You must have at least one image for the product.");
      return;
    }

    const success = updateProductImages(selectedProduct.id, images);
    if (success) {
      alert("Images updated successfully!");
      setProducts(loadProducts()); // Refresh products list
      setIsDialogOpen(false);
    } else {
      alert("Failed to update images. Please try again.");
    }
  };

  const handleReset = () => {
    if (selectedProduct) {
      setImages(selectedProduct.images || [selectedProduct.image]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-[#1b5e20] dark:text-green-400">
        Product Image Editor
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

      {/* Image Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Images for {selectedProduct?.name}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {images.length === 0 ? (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No images available. Please add at least one image.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-20 object-cover rounded-md border border-gray-200 dark:border-gray-700"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1 rounded-md">
                      <button
                        onClick={() => handleMoveUp(index)}
                        className="p-1 bg-white/80 rounded-full text-xs"
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        className="p-1 bg-white/80 rounded-full text-xs"
                        disabled={index === images.length - 1}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="p-1 bg-white/80 rounded-full text-xs text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-end gap-2">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="imageUrl">Add Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                />
              </div>
              <Button onClick={handleAddImage} type="button">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Tips:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>
                  For local images, use paths like:
                  /images/products/category/image.jpg
                </li>
                <li>You can also use external URLs from sites like Unsplash</li>
                <li>The first image will be used as the main product image</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex justify-between items-center w-full">
            <div>
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="mr-2"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setIsDialogOpen(false)}
                variant="outline"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} type="button">
                Save Changes
              </Button>
            </div>
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
            Edit Images
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductImageEditor;
