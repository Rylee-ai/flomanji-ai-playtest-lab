
import { WaitlistEntry } from "@/types/user";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label = ({ htmlFor, children, className = "" }: LabelProps) => (
  <label 
    htmlFor={htmlFor}
    className={`block text-sm font-medium ${className}`}
  >
    {children}
  </label>
);

interface ApproveDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  entry: WaitlistEntry | null;
  notes: string;
  setNotes: (notes: string) => void;
  onConfirm: () => void;
}

/**
 * Dialog for approving waitlist entries
 */
export const ApproveDialog = ({
  isOpen,
  setIsOpen,
  entry,
  notes,
  setNotes,
  onConfirm
}: ApproveDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Waitlist Entry</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to approve {entry?.firstName} {entry?.lastName}? 
            This will create a user account and send them an email invitation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-2">
          <Label htmlFor="notes">Admin Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Add any notes about this approval"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-2"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {
            setIsOpen(false);
          }}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-green-600 hover:bg-green-700 text-white">
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
