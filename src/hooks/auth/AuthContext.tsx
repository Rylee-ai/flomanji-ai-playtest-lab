
import { createContext, useContext, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { UserProfile } from "@/types";
import { AuthContextType } from "./types";
import { signInWithEmail, signUpWithEmail, signOutUser, resetUserPassword } from "./auth-utils";
import { useDebugMode } from "./useDebugMode";
import { useProfileManagement } from "./useProfileManagement";
import { useAuthStateListener } from "./useAuthStateListener";
import { AuthDebugDisplay } from "./AuthDebugDisplay";

// Create the auth context with undefined as default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Use custom hooks to manage state
  const { debugMode, toggleDebugMode } = useDebugMode();
  const { profile, setProfile, profileAttempts, setProfileAttempts, refreshProfile } = useProfileManagement(null, debugMode);
  
  // Auth state listener handles user and session state
  const { user, session, isLoading } = useAuthStateListener({
    setProfile, 
    setProfileAttempts,
    debugMode
  });

  // Helper function for sign in that also fetches the profile
  const signIn = async (email: string, password: string) => {
    const result = await signInWithEmail(email, password);
    return result;
  };

  const value: AuthContextType = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp: signUpWithEmail,
    signOut: signOutUser,
    resetPassword: resetUserPassword,
    refreshProfile,
    debugMode,
    toggleDebugMode
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthDebugDisplay 
        debugMode={debugMode} 
        user={user} 
        profile={profile} 
        isLoading={isLoading} 
        profileAttempts={profileAttempts}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
