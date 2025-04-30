
import React, { useEffect, useState } from "react";
import { useWaitlistData } from "@/hooks/waitlist/useWaitlistData";
import { useWaitlistActions } from "@/hooks/waitlist/useWaitlistActions";
import { useWaitlistFilters } from "@/hooks/waitlist/useWaitlistFilters";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { isAdminUser } from "@/utils/auth-helpers";

// Import refactored components
import { WaitlistHeader } from "@/components/waitlist/WaitlistHeader";
import { WaitlistContent } from "@/components/waitlist/WaitlistContent";
import { WaitlistDialogs } from "@/components/waitlist/WaitlistDialogs";
import { AccessDenied } from "@/components/waitlist/AccessDenied";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * WaitlistManager allows admins to review, approve, and reject waitlist applications
 */
const WaitlistManager = () => {
  // User authentication context
  const { profile, user, isLoading: authLoading } = useAuth();
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
  
  // Check authentication status
  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-lg text-muted-foreground">Verifying access...</p>
      </div>
    );
  }
  
  // Check for admin access
  if (!user) {
    return <AccessDenied message="Please sign in to access this page." />;
  }
  
  if (!isAdminUser(profile)) {
    console.log("User does not have admin access. Profile:", profile);
    
    // If profile is still loading (null), show a waiting message
    if (!profile) {
      return (
        <div className="space-y-6">
          <Alert variant="default">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              Loading your profile information...
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              size="sm"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }
    
    return <AccessDenied message="You must be an administrator to access this page." />;
  }
  
  // Show error state with retry option
  if (hasError && waitlistEntries.length === 0) {
    return (
      <div className="space-y-6">
        <WaitlistHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />
        
        <div className="p-12 border rounded-lg bg-card flex flex-col items-center justify-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load waitlist entries</h3>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            There was a problem retrieving the waitlist data. This could be due to
            a permissions issue or a network problem.
          </p>
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            size="lg"
          >
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Retrying...
              </>
            ) : (
              "Try Again"
            )}
          </Button>
        </div>
      </div>
    );
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
