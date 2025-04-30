
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useWaitlistApproval } from "./useWaitlistApproval";

/**
 * Hook for handling waitlist entry status updates
 */
export const useWaitlistStatusUpdate = (
  updateLocalWaitlistEntry: (id: string, status: 'approved' | 'rejected', notes?: string) => void
) => {
  const { profile, user } = useAuth();
  const { approveWaitlistEntry } = useWaitlistApproval(updateLocalWaitlistEntry);
  
  /**
   * Update waitlist entry status
   */
  const updateWaitlistStatus = async (id: string, status: 'approved' | 'rejected', notes?: string) => {
    try {
      console.log(`Updating waitlist entry ${id} to status: ${status}. User: ${user?.email}`);
      
      if (profile?.role !== 'admin') {
        console.error("Only admins can update waitlist entries");
        toast.error("You don't have permission to update waitlist entries");
        return false;
      }
      
      // If approving, we'll use the edge function to create a user account
      if (status === 'approved') {
        return await approveWaitlistEntry(id, notes);
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
        console.error("Error in updateWaitlistStatus:", error);
        throw error;
      }
      
      console.log(`Successfully updated waitlist entry ${id} to status: ${status}`);
      
      // Update local state
      updateLocalWaitlistEntry(id, status, notes);
      
      toast.success(`Waitlist entry ${status}`);
      return true;
    } catch (error) {
      console.error("Error updating waitlist status:", error);
      toast.error("Failed to update waitlist status");
      return false;
    }
  };
  
  return { updateWaitlistStatus };
};
