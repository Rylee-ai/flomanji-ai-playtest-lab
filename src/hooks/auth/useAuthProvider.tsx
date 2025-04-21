
import React, { useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { AuthContext } from "./AuthContext";
import { useUserProfile } from "./useUserProfile";
import { UserProfile } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extract profile management to custom hook
  const { profile, setProfile, fetchUserProfile } = useUserProfile(user);

  // Refresh user profile
  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /*** Auth Methods ***/
  const signIn = async (email: string, password: string) => {
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

  const signUp = async (email: string, password: string) => {
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

  const signOut = async () => {
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

  const resetPassword = async (email: string) => {
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

  const value = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
