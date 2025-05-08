
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContextType } from "@/hooks/auth/types";
import { showInfoToast, showErrorToast } from "@/lib/toast";
import { log } from "@/utils/logging";

export const useDashboardNavigation = (auth: AuthContextType) => {
  const { user, profile, isLoading, refreshProfile } = auth;
  const navigate = useNavigate();
  const location = useLocation();
  const [navError, setNavError] = useState<string | null>(null);

  // Clear navigation error when location changes
  useEffect(() => {
    setNavError(null);
  }, [location.pathname]);
  
  // Helper function to determine which dashboard to navigate to
  const getDashboardPath = () => {
    // Default to player dashboard if no profile or if profile load is still pending
    if (!profile) {
      log.info("No profile available, defaulting to /player dashboard");
      return "/player";
    }
    
    log.info(`Navigating based on role: ${profile.role}`);
    return profile.role === "admin" ? "/admin" : "/player";
  };

  // Handle dashboard navigation with robust error handling
  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If profile is loading, show a loading message
    if (isLoading) {
      showInfoToast("Loading your profile", "Please wait a moment while we load your information");
      return;
    }

    // If not logged in (shouldn't happen due to UI hiding), redirect to auth
    if (!user) {
      log.error("Dashboard click attempted without login");
      showInfoToast("Not signed in", "Please sign in to access your dashboard");
      navigate('/auth');
      return;
    }
    
    try {
      // If no profile, try to refresh it before navigation
      if (!profile) {
        log.warn("Profile not loaded yet. Attempting refresh before navigation.");
        showInfoToast("Loading your profile", "Please wait while we access your information");
        
        // Try to refresh the profile and navigate on success
        refreshProfile().then(success => {
          if (success) {
            const path = getDashboardPath();
            log.info(`Profile refresh successful, navigating to: ${path}`);
            navigate(path);
          } else {
            setNavError("Could not load your profile information. Please try again.");
            showErrorToast("Could not load your profile information. Please try again.");
          }
        });
      } else {
        // Profile is loaded, navigate directly
        const path = getDashboardPath();
        log.info(`Navigating to ${path} for ${profile.role} user: ${profile.email}`);
        navigate(path);
      }
    } catch (error) {
      log.error("Navigation error:", error);
      setNavError("An error occurred while navigating to your dashboard");
      showErrorToast("An unexpected error occurred. Please try again.");
    }
  };

  return { navError, setNavError, handleDashboardClick };
};
