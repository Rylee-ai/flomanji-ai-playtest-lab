
import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types";

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
  const { user, isLoading, profile } = useAuth();
  const location = useLocation();

  // Show meaningful debug information
  console.log("AuthGuard check:", {
    requireAuth,
    allowedRoles,
    isLoading,
    hasUser: !!user,
    userEmail: user?.email,
    profileRole: profile?.role,
    currentPath: location.pathname
  });

  // While checking authentication status, show a loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
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
    const redirectPath = profile?.role === 'admin' ? '/dashboard' : '/player';
    console.log(`Already authenticated as ${profile?.role}, redirecting to ${redirectPath}`);
    return <Navigate to={redirectPath} replace />;
  }

  // Check role-based access if roles are specified and user is authenticated
  if (requireAuth && user && allowedRoles && profile) {
    console.log(`Role check: user has ${profile.role}, allowed roles are ${allowedRoles}`);
    if (!allowedRoles.includes(profile.role)) {
      // Redirect to the appropriate dashboard based on user role
      const redirectPath = profile.role === 'admin' ? '/dashboard' : '/player';
      console.log(`Role mismatch, redirecting to ${redirectPath}`);
      return <Navigate to={redirectPath} replace />;
    }
  }

  // If all checks pass, render the children
  console.log("Access granted");
  return <>{children}</>;
};

export default AuthGuard;
