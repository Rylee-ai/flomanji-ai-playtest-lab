
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl flex items-center">
            <span className="ml-2">Flomanji Playtest</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/waitlist">Join Waitlist</Link>
            </Button>
            <Button asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Flomanji. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
