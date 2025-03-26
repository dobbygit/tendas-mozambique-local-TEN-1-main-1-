import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

interface ImageErrorHandlerProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageErrorHandler: React.FC<ImageErrorHandlerProps> = ({
  src,
  alt,
  className = "",
  fallbackSrc = "/images/products/placeholder.jpg",
  onLoad,
  onError,
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
    setLoading(false);
    if (onError) onError();
  };

  const handleLoad = () => {
    setLoading(false);
    if (onLoad) onLoad();
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {error ? (
        <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <AlertCircle className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Image could not be loaded
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={className}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
};

export default ImageErrorHandler;
