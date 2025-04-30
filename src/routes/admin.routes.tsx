
import { RouteObject } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import Dashboard from "@/pages/Dashboard";
import SimulationsList from "@/pages/SimulationsList";
import NewSimulation from "@/pages/NewSimulation";
import SimulationDetail from "@/pages/SimulationDetail";
import ContentManager from "@/pages/ContentManager";
import Rules from "@/pages/Rules";
import Settings from "@/pages/Settings";
import AgentManager from "@/pages/AgentManager";
import WaitlistManager from "@/pages/WaitlistManager";
import ShippingManager from "@/pages/ShippingManager";

export const adminRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard requireAuth={true} allowedRoles={['admin']}>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/simulations", element: <SimulationsList /> },
      { path: "/simulations/new", element: <NewSimulation /> },
      { path: "/simulations/:id", element: <SimulationDetail /> },
      { path: "/content", element: <ContentManager /> },
      { path: "/rules", element: <Rules /> },
      { path: "/agents", element: <AgentManager /> },
      { path: "/settings", element: <Settings /> },
      { path: "/waitlist-manager", element: <WaitlistManager /> },
      { path: "/shipping-manager", element: <ShippingManager /> },
    ],
  },
];
