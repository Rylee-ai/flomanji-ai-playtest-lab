
import { useState } from 'react';
import { useShippingData } from "./useShippingData";
import { useShippingStatusUpdate } from "./useShippingStatusUpdate";
import { useShippingAddresses } from "./useShippingAddresses";

/**
 * Main hook that combines shipping data and status management functionality
 */
export const useShippingManager = () => {
  // Fetch shipping data
  const { 
    entries, 
    isLoading, 
    loadShippingEntries,
    updateLocalShippingEntry 
  } = useShippingData();
  
  // Status management
  const { updateShippingStatus } = useShippingStatusUpdate(updateLocalShippingEntry);
  
  // Address management
  const addressManagement = useShippingAddresses();
  
  // Status update dialog state
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [status, setStatus] = useState<"pending" | "processing" | "shipped" | "delivered">("pending");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  
  /**
   * Open status update dialog
   */
  const handleUpdateStatus = (entry: any) => {
    addressManagement.setSelectedEntry(entry);
    setStatus(entry.status);
    setTrackingNumber(entry.trackingNumber || "");
    setTrackingUrl(entry.trackingUrl || "");
    setIsUpdatingStatus(true);
  };
  
  /**
   * Save shipping status changes
   */
  const saveShippingStatus = async () => {
    if (addressManagement.selectedEntry) {
      const success = await updateShippingStatus(
        addressManagement.selectedEntry.id,
        status,
        trackingNumber || undefined,
        trackingUrl || undefined
      );
      
      if (success) {
        setIsUpdatingStatus(false);
      }
    }
  };

  return {
    entries,
    isLoading,
    loadShippingEntries,
    updateShippingStatus,
    
    // From addressManagement
    isViewingAddress: addressManagement.isViewingAddress,
    setIsViewingAddress: addressManagement.setIsViewingAddress,
    selectedEntry: addressManagement.selectedEntry,
    setSelectedEntry: addressManagement.setSelectedEntry,
    handleViewAddress: addressManagement.handleViewAddress,
    hasAddress: addressManagement.hasAddress,
    
    // Status update dialog
    isUpdatingStatus,
    setIsUpdatingStatus,
    status,
    setStatus,
    trackingNumber,
    setTrackingNumber,
    trackingUrl,
    setTrackingUrl,
    handleUpdateStatus,
    saveShippingStatus
  };
};
