
import { useState } from "react";
import { WaitlistEntry } from "@/types/user";

/**
 * Hook for filtering and searching waitlist entries
 */
export const useWaitlistFilters = (entries: WaitlistEntry[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  
  /**
   * Returns waitlist entries filtered based on search query and status filter
   */
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredEntries
  };
};
