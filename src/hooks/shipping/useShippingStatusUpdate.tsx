
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

/**
 * Hook for handling shipping status updates
 */
export const useShippingStatusUpdate = (
  updateLocalShippingEntry: (
    id: string, 
    status: 'pending' | 'processing' | 'shipped' | 'delivered',
    trackingNumber?: string,
    trackingUrl?: string
  ) => void
) => {
  const { profile } = useAuth();

  /**
   * Update shipping status in the database
   */
  const updateShippingStatus = async (
    id: string, 
    status: 'pending' | 'processing' | 'shipped' | 'delivered',
    trackingNumber?: string,
    trackingUrl?: string
  ) => {
    if (profile?.role !== 'admin') {
      toast.error("Only admins can update shipping status");
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('player_details')
        .update({ 
          shipping_status: status,
          tracking_number: trackingNumber,
          tracking_url: trackingUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      updateLocalShippingEntry(id, status, trackingNumber, trackingUrl);
      
      toast.success(`Shipping status updated to ${status}`);
      return true;
    } catch (error) {
      console.error("Error updating shipping status:", error);
      toast.error("Failed to update shipping status");
      return false;
    }
  };

  return {
    updateShippingStatus
  };
};
