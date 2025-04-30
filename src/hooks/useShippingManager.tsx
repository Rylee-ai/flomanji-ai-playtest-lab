
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface ShippingManagerEntry {
  id: string;
  userId: string;
  waitlistId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  trackingUrl?: string;
  createdAt: string;
  updatedAt: string;
  address?: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export const useShippingManager = () => {
  const [entries, setEntries] = useState<ShippingManagerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useAuth();

  const loadShippingEntries = async () => {
    if (profile?.role !== 'admin') {
      console.error("Only admins can access shipping data");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // This query joins player_details with waitlist_entries to get all approved users
      const { data, error } = await supabase
        .from('player_details')
        .select(`
          id,
          user_id,
          waitlist_id,
          shipping_status,
          tracking_number,
          tracking_url,
          created_at,
          updated_at,
          waitlist_entries!inner(first_name, last_name, email)
        `)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      // Also fetch mailing addresses for these users
      const addressPromises = data.map(async (entry) => {
        const { data: addressData } = await supabase
          .from('mailing_addresses')
          .select('*')
          .eq('user_id', entry.user_id)
          .maybeSingle();
        
        return {
          id: entry.id,
          userId: entry.user_id,
          waitlistId: entry.waitlist_id,
          firstName: entry.waitlist_entries.first_name,
          lastName: entry.waitlist_entries.last_name,
          email: entry.waitlist_entries.email,
          status: entry.shipping_status,
          trackingNumber: entry.tracking_number,
          trackingUrl: entry.tracking_url,
          createdAt: entry.created_at,
          updatedAt: entry.updated_at,
          address: addressData ? {
            street: addressData.street,
            apartment: addressData.apartment,
            city: addressData.city,
            state: addressData.state,
            postalCode: addressData.postal_code,
            country: addressData.country,
          } : undefined
        };
      });
      
      const entriesWithAddresses = await Promise.all(addressPromises);
      setEntries(entriesWithAddresses);
    } catch (error) {
      console.error("Error loading shipping entries:", error);
      toast.error("Failed to load shipping data");
    } finally {
      setIsLoading(false);
    }
  };

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
      setEntries(prev => 
        prev.map(entry => 
          entry.id === id ? { 
            ...entry, 
            status, 
            trackingNumber, 
            trackingUrl, 
            updatedAt: new Date().toISOString() 
          } : entry
        )
      );
      
      toast.success(`Shipping status updated to ${status}`);
      return true;
    } catch (error) {
      console.error("Error updating shipping status:", error);
      toast.error("Failed to update shipping status");
      return false;
    }
  };

  // Load entries on component mount
  useEffect(() => {
    if (profile?.role === 'admin') {
      loadShippingEntries();
    }
  }, [profile?.role]);
  
  return {
    entries,
    isLoading,
    loadShippingEntries,
    updateShippingStatus
  };
};
