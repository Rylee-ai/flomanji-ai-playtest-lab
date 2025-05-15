
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, X, CupSoda } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { UserProfile } from "@/types";

interface PublicHeaderProps {
  isLoggedIn: boolean;
  profile: UserProfile | null;
  debugMode: boolean;
  toggleDebugMode?: () => void;
  signOut: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleDashboardClick: (e: React.MouseEvent) => void;
}

const PublicHeader: React.FC<PublicHeaderProps> = ({
  isLoggedIn,
  profile,
  debugMode,
  toggleDebugMode,
  signOut,
  mobileMenuOpen,
  setMobileMenuOpen,
  handleDashboardClick
}) => {
  return (
    <header className="border-b border-gray-800 bg-black z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          <span className="text-amber-400">FLOMANJI</span>
          <span className="flex items-center">
            <CupSoda className="h-5 w-5 mr-1 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold italic relative">
              GOBLET
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600/0 via-emerald-400 to-emerald-600/0"></span>
            </span>
          </span>
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
  );
};

export default PublicHeader;
