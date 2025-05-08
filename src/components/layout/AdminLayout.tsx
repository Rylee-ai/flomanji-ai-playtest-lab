
import React from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  PlaySquare, 
  LayoutGrid, 
  FileText, 
  Bot, 
  Truck,
  UserCheck,
  Bug as BugIcon
} from "lucide-react";
import { log } from "@/utils/logging";

const AdminLayout = () => {
  const { signOut, user, profile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();
  
  const navItems = [
    { title: "Dashboard", icon: <Home className="h-4 w-4 mr-2" />, href: "/admin" },
    { title: "Simulations", icon: <PlaySquare className="h-4 w-4 mr-2" />, href: "/admin/simulations" },
    { title: "Content", icon: <LayoutGrid className="h-4 w-4 mr-2" />, href: "/admin/content" },
    { title: "Rules", icon: <FileText className="h-4 w-4 mr-2" />, href: "/admin/rules" },
    { title: "AI Agents", icon: <Bot className="h-4 w-4 mr-2" />, href: "/admin/agents" },
    { title: "Playtesters", icon: <UserCheck className="h-4 w-4 mr-2" />, href: "/admin/waitlist" },
    { title: "Shipping", icon: <Truck className="h-4 w-4 mr-2" />, href: "/admin/shipping" },
    { title: "Settings", icon: <Settings className="h-4 w-4 mr-2" />, href: "/admin/settings" },
    { title: "Debug", icon: <BugIcon className="h-4 w-4 mr-2" />, href: "/admin/debug", section: 'admin' },
  ];
  
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-gray-950 border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <Link to="/" className="flex items-center text-xl font-bold text-amber-400">
            FLOMANJI
          </Link>
        </div>
        <nav className="flex flex-col flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 rounded-md text-sm
                  ${isActive 
                    ? 'bg-amber-500/20 text-amber-400' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                `}
              >
                {item.icon}
                {item.title}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                {profile?.firstName || user?.email}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-500">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}></div>
      <div className={`fixed inset-y-0 left-0 w-64 bg-gray-950 border-r border-gray-800 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <Link to="/" className="flex items-center text-xl font-bold text-amber-400">
            FLOMANJI
          </Link>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 rounded-md text-sm
                  ${isActive 
                    ? 'bg-amber-500/20 text-amber-400' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon}
                {item.title}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Button variant="ghost" className="w-full justify-start" onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header for mobile */}
        <header className="md:hidden bg-gray-950 border-b border-gray-800 p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center text-xl font-bold text-amber-400">
            FLOMANJI
          </Link>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-900 p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
