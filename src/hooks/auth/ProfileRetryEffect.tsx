
import { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile } from "@/types";

interface ProfileRetryEffectProps {
  user: User | null;
  profile: UserProfile | null;
  profileAttempts: number;
  refreshProfile: () => Promise<boolean>;
}

/**
 * Effect component to retry profile loading when initial attempts fail
 */
export function ProfileRetryEffect({ 
  user, 
  profile, 
  profileAttempts, 
  refreshProfile 
}: ProfileRetryEffectProps) {
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
  }, [user, profile, profileAttempts, refreshProfile]);

  return null;
}
