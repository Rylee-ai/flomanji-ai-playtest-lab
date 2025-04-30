
import React, { useEffect, useState } from "react";
import { useWaitlistData } from "@/hooks/waitlist/useWaitlistData";
import { useWaitlistActions } from "@/hooks/waitlist/useWaitlistActions";
import { useWaitlistFilters } from "@/hooks/waitlist/useWaitlistFilters";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// Import refactored components
import { WaitlistHeader } from "@/components/waitlist/WaitlistHeader";
import { WaitlistContent } from "@/components/waitlist/WaitlistContent";
import { WaitlistDialogs } from "@/components/waitlist/WaitlistDialogs";
import { AccessDenied } from "@/components/waitlist/AccessDenied";

/**
 * WaitlistManager allows admins to review, approve, and reject waitlist applications
 */
const WaitlistManager = () => {
  // User authentication context
  const { profile, user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Hook for waitlist management operations
  const { 
    waitlistEntries, 
    isLoading, 
    hasError, 
    loadWaitlistEntries 
  } = useWaitlistData();
  
  // Action handlers for waitlist entries
  const {
    actionEntry,
    isApproving,
    setIsApproving,
    isRejecting,
    setIsRejecting,
    showNotes,
    setShowNotes,
    notes,
    setNotes,
    handleApprove,
    handleReject,
    handleShowNotes,
    confirmApprove,
    confirmReject,
    saveNotes
  } = useWaitlistActions();
  
  // Filtering and search functionality
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredEntries
  } = useWaitlistFilters(waitlistEntries);
  
  // Load waitlist entries when the component mounts
  useEffect(() => {
    if (profile?.role === 'admin') {
      handleRefresh();
    }
  }, [profile?.role, user?.id]);
  
  /**
   * Refreshes the waitlist entries data
   */
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      console.log("Refreshing waitlist entries. User:", user?.email, "Profile:", profile);
      await loadWaitlistEntries();
      console.log("Waitlist entries refreshed:", waitlistEntries.length);
    } catch (error) {
      console.error("Failed to load waitlist entries:", error);
      toast.error("Failed to load waitlist entries. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Check for admin access
  if (!user) {
    return <AccessDenied message="Please sign in to access this page." />;
  }
  
  if (profile?.role !== 'admin') {
    console.log("User does not have admin access. Profile:", profile);
    return <AccessDenied message="You must be an administrator to access this page." />;
  }
  
  return (
    <div className="space-y-6">
      <WaitlistHeader onRefresh={handleRefresh} isRefreshing={isRefreshing || isLoading} />
      
      <WaitlistContent
        filteredEntries={filteredEntries}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        isLoading={isLoading}
        hasError={hasError}
        onRefresh={handleRefresh}
        onApprove={handleApprove}
        onReject={handleReject}
        onShowNotes={handleShowNotes}
      />
      
      <WaitlistDialogs
        isApproving={isApproving}
        setIsApproving={setIsApproving}
        isRejecting={isRejecting}
        setIsRejecting={setIsRejecting}
        showNotes={showNotes}
        setShowNotes={setShowNotes}
        actionEntry={actionEntry}
        notes={notes}
        setNotes={setNotes}
        onConfirmApprove={confirmApprove}
        onConfirmReject={confirmReject}
        onSaveNotes={saveNotes}
      />
    </div>
  );
};

export default WaitlistManager;
