import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { updateProductImages, loadProducts } from "../lib/productStorage";
import { Product } from "../lib/productStorage";
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
  FolderOpen,
  Save,
  Info,
  Image as ImageIcon,
  FileImage,
  Copy,
  Check,
  Folder,
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const LocalProductImageManager = () => {
  const [products, setProducts] = useState<Product[]>(loadProducts());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [localFolderPath, setLocalFolderPath] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setImages(product.images || [product.image]);
    // Set suggested local folder path based on product category
    const categoryFolder = product.category.toLowerCase().replace(/ /g, "-");
    setLocalFolderPath(`/images/products/${categoryFolder}/`);
    setIsDialogOpen(true);
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const handleAddLocalImage = () => {
    if (localFolderPath.trim()) {
      // Generate a filename based on the number of images
      const filename =
        images.length > 0 ? `${images.length + 1}.jpg` : "main.jpg";
      const fullPath = `${localFolderPath.endsWith("/") ? localFolderPath : localFolderPath + "/"}${filename}`;
      setImages([...images, fullPath]);
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
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setProducts(loadProducts()); // Refresh products list
        setIsDialogOpen(false);
      }, 1500);
    } else {
      alert("Failed to update images. Please try again.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedPath(text);
      setTimeout(() => setCopiedPath(null), 2000);
    });
  };

  const handleReset = () => {
    if (selectedProduct) {
      setImages(selectedProduct.images || [selectedProduct.image]);
    }
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1b5e20] dark:text-green-400">
            Local Product Image Manager
          </h1>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#1b5e20] text-[#1b5e20] dark:border-green-400 dark:text-green-400"
            onClick={() => setShowHelp(!showHelp)}
          >
            <Info className="h-4 w-4" />
            {showHelp ? "Hide Help" : "Show Help"}
          </Button>
        </div>

        <Alert className="mb-6 border-[#1b5e20]/20 dark:border-green-400/20 bg-[#1b5e20]/5 dark:bg-green-400/5">
          <Info className="h-4 w-4 text-[#1b5e20] dark:text-green-400" />
          <AlertDescription>
            This tool helps you manage product images using local file paths.
            Images should be placed in your project's{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
              public
            </code>{" "}
            folder.
          </AlertDescription>
        </Alert>

        {showHelp && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-4 text-lg flex items-center text-[#1b5e20] dark:text-green-400">
              <FileImage className="mr-2 h-5 w-5" />
              How to use this tool:
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">
                  Step-by-step guide:
                </h4>
                <ol className="list-decimal pl-5 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Select a product from the list below</li>
                  <li>
                    The tool will suggest a folder path based on the product
                    category
                  </li>
                  <li>You can modify the folder path if needed</li>
                  <li>
                    Click "Add Local Image" to add an image from that folder
                  </li>
                  <li>
                    The tool will automatically name the files (main.jpg, 1.jpg,
                    2.jpg, etc.)
                  </li>
                  <li>You can also add external URLs if needed</li>
                  <li>Rearrange images by using the up/down arrows</li>
                  <li>Save your changes when done</li>
                </ol>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100 flex items-center">
                  <Folder className="mr-2 h-4 w-4" />
                  Recommended folder structure:
                </h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
                  public/ ├── images/ │ └── products/ │ ├── tents/ │ │ ├──
                  main.jpg │ │ ├── 1.jpg │ │ └── 2.jpg │ ├── awnings/ │ │ ├──
                  main.jpg │ │ └── 1.jpg │ └── ...
                </pre>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <strong>Important:</strong> Make sure to create the necessary
                  folders and add your images to the public directory before
                  using this tool. Images must exist at the specified paths.
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#1b5e20] data-[state=active]:text-white dark:data-[state=active]:bg-green-600"
            >
              All Products
            </TabsTrigger>
            <TabsTrigger
              value="tents"
              className="data-[state=active]:bg-[#1b5e20] data-[state=active]:text-white dark:data-[state=active]:bg-green-600"
            >
              Tents
            </TabsTrigger>
            <TabsTrigger
              value="covers"
              className="data-[state=active]:bg-[#1b5e20] data-[state=active]:text-white dark:data-[state=active]:bg-green-600"
            >
              Covers
            </TabsTrigger>
            <TabsTrigger
              value="shade"
              className="data-[state=active]:bg-[#1b5e20] data-[state=active]:text-white dark:data-[state=active]:bg-green-600"
            >
              Shade Solutions
            </TabsTrigger>
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
                (p) =>
                  p.category === "Covers" ||
                  p.category === "Vehicle Covers" ||
                  p.category === "PVC Products",
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
                  p.category === "Shade Solutions" ||
                  p.category === "Awnings",
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
          <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center text-[#1b5e20] dark:text-green-400">
                <FileImage className="mr-2 h-5 w-5" />
                Edit Images for {selectedProduct?.name}
              </DialogTitle>
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
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Images
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {images.length} image(s)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    {images.map((img, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute top-1 left-1 z-10 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                          {index === 0 ? "Main" : index}
                        </div>
                        <div className="relative aspect-square overflow-hidden rounded-md border-2 border-gray-200 dark:border-gray-700 group-hover:border-[#1b5e20] dark:group-hover:border-green-500 transition-colors duration-200">
                          <img
                            src={img}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/150?text=Image+Not+Found";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handleMoveUp(index)}
                                  className="p-1.5 bg-white/90 rounded-full text-gray-800 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={index === 0}
                                >
                                  <ArrowUp className="h-3.5 w-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Move Up</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handleMoveDown(index)}
                                  className="p-1.5 bg-white/90 rounded-full text-gray-800 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={index === images.length - 1}
                                >
                                  <ArrowDown className="h-3.5 w-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Move Down</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => copyToClipboard(img)}
                                  className="p-1.5 bg-white/90 rounded-full text-gray-800 hover:bg-white"
                                >
                                  {copiedPath === img ? (
                                    <Check className="h-3.5 w-3.5 text-green-600" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {copiedPath === img ? "Copied!" : "Copy Path"}
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handleRemoveImage(index)}
                                  className="p-1.5 bg-white/90 rounded-full text-red-500 hover:bg-white hover:text-red-600"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Remove</TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                        <div
                          className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate text-center"
                          title={img}
                        >
                          {img.split("/").pop()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-5">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                    <FolderOpen className="mr-2 h-4 w-4 text-[#1b5e20] dark:text-green-400" />
                    Add Local Images
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                    <div className="grid w-full gap-1.5">
                      <Label
                        htmlFor="localFolderPath"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Local Folder Path
                      </Label>
                      <Input
                        id="localFolderPath"
                        placeholder="/images/products/category/"
                        value={localFolderPath}
                        onChange={(e) => setLocalFolderPath(e.target.value)}
                        className="border-gray-300 dark:border-gray-600 focus:border-[#1b5e20] dark:focus:border-green-500"
                      />
                    </div>
                    <Button
                      onClick={handleAddLocalImage}
                      type="button"
                      className="bg-[#1b5e20] hover:bg-[#0d3d11] text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Local Image
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Images will be automatically named (main.jpg, 1.jpg, 2.jpg,
                    etc.)
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                    <ImageIcon className="mr-2 h-4 w-4 text-[#1b5e20] dark:text-green-400" />
                    Add External Image
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                    <div className="grid w-full gap-1.5">
                      <Label
                        htmlFor="imageUrl"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        External Image URL
                      </Label>
                      <Input
                        id="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="border-gray-300 dark:border-gray-600 focus:border-[#1b5e20] dark:focus:border-green-500"
                      />
                    </div>
                    <Button
                      onClick={handleAddImage}
                      type="button"
                      variant="outline"
                      className="border-[#1b5e20] text-[#1b5e20] hover:bg-[#1b5e20] hover:text-white dark:border-green-500 dark:text-green-400 dark:hover:bg-green-600 dark:hover:text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add URL
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-5 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Info className="mr-2 h-4 w-4 text-[#1b5e20] dark:text-green-400" />
                  Tips
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <li>
                    <strong>Local paths:</strong> Use relative paths from the
                    public folder (e.g.,{" "}
                    <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs">
                      /images/products/category/image.jpg
                    </code>
                    )
                  </li>
                  <li>
                    <strong>Main image:</strong> The first image in the list
                    will be used as the main product image
                  </li>
                  <li>
                    <strong>External images:</strong> You can also use URLs from
                    sites like Unsplash
                  </li>
                  <li>
                    <strong>Important:</strong> Make sure your local images
                    exist in the public folder at the specified path
                  </li>
                </ul>
              </div>
            </div>

            <DialogFooter className="flex justify-between items-center w-full mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="mr-2 border-gray-300 dark:border-gray-600"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
              <div className="flex items-center gap-2">
                {saveSuccess && (
                  <span className="text-green-600 dark:text-green-400 text-sm flex items-center">
                    <Check className="h-4 w-4 mr-1" /> Saved successfully!
                  </span>
                )}
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  type="button"
                  className="bg-[#1b5e20] hover:bg-[#0d3d11] text-white"
                  disabled={saveSuccess}
                >
                  <Save className="h-4 w-4 mr-1" /> Save Changes
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200 dark:border-gray-700 hover:border-[#1b5e20] dark:hover:border-green-500 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/150?text=Image+Not+Found";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <ImageIcon className="h-3 w-3 mr-1" />
            {product.images.length} images
          </div>
        )}
        <div className="absolute top-3 left-3 bg-[#1b5e20]/90 text-white text-xs px-2 py-1 rounded-full">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#1b5e20] dark:group-hover:text-green-400 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.description
            ? product.description.substring(0, 100) + "..."
            : ""}
        </p>
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          <Button
            onClick={() => onSelect(product)}
            className="w-full bg-[#1b5e20] hover:bg-[#0d3d11] text-white flex items-center justify-center gap-2"
          >
            <FileImage className="h-4 w-4" />
            Edit Images
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocalProductImageManager;
