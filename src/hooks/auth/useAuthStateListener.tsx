
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { UserProfile } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { fetchUserProfile } from "./auth-utils";
import { toast } from "sonner";

interface UseAuthStateListenerProps {
  setProfile: (profile: UserProfile | null) => void;
  setProfileAttempts: (value: number | ((prev: number) => number)) => void;
  debugMode: boolean;
}

/**
 * Hook for listening to authentication state changes
 */
export function useAuthStateListener({
  setProfile,
  setProfileAttempts,
  debugMode
}: UseAuthStateListenerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Setting up auth state listener");
    setIsLoading(true);
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If user is logged in, fetch their profile
        if (currentSession?.user) {
          console.log("User logged in, fetching profile for:", currentSession.user.email);
          
          try {
            const userProfile = await fetchUserProfile(currentSession.user.id);
            if (userProfile) {
              userProfile.email = currentSession.user.email || '';
              setProfile(userProfile);
              console.log("Profile loaded:", userProfile.role);
              
              if (debugMode) {
                console.log("Auth debug - Profile loaded successfully:", {
                  role: userProfile.role,
                  name: `${userProfile.firstName} ${userProfile.lastName}`,
                  email: userProfile.email
                });
              }
              
              setProfileAttempts(0); // Reset attempts counter on success
            } else {
              console.warn("No profile found for logged in user");
              setProfile(null);
              
              // Don't show toast on first attempt to avoid flickering
              if (event !== 'INITIAL_SESSION') {
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
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Getting existing session:", currentSession?.user?.email || "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // If user is logged in, fetch their profile
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id).then(userProfile => {
          if (userProfile) {
            userProfile.email = currentSession.user.email || '';
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
  }, [debugMode, setProfile, setProfileAttempts]);

  return { user, session, isLoading };
}
