
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useShippingManager } from "@/hooks/shipping";

// Import our new components
import ShippingFilters from "@/components/shipping/ShippingFilters";
import ShippingTable from "@/components/shipping/ShippingTable";
import ShippingStatusDialog from "@/components/shipping/ShippingStatusDialog";
import ShippingAddressDialog from "@/components/shipping/ShippingAddressDialog";

const ShippingManager = () => {
  // Use our shipping manager hook
  const { 
    entries, 
    isLoading, 
    loadShippingEntries,
    isViewingAddress,
    setIsViewingAddress,
    selectedEntry,
    handleViewAddress,
    hasAddress,
    isUpdatingStatus,
    setIsUpdatingStatus,
    status,
    setStatus,
    trackingNumber,
    setTrackingNumber,
    trackingUrl,
    setTrackingUrl,
    handleUpdateStatus,
    saveShippingStatus
  } = useShippingManager();
  
  // Local state for filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "processing" | "shipped" | "delivered">("all");

  // Filter the entries based on search and status filter
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      entry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
          
          {/* Search and filters */}
          <ShippingFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
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
            <ShippingTable
              entries={filteredEntries}
              onViewAddress={handleViewAddress}
              onUpdateStatus={handleUpdateStatus}
              hasAddress={hasAddress}
            />
          )}
        </CardContent>
      </Card>
      
      {/* Dialogs */}
      <ShippingStatusDialog 
        open={isUpdatingStatus}
        onOpenChange={setIsUpdatingStatus}
        selectedEntry={selectedEntry}
        status={status}
        setStatus={setStatus}
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
        trackingUrl={trackingUrl}
        setTrackingUrl={setTrackingUrl}
        onSave={saveShippingStatus}
      />
      
      <ShippingAddressDialog
        open={isViewingAddress}
        onOpenChange={setIsViewingAddress}
        selectedEntry={selectedEntry}
      />
    </div>
  );
};

export default ShippingManager;
