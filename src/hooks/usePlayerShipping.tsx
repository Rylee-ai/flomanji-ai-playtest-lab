
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ShippingAddress {
  id: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface ShippingDetails {
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  updated_at: string;
  tracking_number?: string;
  tracking_url?: string;
}

export const usePlayerShipping = () => {
  const { user } = useAuth();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchShippingData = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Fetch address
      const { data: addressData, error: addressError } = await supabase
        .from('mailing_addresses')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (addressError) throw addressError;
      
      if (addressData) {
        setShippingAddress(addressData as ShippingAddress);
      }
      
      // Fetch shipping details from player_details
      const { data: shippingData, error: shippingError } = await supabase
        .from('player_details')
        .select('shipping_status, tracking_number, tracking_url, updated_at')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (shippingError) throw shippingError;
      
      if (shippingData) {
        setShippingDetails({
          status: shippingData.shipping_status as any,
          updated_at: shippingData.updated_at,
          tracking_number: shippingData.tracking_number,
          tracking_url: shippingData.tracking_url
        });
      }
      
    } catch (error) {
      console.error("Error fetching shipping data:", error);
      toast.error("Failed to load shipping information");
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveAddress = async (address: Omit<ShippingAddress, 'id'>) => {
    if (!user) return false;
    
    try {
      const { data: existingAddress } = await supabase
        .from('mailing_addresses')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      let result;
      
      if (existingAddress) {
        // Update existing address
        result = await supabase
          .from('mailing_addresses')
          .update(address)
          .eq('id', existingAddress.id);
      } else {
        // Insert new address
        result = await supabase
          .from('mailing_addresses')
          .insert([{ ...address, user_id: user.id }]);
      }
      
      if (result.error) throw result.error;
      
      // Refresh data
      await fetchShippingData();
      
      toast.success("Shipping address saved successfully");
      return true;
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save shipping address");
      return false;
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchShippingData();
    }
  }, [user]);
  
  return {
    shippingAddress,
    shippingDetails,
    isLoading,
    saveAddress,
    fetchShippingData
  };
};
