
import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { User, AlertCircle, Menu, X } from "lucide-react";
import { isAdminUser } from "@/utils/auth-helpers";
import { toast } from "sonner";

const PublicLayout = () => {
  const { user, profile, signOut, isLoading, refreshProfile, debugMode, toggleDebugMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navError, setNavError] = useState<string | null>(null);
  
  const isLoggedIn = !!user;

  // Clear navigation error when location changes
  useEffect(() => {
    setNavError(null);
  }, [location.pathname]);
  
  // Helper function to determine which dashboard to navigate to
  const getDashboardPath = () => {
    // Default to player dashboard if no profile or if profile load is still pending
    if (!profile) {
      console.log("No profile available, defaulting to /player dashboard");
      return "/player";
    }
    
    console.log(`Navigating based on role: ${profile.role}`);
    return profile.role === "admin" ? "/dashboard" : "/player";
  };

  // Handle dashboard navigation with robust error handling
  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If profile is loading, show a loading message
    if (isLoading) {
      toast("Loading your profile", {
        description: "Please wait a moment while we load your information"
      });
      return;
    }

    // If not logged in (shouldn't happen due to UI hiding), redirect to auth
    if (!user) {
      console.error("Dashboard click attempted without login");
      toast("Not signed in", {
        description: "Please sign in to access your dashboard"
      });
      navigate('/auth');
      return;
    }
    
    try {
      // If no profile, try to refresh it before navigation
      if (!profile) {
        console.warn("Profile not loaded yet. Attempting refresh before navigation.");
        toast("Loading your profile", {
          description: "Please wait while we access your information"
        });
        
        // Try to refresh the profile and navigate on success
        refreshProfile().then(success => {
          if (success) {
            const path = getDashboardPath();
            console.log(`Profile refresh successful, navigating to: ${path}`);
            navigate(path);
          } else {
            setNavError("Could not load your profile information. Please try again.");
            toast("Navigation error", {
              description: "Could not load your profile information. Please try again."
            });
          }
        });
      } else {
        // Profile is loaded, navigate directly
        const path = getDashboardPath();
        console.log(`Navigating to ${path} for ${profile.role} user: ${profile.email}`);
        navigate(path);
      }
    } catch (error) {
      console.error("Navigation error:", error);
      setNavError("An error occurred while navigating to your dashboard");
      toast("Navigation error", {
        description: "An unexpected error occurred. Please try again."
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl flex items-center text-amber-400">
            <span>FLOMANJI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm hover:text-amber-400 transition-colors">Home</Link>
            <Link to="/about" className="text-sm hover:text-amber-400 transition-colors">About</Link>
            <Link to="/gameplay" className="text-sm hover:text-amber-400 transition-colors">Gameplay</Link>
            <Link to="/faq" className="text-sm hover:text-amber-400 transition-colors">FAQ</Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800" 
                  onClick={handleDashboardClick}
                >
                  My Dashboard
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full border border-gray-700">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {profile && (
                      <div className="px-2 py-1.5 text-sm">
                        Signed in as <span className="font-medium">{profile.email}</span>
                        <div className="text-xs text-muted-foreground">
                          Role: {profile.role}
                        </div>
                      </div>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <button className="w-full text-left" onClick={handleDashboardClick}>
                        Dashboard
                      </button>
                    </DropdownMenuItem>
                    {toggleDebugMode && (
                      <DropdownMenuItem 
                        onClick={toggleDebugMode}
                        className="cursor-pointer"
                      >
                        {debugMode ? 'Disable Debug Mode' : 'Enable Debug Mode'}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => signOut()}
                      className="text-red-500 cursor-pointer"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button variant="outline" asChild className="border-gray-700 hover:bg-gray-800 hidden md:flex">
                  <Link to="/waitlist">Join Waitlist</Link>
                </Button>
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
                  <Link to="/auth">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <nav className="container mx-auto px-4 py-3 flex flex-col">
            <Link 
              to="/" 
              className="py-2 hover:text-amber-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="py-2 hover:text-amber-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/gameplay" 
              className="py-2 hover:text-amber-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gameplay
            </Link>
            <Link 
              to="/faq" 
              className="py-2 hover:text-amber-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            {isLoggedIn ? (
              <>
                <button 
                  className="py-2 text-left hover:text-amber-400"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleDashboardClick(e);
                  }}
                >
                  My Dashboard
                </button>
                <button 
                  className="py-2 text-left text-red-400"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/waitlist" 
                  className="py-2 hover:text-amber-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Waitlist
                </Link>
                <Link 
                  to="/auth" 
                  className="py-2 hover:text-amber-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </>
            )}
          </nav>
        </div>
      )}

      {/* Error message */}
      {navError && (
        <div className="bg-red-900/20 border border-red-500/50 text-white p-4 flex gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <div>
            <h3 className="font-medium">Navigation error</h3>
            <p className="text-sm">{navError}</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
