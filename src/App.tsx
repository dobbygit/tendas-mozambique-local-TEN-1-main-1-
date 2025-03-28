import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import RentalPage from "./components/RentalPage";
import ProductPage from "./components/ProductPage";
import routes from "tempo-routes";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import PageTransition from "./components/PageTransition";

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
            <Route
              path="/category/:category"
              element={<ProductCategoryPage />}
            />
            <Route path="/type/:type" element={<ProductTypeShowcase />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </PageTransition>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
