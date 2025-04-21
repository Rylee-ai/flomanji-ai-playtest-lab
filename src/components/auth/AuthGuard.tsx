
import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
}

/**
 * A component that guards routes based on authentication status
 * @param children - The components to render if authentication check passes
 * @param requireAuth - Whether authentication is required (default: true)
 */
const AuthGuard = ({ children, requireAuth = true }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // While checking authentication status, show a loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // For protected routes: if no user is logged in, redirect to login
  if (requireAuth && !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // For public routes that should be inaccessible when logged in (like login page)
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default AuthGuard;
