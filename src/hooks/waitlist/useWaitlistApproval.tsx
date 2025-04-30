
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

/**
 * Hook for handling waitlist entry approval functionality
 */
export const useWaitlistApproval = (updateLocalWaitlistEntry: (id: string, status: 'approved' | 'rejected', notes?: string) => void) => {
  const { user, profile } = useAuth();

  /**
   * Send notification email to user and admin after status update
   */
  const sendNotificationEmail = async (
    type: "waitlistApproval" | "waitlistRejection",
    recipientEmail: string, 
    recipientName: string,
    adminEmails: string[] = ["admin@flomanji.com"]
  ) => {
    try {
      // Get the user's auth token for the edge function call
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("No valid session found");
      }

      // Call the edge function to send email notification
      const response = await supabase.functions.invoke("send-notification", {
        body: {
          type,
          recipientEmail,
          recipientName,
          adminEmails,
          userDetails: { firstName: recipientName, email: recipientEmail }
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        console.error("Email notification error:", response.error);
        // Don't block the approval process if email fails
        toast.error("Email notification could not be sent, but the status was updated successfully.");
      } else {
        console.log("Email notification sent successfully");
      }
    } catch (error) {
      console.error("Failed to send email notification:", error);
      // Don't block the approval process if email fails
    }
  };

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
      
      // Get the waitlist entry details for the email notification
      const { data: waitlistEntry, error: fetchError } = await supabase
        .from('waitlist_entries')
        .select('*')
        .eq('id', waitlistId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching waitlist entry:", fetchError);
        throw new Error("Could not fetch waitlist entry details");
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
      
      // Send approval email notification
      await sendNotificationEmail(
        "waitlistApproval",
        waitlistEntry.email,
        waitlistEntry.first_name,
      );
      
      toast.success("Waitlist entry approved and user account created");
      return true;
    } catch (error) {
      console.error("Error approving waitlist entry:", error);
      toast.error(error instanceof Error ? error.message : "Failed to approve waitlist entry");
      return false;
    }
  };

  /**
   * Reject waitlist entry and send notification email
   */
  const rejectWaitlistEntry = async (waitlistId: string, notes?: string) => {
    try {
      if (!user) {
        throw new Error("You must be logged in to reject waitlist entries");
      }

      if (profile?.role !== 'admin') {
        toast.error("Only admins can reject waitlist entries");
        return false;
      }
      
      // Get the waitlist entry details for the email notification
      const { data: waitlistEntry, error: fetchError } = await supabase
        .from('waitlist_entries')
        .select('*')
        .eq('id', waitlistId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching waitlist entry:", fetchError);
        throw new Error("Could not fetch waitlist entry details");
      }

      // Update the status to rejected
      const { error } = await supabase
        .from('waitlist_entries')
        .update({ 
          status: "rejected", 
          notes: notes || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', waitlistId);
        
      if (error) {
        console.error("Error rejecting waitlist entry:", error);
        throw new Error("Could not update waitlist entry status");
      }
      
      // Update local state
      updateLocalWaitlistEntry(waitlistId, 'rejected', notes);
      
      // Send rejection email notification
      await sendNotificationEmail(
        "waitlistRejection",
        waitlistEntry.email,
        waitlistEntry.first_name,
      );
      
      toast.success("Waitlist entry rejected");
      return true;
    } catch (error) {
      console.error("Error rejecting waitlist entry:", error);
      toast.error(error instanceof Error ? error.message : "Failed to reject waitlist entry");
      return false;
    }
  };

  return { approveWaitlistEntry, rejectWaitlistEntry };
};
