
import { RouteObject, Navigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import ContentManager from "@/pages/ContentManager";
import Rules from "@/pages/Rules";
import Settings from "@/pages/Settings";
import NewSimulation from "@/pages/NewSimulation";
import SimulationsManager from "@/pages/SimulationsList";
import SimulationDetail from "@/pages/SimulationDetail";
import WaitlistManager from "@/pages/WaitlistManager";
import AgentManager from "@/pages/AgentManager";
import ShippingManager from "@/pages/ShippingManager";
import Debug from "@/pages/Debug"; 

export const adminRoutes: RouteObject[] = [
  // Redirect from /dashboard to /admin (legacy support)
  {
    path: "/dashboard",
    element: <Navigate to="/admin" replace />
  },
  // Main admin routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "content", element: <ContentManager /> },
      { path: "rules", element: <Rules /> },
      { path: "settings", element: <Settings /> },
      { path: "simulations/new", element: <NewSimulation /> },
      { path: "simulations", element: <SimulationsManager /> },
      { path: "simulations/:id", element: <SimulationDetail /> },
      { path: "waitlist", element: <WaitlistManager /> },
      { path: "agents", element: <AgentManager /> },
      { path: "shipping", element: <ShippingManager /> },
      { path: "debug", element: <Debug /> },
    ],
  },
];
