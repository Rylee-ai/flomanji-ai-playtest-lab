
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { AppProviders } from "@/components/providers/AppProviders";
import { ErrorFallback, LoadingFallback } from "@/components/error/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import { publicRoutes } from "@/routes/public.routes";
import { adminRoutes } from "@/routes/admin.routes";
import { playerRoutes } from "@/routes/player.routes";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Critical app initialization error:", error);
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return <ErrorFallback />;
  }

  if (!isLoaded) {
    return <LoadingFallback />;
  }

  return (
    <AppProviders>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public routes */}
          {publicRoutes}
          
          {/* Admin routes */}
          {adminRoutes}
          
          {/* Player routes */}
          {playerRoutes}
          
          {/* Redirect from index.html to base path */}
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppProviders>
  );
};

export default App;

