
import { UserProfile } from "@/types";

/**
 * Helper utility to check if a user has admin role
 */
export const isAdminUser = (profile: UserProfile | null): boolean => {
  if (!profile) return false;
  return profile.role === 'admin';
};

/**
 * Helper utility to check if a user has player role
 */
export const isPlayerUser = (profile: UserProfile | null): boolean => {
  if (!profile) return false;
  return profile.role === 'player';
};

/**
 * Helper utility to check if a profile is fully loaded
 */
export const isProfileLoaded = (profile: UserProfile | null): boolean => {
  return profile !== null && !!profile.id;
};

/**
 * Helper utility to get display name for a user
 */
export const getUserDisplayName = (profile: UserProfile | null): string => {
  if (!profile) return 'User';
  
  if (profile.firstName && profile.lastName) {
    return `${profile.firstName} ${profile.lastName}`;
  } else if (profile.firstName) {
    return profile.firstName;
  } else if (profile.email) {
    // Return email up to @ sign
    return profile.email.split('@')[0];
  } else {
    return 'User';
  }
};

/**
 * Get role display name
 */
export const getRoleDisplayName = (profile: UserProfile | null): string => {
  if (!profile) return 'Guest';
  
  switch (profile.role) {
    case 'admin':
      return 'Administrator';
    case 'player':
      return 'Player';
    default:
      return profile.role;
  }
};
