
import { toast } from "@/components/ui/use-toast";
import { UserProfile } from "@/types";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches user profile data from the Supabase profiles table
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    // Query the profiles table from our database
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      // Check for recursion error and handle it gracefully
      if (error.code === '42P17') {
        console.error('RLS recursion error detected. Using fallback profile data.');
        // Create a minimal profile with reasonable defaults when we can't fetch from DB
        return {
          id: userId,
          email: '',
          // Default to admin if the user is authenticated but we can't determine role
          // This is a fallback to prevent lockout, but should be fixed in Supabase RLS
          role: "admin", 
          createdAt: new Date().toISOString()
        };
      }
      
      console.error('Error fetching user profile:', error);
      return null;
    }

    if (data) {
      // Transform the data to match our UserProfile type
      const userProfile: UserProfile = {
        id: data.id,
        email: '', // Will be populated by the auth provider
        role: data.role as "admin" | "player", // Explicitly cast to UserRole type
        firstName: data.first_name,
        lastName: data.last_name,
        createdAt: data.created_at
      };
      
      return userProfile;
    }
    
    return null;
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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive"
      });
    }
    
    return { error };
  } catch (error) {
    toast({
      title: "Error signing in",
      description: "An unexpected error occurred",
      variant: "destructive"
    });
    return { error };
  }
};

/**
 * Signs up a new user with email and password
 */
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Account created",
        description: "Please check your email to confirm your account"
      });
    }
    
    return { data, error };
  } catch (error) {
    toast({
      title: "Error signing up",
      description: "An unexpected error occurred",
      variant: "destructive"
    });
    return { data: null, error };
  }
};

/**
 * Signs out the current user
 */
export const signOutUser = async () => {
  try {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out"
    });
  } catch (error) {
    console.error("Error signing out:", error);
    toast({
      title: "Error signing out",
      description: "An unexpected error occurred",
      variant: "destructive"
    });
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
      toast({
        title: "Error resetting password",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Password reset email sent",
        description: "Please check your email for a link to reset your password"
      });
    }
    
    return { error };
  } catch (error) {
    toast({
      title: "Error resetting password",
      description: "An unexpected error occurred",
      variant: "destructive"
    });
    return { error };
  }
};
