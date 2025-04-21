
/**
 * Shared auth-related types for clarity and consistency.
 */

// UserRole as used throughout the app:
export type UserRole = 'admin' | 'player' | 'moderator' | 'guest';

// UserProfile shape simplified for type safety:
export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: string;
}

