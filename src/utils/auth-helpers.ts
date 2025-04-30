
import { UserProfile } from "@/types";

/**
 * Helper utility to check if a user has admin role
 */
export const isAdminUser = (profile: UserProfile | null): boolean => {
  if (!profile) return false;
  return profile.role === 'admin';
};

/**
 * Helper utility to check if a profile is fully loaded
 */
export const isProfileLoaded = (profile: UserProfile | null): boolean => {
  return profile !== null && !!profile.id;
};
