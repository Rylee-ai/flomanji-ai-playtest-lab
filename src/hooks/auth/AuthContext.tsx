
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
  const [profileAttempts, setProfileAttempts] = useState(0);

  // Function to refresh the user profile
  const refreshProfile = async (): Promise<boolean> => {
    if (user) {
      try {
        console.log("Refreshing user profile for:", user.email);
        const userProfile = await fetchUserProfile(user.id);
        
        if (userProfile) {
          // Add the email from the user object
          userProfile.email = user.email || '';
          setProfile(userProfile);
          console.log("Profile refreshed successfully:", userProfile.role);
          return true;
        } else {
          console.error("Failed to fetch user profile during refresh");
          
          // Only show toast if we've attempted a few times
          if (profileAttempts > 2) {
            toast.error("Could not load your profile data. Please try again or contact support.");
          }
          setProfileAttempts(prev => prev + 1);
          return false;
        }
      } catch (error) {
        console.error("Error refreshing profile:", error);
        toast.error("Error refreshing your profile data");
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    console.log("Setting up auth state listener");
    setIsLoading(true);
    
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
              setProfileAttempts(0); // Reset attempts counter on success
            } else {
              console.warn("No profile found for logged in user");
              setProfile(null);
              
              // Don't show toast on first attempt to avoid flickering
              if (profileAttempts > 0) {
                toast.error("Your user profile could not be loaded");
              }
              setProfileAttempts(prev => prev + 1);
            }
          } catch (err) {
            console.error("Profile fetch error:", err);
            setProfile(null);
            toast.error("Error loading your profile");
          }
        } else {
          setProfile(null);
          setProfileAttempts(0);
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
            setProfileAttempts(0);
          } else {
            console.warn("No profile found for existing session");
            setProfileAttempts(1); // Start with 1 attempt
          }
        }).catch(err => {
          console.error("Error in get session profile fetch:", err);
          setProfileAttempts(1);
        });
      }
      
      setIsLoading(false);
    }).catch(err => {
      console.error("Error getting session:", err);
      setIsLoading(false);
    });

    return () => {
      console.log("Cleaning up auth state listener");
      subscription.unsubscribe();
    };
  }, []);

  // Retry profile load if previous attempts failed
  useEffect(() => {
    // Only retry if we have a user but no profile, and have made fewer than 5 attempts
    if (user && !profile && profileAttempts > 0 && profileAttempts < 5) {
      console.log(`Retry attempt ${profileAttempts} to load profile for ${user.email}`);
      
      // Add a delay to allow time for database to catch up
      const timer = setTimeout(() => {
        refreshProfile();
      }, 1000 * profileAttempts); // Exponential backoff
      
      return () => clearTimeout(timer);
    }
  }, [user, profile, profileAttempts]);

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
