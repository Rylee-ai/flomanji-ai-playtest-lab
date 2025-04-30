
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { WelcomeModal } from "../player/WelcomeModal";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MessageSquare, Truck, User, Home, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const PlayerLayout = () => {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  
  const navItems = [
    { path: "/player", label: "Home", icon: Home },
    { path: "/player/chat", label: "Chat", icon: MessageSquare },
    { path: "/player/shipping", label: "Shipping", icon: Truck },
    { path: "/player/profile", label: "Profile", icon: User },
  ];
  
  // Get user initials for the avatar
  const getInitials = () => {
    if (!profile) return "U";
    return `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}` || "U";
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top navigation header */}
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link to="/player" className="flex items-center gap-2">
              <span className="font-bold text-xl">Flomanji</span>
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Playtest</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(({ path, label }) => (
              <Link 
                key={path}
                to={path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{profile?.firstName} {profile?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{profile?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {navItems.map(({ path, label, icon: Icon }) => (
                  <DropdownMenuItem key={path} asChild>
                    <Link to={path} className="cursor-pointer w-full flex items-center">
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Mobile navigation - bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-background border-t">
        <div className="grid grid-cols-4 h-16">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center gap-1",
                location.pathname === path ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{label}</span>
            </Link>
          ))}
        </div>
      </div>
      
      <main className="flex-1 container py-6 pb-20 md:pb-6">
        <WelcomeModal />
        <Outlet />
      </main>
    </div>
  );
};

export default PlayerLayout;
