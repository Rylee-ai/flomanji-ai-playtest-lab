
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WaitlistEntry } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";

/**
 * Hook for loading and managing waitlist entries data
 */
export const useWaitlistData = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { profile } = useAuth();
  
  /**
   * Load waitlist entries from Supabase
   */
  const loadWaitlistEntries = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      
      if (profile?.role !== 'admin') {
        console.error("Only admins can access waitlist data");
        return;
      }
      
      const { data, error } = await supabase
        .from('waitlist_entries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Transform database field names to match our TypeScript types
      const transformedData = data.map(entry => ({
        id: entry.id,
        email: entry.email,
        firstName: entry.first_name,
        lastName: entry.last_name,
        status: entry.status as 'pending' | 'approved' | 'rejected',
        notes: entry.notes,
        createdAt: entry.created_at,
        updatedAt: entry.updated_at
      }));
      
      setWaitlistEntries(transformedData);
    } catch (error) {
      console.error("Error loading waitlist entries:", error);
      toast.error("Failed to load waitlist entries");
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load entries on component mount and when profile changes
  useEffect(() => {
    if (profile?.role === 'admin') {
      loadWaitlistEntries();
    }
  }, [profile?.role]);
  
  /**
   * Update the local waitlist entries state with a new entry
   */
  const updateLocalWaitlistEntry = (
    id: string,
    status: 'pending' | 'approved' | 'rejected',
    notes?: string
  ) => {
    setWaitlistEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { 
          ...entry, 
          status, 
          notes: notes || entry.notes,
          updatedAt: new Date().toISOString() 
        } : entry
      )
    );
  };
  
  return {
    waitlistEntries,
    isLoading,
    hasError,
    loadWaitlistEntries,
    updateLocalWaitlistEntry,
    setWaitlistEntries
  };
};
