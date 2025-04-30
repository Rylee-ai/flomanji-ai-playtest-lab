
import { Session, User } from "@supabase/supabase-js";
import { UserProfile } from "@/types";

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string) => Promise<{ error: any | null, data: any | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
  refreshProfile: () => Promise<boolean>;
  debugMode?: boolean;
  toggleDebugMode?: () => void;
}
