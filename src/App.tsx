import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "@/components/auth/AuthGuard";
import AdminLayout from "./components/layout/AdminLayout";
import PlayerLayout from "./components/layout/PlayerLayout";
import PublicLayout from "./components/layout/PublicLayout";

// Admin pages
import Dashboard from "./pages/Dashboard";
import SimulationsList from "./pages/SimulationsList";
import NewSimulation from "./pages/NewSimulation";
import SimulationDetail from "./pages/SimulationDetail";
import ContentManager from "./pages/ContentManager";
import Rules from "./pages/Rules";
import Settings from "./pages/Settings";
import AgentManager from "./pages/AgentManager";
import WaitlistManager from "./pages/WaitlistManager";

// Player pages
import PlayerDashboard from "./pages/player/PlayerDashboard";
import PlayerChat from "./pages/player/PlayerChat";
import PlayerProfile from "./pages/player/PlayerProfile";
import PlayerShipping from "./pages/player/PlayerShipping";

// Public pages
import HomePage from "./pages/public/HomePage";
import AuthPage from "./pages/public/AuthPage";
import WaitlistSignup from "./pages/public/WaitlistSignup";
import NotFound from "./pages/NotFound";

import { Suspense, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

// New company pages
import About from "./pages/about";
import Team from "./pages/team";
import Contact from "./pages/contact";
import PressKit from "./pages/press-kit";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import Cookies from "./pages/cookies";

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
    },
  },
});

// Add a global error handler for query errors
queryClient.setDefaultOptions({
  queries: {
    meta: {
      onError: (error: Error) => {
        console.error("Query error:", error);
      }
    }
  }
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
        <AuthProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Public routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route 
                    path="/auth" 
                    element={
                      <AuthGuard requireAuth={false}>
                        <AuthPage />
                      </AuthGuard>
                    } 
                  />
                  <Route path="/waitlist" element={<WaitlistSignup />} />

                  {/* New company pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/press-kit" element={<PressKit />} />

                  {/* New legal pages */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookies" element={<Cookies />} />
                </Route>

                {/* Admin routes */}
                <Route 
                  element={
                    <AuthGuard requireAuth={true} allowedRoles={['admin']}>
                      <AdminLayout />
                    </AuthGuard>
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/simulations" element={<SimulationsList />} />
                  <Route path="/simulations/new" element={<NewSimulation />} />
                  <Route path="/simulations/:id" element={<SimulationDetail />} />
                  <Route path="/content" element={<ContentManager />} />
                  <Route path="/rules" element={<Rules />} />
                  <Route path="/agents" element={<AgentManager />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/waitlist-manager" element={<WaitlistManager />} />
                </Route>

                {/* Player routes */}
                <Route 
                  element={
                    <AuthGuard requireAuth={true} allowedRoles={['player']}>
                      <PlayerLayout />
                    </AuthGuard>
                  }
                >
                  <Route path="/player" element={<PlayerDashboard />} />
                  <Route path="/player/chat" element={<PlayerChat />} />
                  <Route path="/player/chat/:id" element={<PlayerChat />} />
                  <Route path="/player/profile" element={<PlayerProfile />} />
                  <Route path="/player/shipping" element={<PlayerShipping />} />
                </Route>

                {/* Redirect from index.html to base path */}
                <Route path="/index.html" element={<Navigate to="/" replace />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
