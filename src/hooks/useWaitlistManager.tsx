
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WaitlistEntry } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";

export const useWaitlistManager = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile, user } = useAuth();
  
  // Load waitlist entries from Supabase
  const loadWaitlistEntries = async () => {
    try {
      setIsLoading(true);
      
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
      
      setWaitlistEntries(data as WaitlistEntry[]);
    } catch (error) {
      console.error("Error loading waitlist entries:", error);
      toast.error("Failed to load waitlist entries");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update waitlist entry status
  const updateWaitlistStatus = async (id: string, status: 'approved' | 'rejected', notes?: string) => {
    try {
      if (profile?.role !== 'admin') {
        toast.error("Only admins can update waitlist entries");
        return false;
      }
      
      // If approving, we'll use the edge function to create a user account
      if (status === 'approved') {
        await approveWaitlistEntry(id, notes);
        return true;
      }
      
      // For rejection, just update the status
      const { error } = await supabase
        .from('waitlist_entries')
        .update({ 
          status, 
          notes: notes || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setWaitlistEntries(prev => 
        prev.map(entry => 
          entry.id === id ? { ...entry, status, notes, updated_at: new Date().toISOString() } : entry
        )
      );
      
      toast.success(`Waitlist entry ${status}`);
      return true;
    } catch (error) {
      console.error("Error updating waitlist status:", error);
      toast.error("Failed to update waitlist status");
      return false;
    }
  };

  // Create user account for approved waitlist entry using edge function
  const approveWaitlistEntry = async (waitlistId: string, notes?: string) => {
    try {
      if (!user) {
        throw new Error("You must be logged in to approve waitlist entries");
      }
      
      // Update notes first if provided
      if (notes) {
        await supabase
          .from('waitlist_entries')
          .update({ notes })
          .eq('id', waitlistId);
      }
      
      // Get the user's auth token for the edge function call
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("No valid session found");
      }
      
      // Call the edge function to create a user account for the waitlist entry
      const response = await supabase.functions.invoke("process-waitlist-approval", {
        body: { waitlistId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (response.error) {
        throw new Error(response.error.message || "Error approving waitlist entry");
      }
      
      // Update local state
      setWaitlistEntries(prev => 
        prev.map(entry => 
          entry.id === waitlistId ? { 
            ...entry, 
            status: 'approved', 
            notes: notes || entry.notes,
            updated_at: new Date().toISOString() 
          } : entry
        )
      );
      
      toast.success("Waitlist entry approved and user account created");
      return true;
    } catch (error) {
      console.error("Error approving waitlist entry:", error);
      toast.error(error.message || "Failed to approve waitlist entry");
      return false;
    }
  };
  
  // Load entries on component mount
  useEffect(() => {
    if (profile?.role === 'admin') {
      loadWaitlistEntries();
    }
  }, [profile?.role]);
  
  return {
    waitlistEntries,
    isLoading,
    loadWaitlistEntries,
    updateWaitlistStatus
  };
};
