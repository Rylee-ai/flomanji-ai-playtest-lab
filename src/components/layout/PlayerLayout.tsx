
import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare, User, Truck, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { path: "/player", label: "Dashboard", icon: <User className="h-5 w-5" /> },
  { path: "/player/chat", label: "Chat with GM", icon: <MessageSquare className="h-5 w-5" /> },
  { path: "/player/shipping", label: "Shipping Status", icon: <Truck className="h-5 w-5" /> },
];

const PlayerLayout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { signOut, profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const NavLinks = () => (
    <nav className="px-2 space-y-1">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
            location.pathname === item.path || 
            (item.path !== "/player" && location.pathname.startsWith(item.path))
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {item.icon}
          <span className="ml-3">{item.label}</span>
        </Link>
      ))}
      
      <Button 
        variant="ghost" 
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-4"
        onClick={handleSignOut}
      >
        <LogOut className="h-5 w-5 mr-3" />
        Sign Out
      </Button>
    </nav>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="flex-shrink-0 w-64 border-r bg-card hidden md:block">
        <div className="p-4 mb-4">
          <h1 className="text-xl font-bold">Flomanji Playtest</h1>
          <p className="text-sm text-muted-foreground">
            Welcome, {profile?.firstName || 'Player'}
          </p>
        </div>
        <NavLinks />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between border-b h-14 px-4 sm:px-6 md:hidden">
          <h1 className="text-lg font-medium">Flomanji Playtest</h1>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="text-foreground p-2">
                <User className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Flomanji Playtest</h2>
                <p className="text-sm text-muted-foreground">
                  Welcome, {profile?.firstName || 'Player'}
                </p>
              </div>
              <NavLinks />
            </SheetContent>
          </Sheet>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PlayerLayout;
