import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Product } from "./ProductPage";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface ProductImageManagerProps {
  product: Product;
  onSave: (updatedImages: string[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ProductImageManager = ({
  product,
  onSave,
  isOpen,
  onClose,
}: ProductImageManagerProps) => {
  const [images, setImages] = useState<string[]>(
    product.images || [product.image],
  );
  const [newImageUrl, setNewImageUrl] = useState("");

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
    if (images.length === 0) {
      alert("You must have at least one image for the product.");
      return;
    }
    onSave(images);
    onClose();
  };

  const handleReset = () => {
    setImages(product.images || [product.image]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Product Images</DialogTitle>
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
                      ↑
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      className="p-1 bg-white/80 rounded-full text-xs"
                      disabled={index === images.length - 1}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="p-1 bg-white/80 rounded-full text-xs text-red-500"
                    >
                      ×
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
              Add
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
            <Button onClick={onClose} variant="outline" className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleSave} type="button">
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductImageManager;
