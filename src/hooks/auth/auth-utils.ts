
import { toast } from "sonner";
import { UserProfile } from "@/types";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches user profile data from the Supabase profiles table
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    console.log(`Fetching profile for user: ${userId}`);
    
    if (!userId) {
      console.error("Cannot fetch profile: User ID is empty");
      return null;
    }
    
    // Query the profiles table from our database with a timeout to prevent hanging
    const { data, error } = await Promise.race([
      supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Profile fetch timeout")), 10000)
      )
    ]) as any;

    if (error) {
      // Handle specific error cases more gracefully
      console.error('Error fetching user profile:', error);
      
      // Check if this is a permissions error (common with RLS issues)
      if (error.code === 'PGRST116') {
        console.warn('Permission denied error. This might be an RLS policy issue.');
      }
      
      return null;
    }

    if (!data) {
      console.warn(`No profile found for user ID: ${userId}`);
      return null;
    }

    // Transform the data to match our UserProfile type - FIXED snake_case to camelCase mapping
    const userProfile: UserProfile = {
      id: data.id,
      email: '', // Will be populated by the auth provider
      role: data.role as "admin" | "player", // Explicitly cast to UserRole type
      firstName: data.first_name, // Correctly map from snake_case database column
      lastName: data.last_name,   // Correctly map from snake_case database column
      createdAt: data.created_at
    };
    
    console.log(`Profile loaded successfully for ${userId}, role: ${userProfile.role}`);
    return userProfile;
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return null;
  }
};

/**
 * Signs in a user with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    console.log(`Attempting sign in for: ${email}`);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error("Sign in error:", error.message);
      toast.error(error.message);
      return { error };
    }
    
    console.log("Sign in successful");
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected sign in error:", error);
    toast.error("An unexpected error occurred");
    return { data: null, error };
  }
};

/**
 * Signs up a new user with email and password
 */
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) {
      toast.error(error.message);
    } else {
      toast("Account created", {
        description: "Please check your email to confirm your account"
      });
    }
    
    return { data, error };
  } catch (error) {
    toast.error("An unexpected error occurred");
    return { data: null, error };
  }
};

/**
 * Signs out the current user
 */
export const signOutUser = async () => {
  try {
    await supabase.auth.signOut();
    toast("Signed out", {
      description: "You have been successfully signed out"
    });
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error("An unexpected error occurred");
  }
};

/**
 * Sends a password reset email
 */
export const resetUserPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      toast.error(error.message);
    } else {
      toast("Password reset email sent", {
        description: "Please check your email for a link to reset your password"
      });
    }
    
    return { error };
  } catch (error) {
    toast.error("An unexpected error occurred");
    return { error };
  }
};
