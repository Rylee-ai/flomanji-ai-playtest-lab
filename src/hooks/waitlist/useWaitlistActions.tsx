
import { useState } from "react";
import { WaitlistEntry } from "@/types/user";
import { useWaitlistStatusUpdate } from "./useWaitlistStatusUpdate";
import { useWaitlistData } from "./useWaitlistData";

/**
 * Hook for handling waitlist entry action operations (approve, reject, notes)
 */
export const useWaitlistActions = () => {
  const { updateLocalWaitlistEntry } = useWaitlistData();
  const { updateWaitlistStatus } = useWaitlistStatusUpdate(updateLocalWaitlistEntry);
  
  // State for selected entry and dialogs
  const [actionEntry, setActionEntry] = useState<WaitlistEntry | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  
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
  
  return {
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
  };
};
