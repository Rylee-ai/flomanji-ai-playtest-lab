
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, MessageSquare, Search, Filter, RefreshCcw } from "lucide-react";
import { useWaitlistManager } from "@/hooks/useWaitlistManager";
import { WaitlistEntry } from "@/types/user";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

const WaitlistManager = () => {
  const { waitlistEntries, isLoading, updateWaitlistStatus, loadWaitlistEntries } = useWaitlistManager();
  const [actionEntry, setActionEntry] = useState<WaitlistEntry | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  
  const handleApprove = (entry: WaitlistEntry) => {
    setActionEntry(entry);
    setIsApproving(true);
  };
  
  const handleReject = (entry: WaitlistEntry) => {
    setActionEntry(entry);
    setIsRejecting(true);
  };

  const handleShowNotes = (entry: WaitlistEntry) => {
    setActionEntry(entry);
    setNotes(entry.notes || "");
    setShowNotes(true);
  };
  
  const confirmApprove = async () => {
    if (actionEntry) {
      await updateWaitlistStatus(actionEntry.id, "approved", notes);
      setIsApproving(false);
      setActionEntry(null);
      setNotes("");
    }
  };
  
  const confirmReject = async () => {
    if (actionEntry) {
      await updateWaitlistStatus(actionEntry.id, "rejected", notes);
      setIsRejecting(false);
      setActionEntry(null);
      setNotes("");
    }
  };

  const saveNotes = async () => {
    if (actionEntry) {
      await updateWaitlistStatus(actionEntry.id, actionEntry.status as any, notes);
      setShowNotes(false);
      setActionEntry(null);
    }
  };
  
  const filteredEntries = waitlistEntries.filter(entry => {
    const matchesSearch = 
      entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Waitlist Manager</h1>
        <Button variant="outline" size="sm" onClick={loadWaitlistEntries}>
          <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Entries</CardTitle>
          <CardDescription>
            Review and manage users who have signed up for the Flomanji Playtest
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                className="border rounded p-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p>Loading waitlist entries...</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {searchQuery || statusFilter !== "all" 
                ? "No waitlist entries match your filter criteria." 
                : "No waitlist entries yet."}
            </p>
          ) : (
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
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        {entry.firstName} {entry.lastName}
                      </TableCell>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>{getStatusBadge(entry.status as any)}</TableCell>
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
                        <div className="flex justify-end gap-2">
                          {entry.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 w-8 p-0 bg-green-50 border-green-200 hover:bg-green-100 hover:text-green-700" 
                                onClick={() => handleApprove(entry)}
                              >
                                <span className="sr-only">Approve</span>
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 w-8 p-0 bg-red-50 border-red-200 hover:bg-red-100 hover:text-red-700" 
                                onClick={() => handleReject(entry)}
                              >
                                <span className="sr-only">Reject</span>
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                            </>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleShowNotes(entry)}
                          >
                            <span className="sr-only">Notes</span>
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <AlertDialog open={isApproving} onOpenChange={setIsApproving}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Waitlist Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve {actionEntry?.firstName} {actionEntry?.lastName}? 
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
              setIsApproving(false);
              setActionEntry(null);
              setNotes("");
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmApprove} className="bg-green-600 hover:bg-green-700">
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isRejecting} onOpenChange={setIsRejecting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Waitlist Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject {actionEntry?.firstName} {actionEntry?.lastName}?
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
              setIsRejecting(false);
              setActionEntry(null);
              setNotes("");
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmReject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Dialog open={showNotes} onOpenChange={setShowNotes}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Notes</DialogTitle>
            <DialogDescription>
              Notes for {actionEntry?.firstName} {actionEntry?.lastName}
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
            <Button variant="outline" onClick={() => setShowNotes(false)}>
              Cancel
            </Button>
            <Button onClick={saveNotes}>
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Label = ({ htmlFor, children, className = "" }) => (
  <label 
    htmlFor={htmlFor}
    className={`block text-sm font-medium ${className}`}
  >
    {children}
  </label>
);

export default WaitlistManager;
