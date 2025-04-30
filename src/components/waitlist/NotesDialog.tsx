
import { WaitlistEntry } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NotesDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  entry: WaitlistEntry | null;
  notes: string;
  setNotes: (notes: string) => void;
  onSave: () => void;
}

/**
 * Dialog for viewing and editing waitlist entry notes
 */
export const NotesDialog = ({
  isOpen,
  setIsOpen,
  entry,
  notes,
  setNotes,
  onSave
}: NotesDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin Notes</DialogTitle>
          <DialogDescription>
            Notes for {entry?.firstName} {entry?.lastName}
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <Textarea
            placeholder="Add notes about this applicant"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            className="mt-2"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Notes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
