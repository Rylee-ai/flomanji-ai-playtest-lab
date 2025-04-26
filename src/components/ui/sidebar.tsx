
import { cn } from "@/lib/utils";
import {
  GaugeCircle,
  LayoutGrid,
  Settings,
  FileText,
  MessagesSquare,
  LayoutDashboard,
  Bot,
  Wand2,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlabMode?: boolean;
}

export function Sidebar({ className, playlabMode }: SidebarProps) {
  const location = useLocation();
  const activePath = location.pathname;

  const navItems = playlabMode
    ? [
        {
          href: "/player",
          label: "Dashboard",
          icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
        },
        {
          href: "/player/chat",
          label: "Chat",
          icon: <MessagesSquare className="mr-2 h-4 w-4" />,
        },
        {
          href: "/player/profile",
          label: "Profile",
          icon: <GaugeCircle className="mr-2 h-4 w-4" />,
        },
        {
          href: "/player/shipping",
          label: "Order Info",
          icon: <FileText className="mr-2 h-4 w-4" />,
        },
      ]
    : [
        {
          href: "/",
          label: "Dashboard",
          icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
        },
        {
          href: "/simulations",
          label: "Simulations",
          icon: <GaugeCircle className="mr-2 h-4 w-4" />,
        },
        {
          href: "/content",
          label: "Content Manager",
          icon: <LayoutGrid className="mr-2 h-4 w-4" />,
        },
        {
          href: "/ai-content",
          label: "AI Content Assistant",
          icon: <Wand2 className="mr-2 h-4 w-4" />,
        },
        {
          href: "/agent",
          label: "Agent Manager",
          icon: <Bot className="mr-2 h-4 w-4" />,
        },
        {
          href: "/rules",
          label: "Rules",
          icon: <FileText className="mr-2 h-4 w-4" />,
        },
        {
          href: "/settings",
          label: "Settings",
          icon: <Settings className="mr-2 h-4 w-4" />,
        },
        {
          href: "/waitlist",
          label: "Waitlist",
          icon: <Users className="mr-2 h-4 w-4" />,
        },
      ];

  return (
    <div className={cn("pb-12 h-full flex flex-col", className)}>
      <div className="space-y-4 py-4 flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <ScrollArea className="h-full">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={activePath === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={item.href}>
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <Separator />
      <div className="px-3 py-4 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <div>Flomanji AI Playtest Lab</div>
          <div className="text-xs">v1.0.0</div>
        </div>
      </div>
    </div>
  );
}
