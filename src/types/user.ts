
export type UserRole = 'admin' | 'player' | 'moderator' | 'guest';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: string;
}
