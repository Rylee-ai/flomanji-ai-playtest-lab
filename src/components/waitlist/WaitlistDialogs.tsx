
import { WaitlistEntry } from "@/types/user";
import { ApproveDialog } from "@/components/waitlist/ApproveDialog";
import { RejectDialog } from "@/components/waitlist/RejectDialog";
import { NotesDialog } from "@/components/waitlist/NotesDialog";

interface WaitlistDialogsProps {
  isApproving: boolean;
  setIsApproving: (isOpen: boolean) => void;
  isRejecting: boolean;
  setIsRejecting: (isOpen: boolean) => void;
  showNotes: boolean;
  setShowNotes: (isOpen: boolean) => void;
  actionEntry: WaitlistEntry | null;
  notes: string;
  setNotes: (notes: string) => void;
  onConfirmApprove: () => void;
  onConfirmReject: () => void;
  onSaveNotes: () => void;
}

/**
 * Component that contains all dialogs for waitlist actions
 */
export const WaitlistDialogs = ({
  isApproving,
  setIsApproving,
  isRejecting,
  setIsRejecting,
  showNotes,
  setShowNotes,
  actionEntry,
  notes,
  setNotes,
  onConfirmApprove,
  onConfirmReject,
  onSaveNotes
}: WaitlistDialogsProps) => {
  return (
    <>
      <ApproveDialog
        isOpen={isApproving}
        setIsOpen={setIsApproving}
        entry={actionEntry}
        notes={notes}
        setNotes={setNotes}
        onConfirm={onConfirmApprove}
      />

      <RejectDialog
        isOpen={isRejecting}
        setIsOpen={setIsRejecting}
        entry={actionEntry}
        notes={notes}
        setNotes={setNotes}
        onConfirm={onConfirmReject}
      />
      
      <NotesDialog
        isOpen={showNotes}
        setIsOpen={setShowNotes}
        entry={actionEntry}
        notes={notes}
        setNotes={setNotes}
        onSave={onSaveNotes}
      />
    </>
  );
};
