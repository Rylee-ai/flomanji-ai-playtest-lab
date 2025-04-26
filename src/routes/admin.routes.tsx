
import React from "react";
import { RouteObject } from "react-router-dom";

import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import NewSimulation from "@/pages/NewSimulation";
import SimulationDetail from "@/pages/SimulationDetail";
import SimulationsList from "@/pages/SimulationsList";
import ContentManager from "@/pages/ContentManager";
import AIContentManager from "@/pages/AIContentManager";
import Settings from "@/pages/Settings";
import Rules from "@/pages/Rules";
import AgentManager from "@/pages/AgentManager";
import WaitlistManager from "@/pages/WaitlistManager";
import NotFound from "@/pages/NotFound";

const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "simulations",
        children: [
          {
            index: true,
            element: <SimulationsList />,
          },
          {
            path: "new",
            element: <NewSimulation />,
          },
          {
            path: ":id",
            element: <SimulationDetail />,
          },
        ],
      },
      {
        path: "content",
        element: <ContentManager />,
      },
      {
        path: "ai-content",
        element: <AIContentManager />,
      },
      {
        path: "agent",
        element: <AgentManager />,
      },
      {
        path: "rules",
        element: <Rules />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "waitlist",
        element: <WaitlistManager />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default adminRoutes;
