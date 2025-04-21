
import { RouteObject } from "react-router-dom";
import PlayerLayout from "@/components/layout/PlayerLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import PlayerDashboard from "@/pages/player/PlayerDashboard";
import PlayerChat from "@/pages/player/PlayerChat";
import PlayerProfile from "@/pages/player/PlayerProfile";
import PlayerShipping from "@/pages/player/PlayerShipping";

export const playerRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard requireAuth={true} allowedRoles={['player']}>
        <PlayerLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/player", element: <PlayerDashboard /> },
      { path: "/player/chat", element: <PlayerChat /> },
      { path: "/player/chat/:id", element: <PlayerChat /> },
      { path: "/player/profile", element: <PlayerProfile /> },
      { path: "/player/shipping", element: <PlayerShipping /> },
    ],
  },
];

