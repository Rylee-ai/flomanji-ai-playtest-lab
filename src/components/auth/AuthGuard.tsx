
import React, { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/auth/AuthContext"; // Import directly from the source
import { UserRole } from "@/types";
import { isAdminUser, isProfileLoaded } from "@/utils/auth-helpers";
import { Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import NavigationError from "@/components/layout/NavigationError";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
}

/**
 * A component that guards routes based on authentication status and user roles
 */
const AuthGuard = ({ 
  children, 
  requireAuth = true,
  allowedRoles
}: AuthGuardProps) => {
  const { user, isLoading, profile, refreshProfile, debugMode } = useAuth();
  const location = useLocation();
  const [refreshAttempts, setRefreshAttempts] = useState(0);
  const [navigationError, setNavigationError] = useState<string | null>(null);

  // Show meaningful debug information
  useEffect(() => {
    const logInfo = {
      requireAuth,
      allowedRoles,
      isLoading,
      hasUser: !!user,
      userEmail: user?.email,
      profileRole: profile?.role,
      isProfileLoaded: isProfileLoaded(profile),
      currentPath: location.pathname,
      refreshAttempts
    };
    
    // Always log basic info
    console.log("AuthGuard check:", logInfo);
    
    // If in debug mode, log more detailed info
    if (debugMode) {
      console.table(logInfo);
    }
    
    // If we have a user but no profile, try to refresh the profile
    if (user && !isProfileLoaded(profile) && !isLoading && refreshAttempts < 3) {
      console.log("User exists but profile not loaded, attempting refresh");
      setRefreshAttempts(prev => prev + 1);
      
      refreshProfile().then(success => {
        if (success) {
          console.log("Profile refresh successful in AuthGuard");
          setNavigationError(null);
        } else {
          console.warn("Profile refresh failed in AuthGuard");
          if (requireAuth && allowedRoles && refreshAttempts >= 2) {
            setNavigationError("Your profile information couldn't be loaded. Please try signing out and back in.");
          }
        }
      });
    }
  }, [user, profile, isLoading, requireAuth, allowedRoles, location.pathname, refreshProfile, debugMode, refreshAttempts]);

  // While checking authentication status, show a loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="ml-2">Verifying access...</span>
      </div>
    );
  }

  // For protected routes: if no user is logged in, redirect to login
  if (requireAuth && !user) {
    console.log("Not authenticated, redirecting to auth page");
    // Save the attempted location so we can redirect after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // For public routes that should be inaccessible when logged in (like login page)
  if (!requireAuth && user) {
    // Redirect admin users to admin dashboard, players to player dashboard
    const redirectPath = isAdminUser(profile) ? '/dashboard' : '/player';
    console.log(`Already authenticated as ${profile?.role}, redirecting to ${redirectPath}`);
    return <Navigate to={redirectPath} replace />;
  }

  // Special case: If we need role-based access but profile isn't loaded yet
  if (requireAuth && user && allowedRoles && !isProfileLoaded(profile)) {
    if (refreshAttempts >= 3) {
      // After multiple attempts, show error but still let them view the page
      // This prevents them from being completely stuck
      return (
        <>
          <NavigationError errorMessage={navigationError} />
          {children}
        </>
      );
    }
    
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <span className="mb-2">Loading profile information...</span>
        <button 
          className="text-sm text-blue-500 hover:underline mt-4 flex items-center gap-1"
          onClick={() => {
            setRefreshAttempts(0); // Reset attempts
            refreshProfile();
            toast("Refreshing profile", {
              description: "Attempting to load your profile data again"
            });
          }}
        >
          <AlertTriangle className="h-4 w-4" /> Click to retry
        </button>
      </div>
    );
  }

  // Check role-based access if roles are specified and user is authenticated
  if (requireAuth && user && allowedRoles && profile) {
    console.log(`Role check: user has ${profile.role}, allowed roles are ${allowedRoles}`);
    if (!allowedRoles.includes(profile.role)) {
      // Redirect to the appropriate dashboard based on user role
      const redirectPath = isAdminUser(profile) ? '/dashboard' : '/player';
      console.log(`Role mismatch, redirecting to ${redirectPath}`);
      return <Navigate to={redirectPath} replace />;
    }
  }

  // If all checks pass, render the children, possibly with an error banner
  console.log("Access granted");
  return (
    <>
      <NavigationError errorMessage={navigationError} />
      {children}
    </>
  );
};

export default AuthGuard;
