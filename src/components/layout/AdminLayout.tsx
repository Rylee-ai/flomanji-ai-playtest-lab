
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { BookOpen, BarChart2, PlayCircle, FileText, List, Settings, Bot } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

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
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="flex-shrink-0 w-64 border-r bg-card hidden md:block">
        <div className="p-4 mb-4">
          <h1 className="text-xl font-bold">Flomanji Admin</h1>
          <p className="text-sm text-muted-foreground">Game Master Dashboard</p>
        </div>
        
        <nav className="px-2 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                location.pathname === item.path || 
                (item.path !== "/" && location.pathname.startsWith(item.path))
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center border-b h-14 px-4 sm:px-6 md:hidden">
          <button className="text-foreground">
            <List className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-lg font-medium">Flomanji Admin</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
