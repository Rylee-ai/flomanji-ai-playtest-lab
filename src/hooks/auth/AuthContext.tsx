
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { UserProfile } from "@/types";
import { AuthContextType } from "./types";
import { fetchUserProfile, signInWithEmail, signUpWithEmail, signOutUser, resetUserPassword } from "./auth-utils";

// Create the auth context with undefined as default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to refresh the user profile
  const refreshProfile = async () => {
    if (user) {
      try {
        const userProfile = await fetchUserProfile(user.id);
        if (userProfile) {
          // Add the email from the user object
          userProfile.email = user.email || '';
          setProfile(userProfile);
        }
      } catch (error) {
        console.error("Error refreshing profile:", error);
      }
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // If user is logged in, fetch their profile
        if (session?.user) {
          // Using setTimeout to prevent deadlocks with Supabase client
          setTimeout(() => {
            fetchUserProfile(session.user.id).then(userProfile => {
              if (userProfile) {
                userProfile.email = session.user.email || '';
                setProfile(userProfile);
              }
            }).catch(err => {
              console.error("Error in auth state change profile fetch:", err);
            });
          }, 0);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // If user is logged in, fetch their profile
      if (session?.user) {
        fetchUserProfile(session.user.id).then(userProfile => {
          if (userProfile) {
            userProfile.email = session.user.email || '';
            setProfile(userProfile);
          }
        }).catch(err => {
          console.error("Error in get session profile fetch:", err);
        });
      }
      
      setIsLoading(false);
    }).catch(err => {
      console.error("Error getting session:", err);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    session,
    user,
    profile,
    isLoading,
    signIn: signInWithEmail,
    signUp: signUpWithEmail,
    signOut: signOutUser,
    resetPassword: resetUserPassword,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
