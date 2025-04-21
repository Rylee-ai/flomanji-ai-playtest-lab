
import { useState } from "react";
import { UserProfile, UserRole } from "@/types";

export function useUserProfile(user: { id: string, email?: string } | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Function to fetch user profile data (mocked; replace with Supabase query when real data is available)
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      let role: UserRole = 'player';
      const userEmail = user?.email?.toLowerCase();
      if (userEmail === 'contact@athipp.com') {
        role = 'admin';
      }
      const mockProfile: UserProfile = {
        id: userId,
        email: user?.email || '',
        role: role,
        firstName: role === "admin" ? "Admin" : "Player",
        lastName: "User",
        createdAt: new Date().toISOString()
      };
      setProfile(mockProfile);
      return mockProfile;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  return { profile, setProfile, fetchUserProfile };
}
