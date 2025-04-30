
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoWaitlistEntriesProps {
  isLoading: boolean;
  hasError: boolean;
  hasSearchFilter: boolean;
  onRefresh: () => void;
}

/**
 * Displays appropriate messages when there are no waitlist entries to show
 */
export const NoWaitlistEntries = ({ 
  isLoading, 
  hasError, 
  hasSearchFilter,
  onRefresh 
}: NoWaitlistEntriesProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p>Loading waitlist entries...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">Failed to load waitlist entries.</p>
        <Button onClick={onRefresh} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <p className="text-center text-muted-foreground py-8">
      {hasSearchFilter 
        ? "No waitlist entries match your filter criteria." 
        : "No waitlist entries yet."}
    </p>
  );
};
