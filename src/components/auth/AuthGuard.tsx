
import React, { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types";
import { isAdminUser, isProfileLoaded } from "@/utils/auth-helpers";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
}

/**
 * A component that guards routes based on authentication status and user roles
 * @param children - The components to render if authentication check passes
 * @param requireAuth - Whether authentication is required (default: true)
 * @param allowedRoles - Array of roles allowed to access the route (if undefined, all roles are allowed)
 */
const AuthGuard = ({ 
  children, 
  requireAuth = true,
  allowedRoles
}: AuthGuardProps) => {
  const { user, isLoading, profile, refreshProfile } = useAuth();
  const location = useLocation();

  // Show meaningful debug information
  useEffect(() => {
    console.log("AuthGuard check:", {
      requireAuth,
      allowedRoles,
      isLoading,
      hasUser: !!user,
      userEmail: user?.email,
      profileRole: profile?.role,
      isProfileLoaded: isProfileLoaded(profile),
      currentPath: location.pathname
    });
    
    // If we have a user but no profile, try to refresh the profile
    if (user && !isProfileLoaded(profile) && !isLoading) {
      console.log("User exists but profile not loaded, attempting refresh");
      refreshProfile();
    }
  }, [user, profile, isLoading, requireAuth, allowedRoles, location.pathname, refreshProfile]);

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
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="ml-2">Loading profile information...</span>
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

  // If all checks pass, render the children
  console.log("Access granted");
  return <>{children}</>;
};

export default AuthGuard;
