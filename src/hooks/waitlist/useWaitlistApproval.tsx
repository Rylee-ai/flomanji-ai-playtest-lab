
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

/**
 * Hook for handling waitlist entry approval functionality
 */
export const useWaitlistApproval = (updateLocalWaitlistEntry: (id: string, status: 'approved' | 'rejected', notes?: string) => void) => {
  const { user, profile } = useAuth();

  /**
   * Create user account for approved waitlist entry using edge function
   */
  const approveWaitlistEntry = async (waitlistId: string, notes?: string) => {
    try {
      console.log(`Approving waitlist entry ${waitlistId}. User: ${user?.email}`);
      
      if (!user) {
        throw new Error("You must be logged in to approve waitlist entries");
      }

      if (profile?.role !== 'admin') {
        toast.error("Only admins can approve waitlist entries");
        return false;
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
      
      console.log("Calling edge function to process waitlist approval");
      
      // Call the edge function to create a user account for the waitlist entry
      const response = await supabase.functions.invoke("process-waitlist-approval", {
        body: { waitlistId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (response.error) {
        console.error("Edge function error:", response.error);
        throw new Error(response.error.message || "Error approving waitlist entry");
      }
      
      console.log("Successfully approved waitlist entry and created user account");
      
      // Update local state
      updateLocalWaitlistEntry(waitlistId, 'approved', notes);
      
      toast.success("Waitlist entry approved and user account created");
      return true;
    } catch (error) {
      console.error("Error approving waitlist entry:", error);
      toast.error(error instanceof Error ? error.message : "Failed to approve waitlist entry");
      return false;
    }
  };

  return { approveWaitlistEntry };
};
