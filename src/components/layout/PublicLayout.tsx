
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import PublicHeader from "./PublicHeader";
import PublicMobileMenu from "./PublicMobileMenu";
import NavigationError from "./NavigationError";
import { useDashboardNavigation } from "./useDashboardNavigation";

const PublicLayout = () => {
  const auth = useAuth();
  const { user, profile, signOut, isLoading, debugMode, toggleDebugMode } = auth;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isLoggedIn = !!user;
  const { navError, handleDashboardClick } = useDashboardNavigation(auth);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <PublicHeader 
        isLoggedIn={isLoggedIn}
        profile={profile}
        debugMode={debugMode}
        toggleDebugMode={toggleDebugMode}
        signOut={signOut}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleDashboardClick={handleDashboardClick}
      />

      <PublicMobileMenu 
        isOpen={mobileMenuOpen}
        isLoggedIn={isLoggedIn}
        setIsOpen={setMobileMenuOpen}
        handleDashboardClick={handleDashboardClick}
        signOut={signOut}
      />

      <NavigationError errorMessage={navError} />

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
