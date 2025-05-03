
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile } from "@/types";
import { fetchUserProfile } from "./auth-utils";
import { toast } from "sonner";

/**
 * Hook for managing user profile loading and refreshing
 */
export function useProfileManagement(initialUser: User | null, debugMode: boolean) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileAttempts, setProfileAttempts] = useState(0);

  /**
   * Function to refresh the user profile
   */
  const refreshProfile = async (userId?: string): Promise<boolean> => {
    // Use provided userId or get it from initialUser
    const userToRefresh = userId || initialUser?.id;
    const userEmail = initialUser?.email;
    
    if (!userToRefresh) {
      console.warn("Cannot refresh profile: no userId provided");
      return false;
    }
    
    try {
      console.log("Refreshing user profile for:", userEmail || userToRefresh);
      const userProfile = await fetchUserProfile(userToRefresh);
      
      if (userProfile) {
        // Add the email from the user object if available
        if (userEmail) {
          userProfile.email = userEmail;
        }
        
        setProfile(userProfile);
        console.log("Profile refreshed successfully:", userProfile.role);
        
        // Debug info
        if (debugMode) {
          console.table({
            userId: userToRefresh,
            userEmail: userEmail,
            profileId: userProfile.id,
            profileRole: userProfile.role,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName
          });
        }
        
        setProfileAttempts(0); // Reset attempts counter on success
        return true;
      } else {
        console.error("Failed to fetch user profile during refresh");
        
        // Only show toast if we've tried multiple times to avoid flickering
        if (profileAttempts > 2) {
          toast.error("Could not load your profile data. Please try again or contact support.");
        }
        
        setProfileAttempts(prev => prev + 1);
        return false;
      }
    } catch (error) {
      console.error("Error refreshing profile:", error);
      
      // Only show toast if we've tried multiple times to avoid flickering
      if (profileAttempts > 2) {
        toast.error("Error refreshing your profile data");
      }
      
      setProfileAttempts(prev => prev + 1);
      return false;
    }
  };

  return {
    profile,
    setProfile,
    profileAttempts,
    setProfileAttempts,
    refreshProfile
  };
}
