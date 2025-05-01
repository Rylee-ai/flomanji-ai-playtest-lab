
import React from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile } from "@/types";

interface AuthDebugDisplayProps {
  debugMode: boolean;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  profileAttempts: number;
}

/**
 * Component to display debug information when debug mode is enabled
 */
export const AuthDebugDisplay: React.FC<AuthDebugDisplayProps> = ({
  debugMode,
  user,
  profile,
  isLoading,
  profileAttempts
}) => {
  if (!debugMode) return null;
  
  return (
    <div className="fixed bottom-3 right-3 bg-black/80 text-lime-500 p-3 rounded-md text-xs z-50 max-w-sm overflow-auto max-h-48">
      <div><strong>Auth Debug</strong></div>
      <div>User: {user ? `${user.email} (${user.id.slice(0,8)}...)` : 'None'}</div>
      <div>Profile: {profile ? `${profile.role} (${profile.firstName || 'No name'})` : 'None'}</div>
      <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
      <div>Profile Attempts: {profileAttempts}</div>
    </div>
  );
};
