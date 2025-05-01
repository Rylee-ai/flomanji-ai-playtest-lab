
import React from "react";
import { Link } from "react-router-dom";
import { UserProfile } from "@/types";

interface PublicMobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  setIsOpen: (open: boolean) => void;
  handleDashboardClick: (e: React.MouseEvent) => void;
  signOut: () => void;
}

const PublicMobileMenu: React.FC<PublicMobileMenuProps> = ({
  isOpen,
  isLoggedIn,
  setIsOpen,
  handleDashboardClick,
  signOut
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-gray-900 border-b border-gray-800">
      <nav className="container mx-auto px-4 py-3 flex flex-col">
        <Link 
          to="/" 
          className="py-2 hover:text-amber-400"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className="py-2 hover:text-amber-400"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link 
          to="/gameplay" 
          className="py-2 hover:text-amber-400"
          onClick={() => setIsOpen(false)}
        >
          Gameplay
        </Link>
        <Link 
          to="/faq" 
          className="py-2 hover:text-amber-400"
          onClick={() => setIsOpen(false)}
        >
          FAQ
        </Link>
        {isLoggedIn ? (
          <>
            <button 
              className="py-2 text-left hover:text-amber-400"
              onClick={(e) => {
                setIsOpen(false);
                handleDashboardClick(e);
              }}
            >
              My Dashboard
            </button>
            <button 
              className="py-2 text-left text-red-400"
              onClick={() => {
                setIsOpen(false);
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
              onClick={() => setIsOpen(false)}
            >
              Join Waitlist
            </Link>
            <Link 
              to="/auth" 
              className="py-2 hover:text-amber-400"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default PublicMobileMenu;
