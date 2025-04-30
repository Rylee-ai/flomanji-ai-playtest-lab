
import { Button } from "@/components/ui/button";
import { MessageSquare, Check, X } from "lucide-react";
import { WaitlistEntry } from "@/types/user";

interface WaitlistActionsProps {
  entry: WaitlistEntry;
  onApprove: (entry: WaitlistEntry) => void;
  onReject: (entry: WaitlistEntry) => void;
  onShowNotes: (entry: WaitlistEntry) => void;
}

/**
 * Renders action buttons for waitlist entries
 */
export const WaitlistActions = ({
  entry,
  onApprove,
  onReject,
  onShowNotes
}: WaitlistActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      {entry.status === 'pending' && (
        <>
          <Button 
            size="sm" 
            variant="success" 
            className="h-8 w-8 p-0" 
            onClick={() => onApprove(entry)}
          >
            <span className="sr-only">Approve</span>
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="destructive" 
            className="h-8 w-8 p-0" 
            onClick={() => onReject(entry)}
          >
            <span className="sr-only">Reject</span>
            <X className="h-4 w-4" />
          </Button>
        </>
      )}
      <Button 
        size="sm" 
        variant="outline" 
        className="h-8 w-8 p-0"
        onClick={() => onShowNotes(entry)}
      >
        <span className="sr-only">Notes</span>
        <MessageSquare className="h-4 w-4" />
      </Button>
    </div>
  );
};
