
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useWaitlistManager } from "@/hooks/waitlist/useWaitlistManager";
import { WaitlistEntry } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// Import refactored components
import { WaitlistFilters } from "@/components/waitlist/WaitlistFilters";
import { WaitlistTable } from "@/components/waitlist/WaitlistTable";
import { ApproveDialog } from "@/components/waitlist/ApproveDialog";
import { RejectDialog } from "@/components/waitlist/RejectDialog";
import { NotesDialog } from "@/components/waitlist/NotesDialog";
import { NoWaitlistEntries } from "@/components/waitlist/NoWaitlistEntries";
import { AccessDenied } from "@/components/waitlist/AccessDenied";

/**
 * WaitlistManager allows admins to review, approve, and reject waitlist applications
 */
const WaitlistManager = () => {
  // Hook for waitlist management operations
  const { waitlistEntries, isLoading, updateWaitlistStatus, loadWaitlistEntries } = useWaitlistManager();
  
  // State for selected entry and dialogs
  const [actionEntry, setActionEntry] = useState<WaitlistEntry | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  
  // State for filtering and error handling
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [hasError, setHasError] = useState(false);
  
  // User authentication context
  const { profile } = useAuth();
  
  // Load waitlist entries when the component mounts
  useEffect(() => {
    if (profile?.role === 'admin') {
      handleRefresh();
    }
  }, [profile?.role]);
  
  /**
   * Refreshes the waitlist entries data
   */
  const handleRefresh = async () => {
    try {
      setHasError(false);
      await loadWaitlistEntries();
    } catch (error) {
      console.error("Failed to load waitlist entries:", error);
      setHasError(true);
      toast.error("Failed to load waitlist entries. Please try again.");
    }
  };
  
  /**
   * Opens the approval dialog for a waitlist entry
   */
  const handleApprove = (entry: WaitlistEntry) => {
    setActionEntry(entry);
    setNotes(entry.notes || "");
    setIsApproving(true);
  };
  
  /**
   * Opens the rejection dialog for a waitlist entry
   */
  const handleReject = (entry: WaitlistEntry) => {
    setActionEntry(entry);
    setNotes(entry.notes || "");
    setIsRejecting(true);
  };

  /**
   * Opens the notes dialog for a waitlist entry
   */
  const handleShowNotes = (entry: WaitlistEntry) => {
    setActionEntry(entry);
    setNotes(entry.notes || "");
    setShowNotes(true);
  };
  
  /**
   * Confirms approval of a waitlist entry
   */
  const confirmApprove = async () => {
    if (actionEntry) {
      await updateWaitlistStatus(actionEntry.id, "approved", notes);
      setIsApproving(false);
      setActionEntry(null);
      setNotes("");
    }
  };
  
  /**
   * Confirms rejection of a waitlist entry
   */
  const confirmReject = async () => {
    if (actionEntry) {
      await updateWaitlistStatus(actionEntry.id, "rejected", notes);
      setIsRejecting(false);
      setActionEntry(null);
      setNotes("");
    }
  };

  /**
   * Saves notes for a waitlist entry
   */
  const saveNotes = async () => {
    if (actionEntry) {
      await updateWaitlistStatus(actionEntry.id, actionEntry.status as any, notes);
      setShowNotes(false);
      setActionEntry(null);
    }
  };
  
  /**
   * Filters waitlist entries based on search query and status filter
   */
  const filteredEntries = waitlistEntries.filter(entry => {
    const matchesSearch = 
      entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Check for admin access
  if (profile?.role !== 'admin') {
    return <AccessDenied />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Waitlist Manager</h1>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Entries</CardTitle>
          <CardDescription>
            Review and manage users who have signed up for the Flomanji Playtest
          </CardDescription>
          <WaitlistFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </CardHeader>
        <CardContent>
          {filteredEntries.length === 0 ? (
            <NoWaitlistEntries 
              isLoading={isLoading}
              hasError={hasError}
              hasSearchFilter={searchQuery !== "" || statusFilter !== "all"}
              onRefresh={handleRefresh}
            />
          ) : (
            <WaitlistTable
              entries={filteredEntries}
              onApprove={handleApprove}
              onReject={handleReject}
              onShowNotes={handleShowNotes}
            />
          )}
        </CardContent>
      </Card>
      
      <ApproveDialog
        isOpen={isApproving}
        setIsOpen={setIsApproving}
        entry={actionEntry}
        notes={notes}
        setNotes={setNotes}
        onConfirm={confirmApprove}
      />

      <RejectDialog
        isOpen={isRejecting}
        setIsOpen={setIsRejecting}
        entry={actionEntry}
        notes={notes}
        setNotes={setNotes}
        onConfirm={confirmReject}
      />
      
      <NotesDialog
        isOpen={showNotes}
        setIsOpen={setShowNotes}
        entry={actionEntry}
        notes={notes}
        setNotes={setNotes}
        onSave={saveNotes}
      />
    </div>
  );
};

export default WaitlistManager;
