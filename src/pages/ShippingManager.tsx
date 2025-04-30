
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useShippingManager } from "@/hooks/useShippingManager";
import { Search, Filter, RefreshCcw, TruckIcon, MapPinIcon, PackageOpen } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ShippingManager = () => {
  const { entries, isLoading, loadShippingEntries, updateShippingStatus } = useShippingManager();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "processing" | "shipped" | "delivered">("all");
  
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isViewingAddress, setIsViewingAddress] = useState(false);
  
  const [status, setStatus] = useState<"pending" | "processing" | "shipped" | "delivered">("pending");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  
  const handleUpdateStatus = (entry: any) => {
    setSelectedEntry(entry);
    setStatus(entry.status);
    setTrackingNumber(entry.trackingNumber || "");
    setTrackingUrl(entry.trackingUrl || "");
    setIsUpdatingStatus(true);
  };
  
  const handleViewAddress = (entry: any) => {
    setSelectedEntry(entry);
    setIsViewingAddress(true);
  };
  
  const saveShippingStatus = async () => {
    if (selectedEntry) {
      const success = await updateShippingStatus(
        selectedEntry.id,
        status,
        trackingNumber || undefined,
        trackingUrl || undefined
      );
      
      if (success) {
        setIsUpdatingStatus(false);
      }
    }
  };
  
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      entry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: 'pending' | 'processing' | 'shipped' | 'delivered') => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
    }
  };
  
  const hasAddress = (entry: any) => !!entry.address;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Shipping Manager</h1>
        <Button variant="outline" onClick={loadShippingEntries}>
          <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Playtester Shipments</CardTitle>
          <CardDescription>
            Manage shipping status and tracking for approved playtesters
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
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p>Loading shipping data...</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {searchQuery || statusFilter !== "all" 
                ? "No shipments match your filter criteria." 
                : "No approved playtesters yet."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Shipping Address</TableHead>
                    <TableHead>Last Updated</TableHead>
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
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell>
                        {hasAddress(entry) ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 cursor-pointer" onClick={() => handleViewAddress(entry)}>
                            <MapPinIcon className="h-3 w-3 mr-1" /> Address on file
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            No address
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{format(new Date(entry.updatedAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleUpdateStatus(entry)}
                          disabled={!hasAddress(entry)}
                          className={!hasAddress(entry) ? "opacity-50 cursor-not-allowed" : ""}
                        >
                          <TruckIcon className="h-4 w-4 mr-2" />
                          Update Status
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Update Shipping Status Dialog */}
      <Dialog open={isUpdatingStatus} onOpenChange={setIsUpdatingStatus}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Shipping Status</DialogTitle>
            <DialogDescription>
              Update the shipping status for {selectedEntry?.firstName} {selectedEntry?.lastName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Shipping Status</Label>
              <Select 
                value={status} 
                onValueChange={(value: "pending" | "processing" | "shipped" | "delivered") => setStatus(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {status === "shipped" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="trackingNumber">Tracking Number</Label>
                  <Input
                    id="trackingNumber"
                    placeholder="e.g., 1Z999AA10123456784"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trackingUrl">Tracking URL (Optional)</Label>
                  <Input
                    id="trackingUrl"
                    placeholder="https://tracking.carrier.com/track?number=123456789"
                    value={trackingUrl}
                    onChange={(e) => setTrackingUrl(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdatingStatus(false)}>
              Cancel
            </Button>
            <Button onClick={saveShippingStatus}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Address Dialog */}
      <Dialog open={isViewingAddress} onOpenChange={setIsViewingAddress}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
            <DialogDescription>
              Address for {selectedEntry?.firstName} {selectedEntry?.lastName}
            </DialogDescription>
          </DialogHeader>
          {selectedEntry?.address && (
            <div className="p-4 border rounded-md bg-gray-50">
              <p className="mb-1">{selectedEntry.firstName} {selectedEntry.lastName}</p>
              <p className="mb-1">{selectedEntry.address.street}</p>
              {selectedEntry.address.apartment && <p className="mb-1">{selectedEntry.address.apartment}</p>}
              <p className="mb-1">{selectedEntry.address.city}, {selectedEntry.address.state} {selectedEntry.address.postalCode}</p>
              <p>{selectedEntry.address.country}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewingAddress(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShippingManager;
