
import { useWaitlistData } from "./useWaitlistData";
import { useWaitlistStatusUpdate } from "./useWaitlistStatusUpdate";

/**
 * Main hook that combines waitlist data and status management functionality
 */
export const useWaitlistManager = () => {
  const { 
    waitlistEntries, 
    isLoading,
    hasError, 
    loadWaitlistEntries, 
    updateLocalWaitlistEntry 
  } = useWaitlistData();
  
  const { updateWaitlistStatus } = useWaitlistStatusUpdate(updateLocalWaitlistEntry);
  
  return {
    waitlistEntries,
    isLoading,
    hasError,
    loadWaitlistEntries,
    updateWaitlistStatus
  };
};
