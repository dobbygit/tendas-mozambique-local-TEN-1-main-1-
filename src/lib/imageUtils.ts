/**
 * Utility functions for handling images
 */

/**
 * Validates if an image URL is accessible
 * @param url The image URL to validate
 * @returns Promise that resolves to true if the image is valid, false otherwise
 */
export const validateImageUrl = async (url: string): Promise<boolean> => {
  // For local images, we can't easily check if they exist
  if (url.startsWith("/")) {
    return true;
  }

  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error(`Error validating image URL ${url}:`, error);
    return false;
  }
};

/**
 * Preloads an image to ensure it's in the browser cache
 * @param url The image URL to preload
 * @returns Promise that resolves when the image is loaded or rejects on error
 */
export const preloadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};

/**
 * Gets a placeholder image URL
 * @returns A placeholder image URL
 */
export const getPlaceholderImage = (): string => {
  return "/images/products/placeholder.jpg";
};
