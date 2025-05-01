
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
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'lime',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '400px',
        overflow: 'auto',
        maxHeight: '200px'
      }}
    >
      <div><strong>Auth Debug</strong></div>
      <div>User: {user ? `${user.email} (${user.id.slice(0,8)}...)` : 'None'}</div>
      <div>Profile: {profile ? `${profile.role} (${profile.firstName || 'No name'})` : 'None'}</div>
      <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
      <div>Profile Attempts: {profileAttempts}</div>
    </div>
  );
};
