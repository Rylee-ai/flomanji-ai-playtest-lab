
import { useRoutes, Navigate } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { ErrorFallback, LoadingFallback } from "@/components/error/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import { publicRoutes } from "@/routes/public.routes";
import { adminRoutes } from "@/routes/admin.routes";
import { playerRoutes } from "@/routes/player.routes";
import { AppProviders } from "@/components/providers/AppProviders";
import { log } from "@/utils/logging";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      log.info("Application initializing");
      
      const timer = setTimeout(() => {
        setIsLoaded(true);
        log.info("Application successfully mounted");
      }, 100);
      
      return () => clearTimeout(timer);
    } catch (error) {
      log.error("Critical app initialization error:", error);
      setHasError(true);
    }
  }, []);

  // Combine all routes
  const allRoutes = [
    ...publicRoutes,
    ...adminRoutes,
    ...playerRoutes,
    // Redirect from index.html to base path
    {
      path: "/index.html",
      element: <Navigate to="/" replace />
    },
    // Catch-all route
    {
      path: "*",
      element: <NotFound />
    }
  ];

  // Use the useRoutes hook to transform route objects into React elements
  const RoutedContent = () => {
    const routeElements = useRoutes(allRoutes);
    return (
      <Suspense fallback={<LoadingFallback />}>
        {routeElements}
      </Suspense>
    );
  };

  if (hasError) {
    return <ErrorFallback />;
  }

  if (!isLoaded) {
    return <LoadingFallback />;
  }

  return (
    <AppProviders>
      <RoutedContent />
    </AppProviders>
  );
};

export default App;
