
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Check, X, MessageSquare } from "lucide-react";

const WaitlistManager = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<Array<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
  }>>([
    {
      id: "1",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      status: "pending",
      createdAt: "2023-04-01T12:00:00Z"
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      status: "approved",
      createdAt: "2023-04-02T14:30:00Z"
    }
  ]);
  
  const handleApprove = (id: string) => {
    setWaitlistEntries(
      waitlistEntries.map(entry => 
        entry.id === id ? { ...entry, status: 'approved' as const } : entry
      )
    );
    toast({
      title: "Entry Approved",
      description: "The user has been approved and will be notified.",
    });
  };
  
  const handleReject = (id: string) => {
    setWaitlistEntries(
      waitlistEntries.map(entry => 
        entry.id === id ? { ...entry, status: 'rejected' as const } : entry
      )
    );
    toast({
      title: "Entry Rejected",
      description: "The user has been rejected.",
    });
  };
  
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
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Entries</CardTitle>
          <CardDescription>
            Review and manage users who have signed up for the Flomanji Playtest
          </CardDescription>
        </CardHeader>
        <CardContent>
          {waitlistEntries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No waitlist entries yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waitlistEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">
                      {entry.firstName} {entry.lastName}
                    </TableCell>
                    <TableCell>{entry.email}</TableCell>
                    <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    <TableCell>{new Date(entry.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {entry.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0" 
                              onClick={() => handleApprove(entry.id)}
                            >
                              <span className="sr-only">Approve</span>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0" 
                              onClick={() => handleReject(entry.id)}
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
                        >
                          <span className="sr-only">Send Message</span>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistManager;
