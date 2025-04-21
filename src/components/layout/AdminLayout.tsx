
import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { BookOpen, BarChart2, PlayCircle, FileText, List, Settings, Bot } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: <BarChart2 className="h-5 w-5" /> },
  { path: "/simulations", label: "Simulations", icon: <PlayCircle className="h-5 w-5" /> },
  { path: "/content", label: "Content", icon: <List className="h-5 w-5" /> },
  { path: "/rules", label: "Rules", icon: <BookOpen className="h-5 w-5" /> },
  { path: "/agents", label: "AI Agents", icon: <Bot className="h-5 w-5" /> },
  { path: "/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

const AdminLayout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <nav className="px-2 space-y-1">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
            location.pathname === item.path || 
            (item.path !== "/" && location.pathname.startsWith(item.path))
              ? "bg-amber-500 text-black font-medium"
              : "text-gray-300 hover:bg-gray-800 hover:text-amber-400"
          }`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {item.icon}
          <span className="ml-3">{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Desktop Sidebar */}
      <aside className="flex-shrink-0 w-64 border-r border-gray-800 bg-black/50 backdrop-blur-sm hidden md:block">
        <div className="p-4 mb-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-amber-400">Flomanji Admin</h1>
          <p className="text-sm text-gray-400">Game Master Dashboard</p>
        </div>
        <NavLinks />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between border-b border-gray-800 bg-black/50 backdrop-blur-sm h-14 px-4 sm:px-6 md:hidden">
          <h1 className="text-lg font-medium text-amber-400">Flomanji Admin</h1>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="text-gray-300 p-2 hover:text-amber-400">
                <List className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-black border-r border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-amber-400">Flomanji Admin</h2>
                <p className="text-sm text-gray-400">Game Master Dashboard</p>
              </div>
              <NavLinks />
            </SheetContent>
          </Sheet>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto px-4 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
