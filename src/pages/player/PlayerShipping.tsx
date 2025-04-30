
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { usePlayerShipping } from "@/hooks/usePlayerShipping";
import { PackageCheck, Truck, Clock, ExternalLink, PencilIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PlayerShipping = () => {
  const { profile } = useAuth();
  const { shippingAddress, shippingDetails, isLoading, saveAddress } = usePlayerShipping();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  
  // Form state
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United States");
  
  const handleEditAddress = () => {
    if (shippingAddress) {
      setStreet(shippingAddress.street);
      setApartment(shippingAddress.apartment || "");
      setCity(shippingAddress.city);
      setState(shippingAddress.state);
      setPostalCode(shippingAddress.postal_code);
      setCountry(shippingAddress.country);
    }
    setIsEditingAddress(true);
  };
  
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await saveAddress({
      street,
      apartment: apartment || undefined,
      city,
      state,
      postal_code: postalCode,
      country
    });
    
    if (success) {
      setIsEditingAddress(false);
    }
  };
  
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
  
  const getStatusIcon = (status: 'pending' | 'processing' | 'shipped' | 'delivered') => {
    switch (status) {
      case 'pending':
        return <Clock className="h-12 w-12 text-gray-400" />;
      case 'processing':
        return <PackageCheck className="h-12 w-12 text-blue-400" />;
      case 'shipped':
        return <Truck className="h-12 w-12 text-indigo-400" />;
      case 'delivered':
        return <PackageCheck className="h-12 w-12 text-green-400" />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 max-w-4xl flex justify-center items-center" style={{ minHeight: "50vh" }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p>Loading shipping information...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Shipping Status</h1>
      
      {(!shippingDetails && !shippingAddress) ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Please provide your shipping address to receive your playtest materials
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <Truck className="h-12 w-12 text-primary" />
            </div>
            <p className="text-center mb-6 max-w-md">
              To receive your physical Flomanji prototype cards, we need your shipping address.
              Please complete your profile to proceed.
            </p>
            <Button onClick={handleEditAddress}>
              Add Shipping Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {shippingDetails && (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Playtest Materials</CardTitle>
                  <CardDescription>
                    Current status of your game materials
                  </CardDescription>
                </div>
                {getStatusBadge(shippingDetails.status)}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6 py-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(shippingDetails.status)}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium mb-2">
                      Status: <span className="font-bold capitalize">{shippingDetails.status}</span>
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      Last updated: {format(new Date(shippingDetails.updated_at), 'MMM d, yyyy')}
                    </p>
                    
                    {shippingDetails.status === 'shipped' && shippingDetails.tracking_number && (
                      <div className="mt-4 p-4 border rounded-md bg-gray-50">
                        <h4 className="font-medium mb-2">Tracking Information</h4>
                        <p className="text-sm mb-2">Tracking Number: {shippingDetails.tracking_number}</p>
                        {shippingDetails.tracking_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={shippingDetails.tracking_url} target="_blank" rel="noopener noreferrer">
                              Track Package <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                    
                    {shippingDetails.status === 'pending' && (
                      <p className="text-sm">Your playtest materials are being prepared for shipment. We'll update this page once they're on their way!</p>
                    )}
                    
                    {shippingDetails.status === 'processing' && (
                      <p className="text-sm">Your playtest materials are being packaged and will be shipped soon. Check back for tracking information!</p>
                    )}
                    
                    {shippingDetails.status === 'delivered' && (
                      <p className="text-sm">Your playtest materials have been delivered! If you haven't received them, please contact support.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>
                  Where your playtest materials will be delivered
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleEditAddress}>
                <PencilIcon className="h-4 w-4 mr-2" /> Edit
              </Button>
            </CardHeader>
            <CardContent>
              {shippingAddress ? (
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="mb-1">{profile?.firstName} {profile?.lastName}</p>
                  <p className="mb-1">{shippingAddress.street}</p>
                  {shippingAddress.apartment && <p className="mb-1">{shippingAddress.apartment}</p>}
                  <p className="mb-1">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}</p>
                  <p>{shippingAddress.country}</p>
                </div>
              ) : (
                <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800">
                  <p>No shipping address on file. Please add your address to receive your playtest materials.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
      
      <Dialog open={isEditingAddress} onOpenChange={setIsEditingAddress}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
            <DialogDescription>
              Enter your shipping address to receive your playtest materials.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveAddress}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  placeholder="123 Main St"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apartment">Apartment/Suite/Unit (Optional)</Label>
                <Input
                  id="apartment"
                  placeholder="Apt #4B"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="10001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsEditingAddress(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Address</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayerShipping;
