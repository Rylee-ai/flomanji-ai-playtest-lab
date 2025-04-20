
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import SimulationsList from "./pages/SimulationsList";
import NewSimulation from "./pages/NewSimulation";
import SimulationDetail from "./pages/SimulationDetail";
import ContentManager from "./pages/ContentManager";
import Rules from "./pages/Rules";
import Settings from "./pages/Settings";
import AgentManager from "./pages/AgentManager";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import { Suspense, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

// Error boundary component
const ErrorFallback = () => (
  <div className="flex items-center justify-center h-screen flex-col p-4">
    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
    <p className="mb-4">We're sorry, but there was an error loading the application.</p>
    <button 
      onClick={() => window.location.href = '/'}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Return to Home
    </button>
  </div>
);

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="h-8 w-8 animate-spin mr-2" />
    <span>Loading application...</span>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      onError: (error) => {
        console.error("Query error:", error);
      }
    },
  },
});

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Attempt to initialize app
    try {
      // Set loaded after a short delay to ensure everything is ready
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route element={<AdminLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/simulations" element={<SimulationsList />} />
                <Route path="/simulations/new" element={<NewSimulation />} />
                <Route path="/simulations/:id" element={<SimulationDetail />} />
                <Route path="/content" element={<ContentManager />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/agents" element={<AgentManager />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              {/* Redirect from index.html to base path */}
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
