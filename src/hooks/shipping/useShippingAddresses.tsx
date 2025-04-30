
import { useState } from 'react';

/**
 * Hook for handling shipping address viewing and management
 */
export const useShippingAddresses = () => {
  const [isViewingAddress, setIsViewingAddress] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  
  /**
   * Open the address viewing dialog for a specific entry
   */
  const handleViewAddress = (entry: any) => {
    setSelectedEntry(entry);
    setIsViewingAddress(true);
  };
  
  /**
   * Check if an entry has a valid address
   */
  const hasAddress = (entry: any) => !!entry.address;

  return {
    isViewingAddress,
    setIsViewingAddress,
    selectedEntry,
    setSelectedEntry,
    handleViewAddress,
    hasAddress
  };
};
