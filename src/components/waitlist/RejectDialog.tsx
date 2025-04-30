
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

interface RejectDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  entry: WaitlistEntry | null;
  notes: string;
  setNotes: (notes: string) => void;
  onConfirm: () => void;
}

/**
 * Dialog for rejecting waitlist entries
 */
export const RejectDialog = ({
  isOpen,
  setIsOpen,
  entry,
  notes,
  setNotes,
  onConfirm
}: RejectDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject Waitlist Entry</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reject {entry?.firstName} {entry?.lastName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-2">
          <Label htmlFor="rejectNotes">Admin Notes (Optional)</Label>
          <Textarea
            id="rejectNotes"
            placeholder="Add reason for rejection"
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
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Reject
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
