
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

const PublicLayout = () => {
  const { user, profile, signOut } = useAuth();
  
  const isLoggedIn = !!user;
  
  // Determine redirect path based on user role
  const getDashboardPath = () => {
    if (!profile) return "/";
    return profile.role === "admin" ? "/dashboard" : "/player";
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

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild className="border-gray-700 hover:bg-gray-800">
                  <Link to={getDashboardPath()}>My Dashboard</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full border border-gray-700">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={getDashboardPath()}>Dashboard</Link>
                    </DropdownMenuItem>
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

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
