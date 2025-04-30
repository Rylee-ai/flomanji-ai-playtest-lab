
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { UserProfile } from "@/types";
import { AuthContextType } from "./types";
import { fetchUserProfile, signInWithEmail, signUpWithEmail, signOutUser, resetUserPassword } from "./auth-utils";
import { toast } from "sonner";

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
        console.log("Refreshing user profile for:", user.email);
        const userProfile = await fetchUserProfile(user.id);
        
        if (userProfile) {
          // Add the email from the user object
          userProfile.email = user.email || '';
          setProfile(userProfile);
          console.log("Profile refreshed successfully:", userProfile.role);
        } else {
          console.error("Failed to fetch user profile during refresh");
          toast.error("Could not load your profile data. Please try again or contact support.");
        }
      } catch (error) {
        console.error("Error refreshing profile:", error);
        toast.error("Error refreshing your profile data");
      }
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        setUser(session?.user ?? null);
        
        // If user is logged in, fetch their profile
        if (session?.user) {
          console.log("User logged in, fetching profile for:", session.user.email);
          
          try {
            const userProfile = await fetchUserProfile(session.user.id);
            if (userProfile) {
              userProfile.email = session.user.email || '';
              setProfile(userProfile);
              console.log("Profile loaded:", userProfile.role);
            } else {
              console.warn("No profile found for logged in user");
              setProfile(null);
              toast.error("Your user profile could not be loaded");
            }
          } catch (err) {
            console.error("Profile fetch error:", err);
            setProfile(null);
            toast.error("Error loading your profile");
          }
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Getting existing session:", session?.user?.email || "No session");
      setSession(session);
      setUser(session?.user ?? null);
      
      // If user is logged in, fetch their profile
      if (session?.user) {
        fetchUserProfile(session.user.id).then(userProfile => {
          if (userProfile) {
            userProfile.email = session.user.email || '';
            setProfile(userProfile);
            console.log("Existing profile loaded:", userProfile.role);
          } else {
            console.warn("No profile found for existing session");
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
