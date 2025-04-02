import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import RentalPage from "./components/RentalPage";
import ProductPage from "./components/ProductPage";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import PageTransition from "./components/PageTransition";
import LocalImagePage from "./components/LocalImagePage";

// Lazy load components
const ProductCategoryPage = lazy(
  () => import("./components/ProductCategoryPage"),
);
const ProductTypeShowcase = lazy(
  () => import("./components/ProductTypeShowcase"),
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rental" element={<RentalPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/products" element={<ProductCategoryPage />} />
            <Route path="/admin/local-images" element={<LocalImagePage />} />
            <Route
              path="/category/:category"
              element={<ProductCategoryPage />}
            />
            <Route path="/type/:type" element={<ProductTypeShowcase />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
        </PageTransition>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
