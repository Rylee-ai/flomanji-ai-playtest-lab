
import { format } from "date-fns";
import { WaitlistEntry } from "@/types/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { WaitlistActions } from "./WaitlistActions";

interface WaitlistTableProps {
  entries: WaitlistEntry[];
  onApprove: (entry: WaitlistEntry) => void;
  onReject: (entry: WaitlistEntry) => void;
  onShowNotes: (entry: WaitlistEntry) => void;
}

/**
 * Renders the waitlist entries table
 */
export const WaitlistTable = ({
  entries,
  onApprove,
  onReject,
  onShowNotes
}: WaitlistTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">
                {entry.firstName} {entry.lastName}
              </TableCell>
              <TableCell>{entry.email}</TableCell>
              <TableCell><StatusBadge status={entry.status as any} /></TableCell>
              <TableCell>{format(new Date(entry.createdAt), 'MMM d, yyyy')}</TableCell>
              <TableCell>
                {entry.notes ? (
                  <div className="max-w-xs truncate text-xs text-muted-foreground">
                    {entry.notes}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground italic">No notes</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <WaitlistActions 
                  entry={entry}
                  onApprove={onApprove}
                  onReject={onReject}
                  onShowNotes={onShowNotes}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
