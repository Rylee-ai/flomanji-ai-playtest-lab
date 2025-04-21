
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { PackageCheck, Truck, Clock, ExternalLink } from "lucide-react";

const PlayerShipping = () => {
  const { profile } = useAuth();
  
  // In a real implementation, this would come from the backend
  const shippingStatus: {
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    updatedAt: string;
    trackingNumber?: string;
    trackingUrl?: string;
  } = {
    status: "processing",
    updatedAt: new Date().toISOString(),
    trackingNumber: "FLMJ1234567890",
    trackingUrl: "https://example.com/track"
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
  
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Shipping Status</h1>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Playtest Materials</CardTitle>
            <CardDescription>
              Current status of your game materials
            </CardDescription>
          </div>
          {getStatusBadge(shippingStatus.status)}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-6 py-4">
            <div className="flex-shrink-0">
              {getStatusIcon(shippingStatus.status)}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium mb-2">
                Status: <span className="font-bold">{shippingStatus.status.charAt(0).toUpperCase() + shippingStatus.status.slice(1)}</span>
              </h3>
              <p className="text-muted-foreground mb-2">
                Last updated: {new Date(shippingStatus.updatedAt).toLocaleString()}
              </p>
              
              {shippingStatus.status === 'shipped' && (
                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                  <h4 className="font-medium mb-2">Tracking Information</h4>
                  <p className="text-sm mb-2">Tracking Number: {shippingStatus.trackingNumber}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={shippingStatus.trackingUrl} target="_blank" rel="noopener noreferrer">
                      Track Package <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
              
              {shippingStatus.status === 'pending' && (
                <p className="text-sm">Your playtest materials are being prepared for shipment. We'll update this page once they're on their way!</p>
              )}
              
              {shippingStatus.status === 'processing' && (
                <p className="text-sm">Your playtest materials are being packaged and will be shipped soon. Check back for tracking information!</p>
              )}
              
              {shippingStatus.status === 'delivered' && (
                <p className="text-sm">Your playtest materials have been delivered! If you haven't received them, please contact support.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
          <CardDescription>
            Where your playtest materials will be delivered
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-md bg-gray-50">
            <p className="mb-1">{profile?.firstName} {profile?.lastName}</p>
            <p className="mb-1">123 Main Street</p>
            <p className="mb-1">Apt 4B</p>
            <p className="mb-1">New York, NY 10001</p>
            <p>United States</p>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              If you need to update your shipping address, please visit your profile page.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerShipping;
