
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WaitlistFilters } from "@/components/waitlist/WaitlistFilters";
import { WaitlistTable } from "@/components/waitlist/WaitlistTable";
import { NoWaitlistEntries } from "@/components/waitlist/NoWaitlistEntries";
import { WaitlistEntry } from "@/types/user";

interface WaitlistContentProps {
  filteredEntries: WaitlistEntry[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: "all" | "pending" | "approved" | "rejected";
  setStatusFilter: (status: any) => void;
  isLoading: boolean;
  hasError: boolean;
  onRefresh: () => void;
  onApprove: (entry: WaitlistEntry) => void;
  onReject: (entry: WaitlistEntry) => void;
  onShowNotes: (entry: WaitlistEntry) => void;
}

/**
 * Main content component for the Waitlist Manager
 */
export const WaitlistContent = ({
  filteredEntries,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  isLoading,
  hasError,
  onRefresh,
  onApprove,
  onReject,
  onShowNotes
}: WaitlistContentProps) => {
  const hasSearchFilter = searchQuery !== "" || statusFilter !== "all";
  
  return (
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
            hasSearchFilter={hasSearchFilter}
            onRefresh={onRefresh}
          />
        ) : (
          <WaitlistTable
            entries={filteredEntries}
            onApprove={onApprove}
            onReject={onReject}
            onShowNotes={onShowNotes}
          />
        )}
      </CardContent>
    </Card>
  );
};
