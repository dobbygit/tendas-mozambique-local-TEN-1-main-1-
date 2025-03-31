import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Trash2, Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  productId: string;
  currentImages: string[];
  onImagesUpdated: (newImages: string[]) => void;
}

const ImageUploader = ({
  productId,
  currentImages,
  onImagesUpdated,
}: ImageUploaderProps) => {
  const [images, setImages] = useState<string[]>(currentImages);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (validFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    // Process each file
    Promise.all(
      validFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              resolve(event.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        });
      }),
    ).then((newImageUrls) => {
      // In a real app, you would upload these to a server and get back URLs
      // For this demo, we'll just use the data URLs
      const updatedImages = [...images, ...newImageUrls];
      setImages(updatedImages);
      saveImagesToLocalStorage(productId, updatedImages);
      onImagesUpdated(updatedImages);

      // Complete the progress bar
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        clearInterval(progressInterval);
      }, 500);
    });

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    saveImagesToLocalStorage(productId, updatedImages);
    onImagesUpdated(updatedImages);
  };

  const saveImagesToLocalStorage = (id: string, imageUrls: string[]) => {
    try {
      // Get existing products from localStorage
      const productsJson = localStorage.getItem("products");
      if (!productsJson) return;

      const products = JSON.parse(productsJson);

      // Find the product and update its images
      const updatedProducts = products.map((product: any) => {
        if (product.id === id) {
          return { ...product, images: imageUrls };
        }
        return product;
      });

      // Save back to localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } catch (error) {
      console.error("Error saving images to localStorage:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group aspect-square rounded-md overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <img
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => removeImage(index)}
                className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                aria-label="Remove image"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Add Image Button */}
        <label
          htmlFor="image-upload"
          className="cursor-pointer aspect-square rounded-md border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
        >
          <ImageIcon className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Add Image
          </span>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </label>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
          <div
            className="bg-[#1b5e20] h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex justify-center mt-4">
        <label htmlFor="image-upload-button">
          <Button
            className="bg-[#1b5e20] hover:bg-[#0d3d11] flex items-center"
            disabled={isUploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Images
          </Button>
          <input
            id="image-upload-button"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
