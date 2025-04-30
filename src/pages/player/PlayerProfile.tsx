
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { PackageOpen } from "lucide-react";
import { usePlayerShipping } from "@/hooks/usePlayerShipping";

const PlayerProfile = () => {
  const { profile, user } = useAuth();
  const { shippingAddress } = usePlayerShipping();
  
  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    // This would save preferences to the database in a real implementation
    toast({
      title: "Preferences Updated",
      description: "Your playtest preferences have been updated successfully",
    });
  };
  
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your basic account details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={`${profile?.firstName || ''} ${profile?.lastName || ''}`}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={user?.email || ''}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="joined">Joined</Label>
                <Input 
                  id="joined" 
                  value={new Date(profile?.createdAt || '').toLocaleDateString()}
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
            <CardDescription>
              Where we'll send your playtest materials
            </CardDescription>
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
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <PackageOpen className="h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-4">No shipping address on file</p>
                <Button asChild>
                  <Link to="/player/shipping">Add Shipping Address</Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/player/shipping">
                {shippingAddress ? "Manage Shipping" : "Set Up Shipping"}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="mt-6">
        <form onSubmit={handleSavePreferences}>
          <CardHeader>
            <CardTitle>Playtest Preferences</CardTitle>
            <CardDescription>
              Customize your playtest experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience">Gaming Experience</Label>
                <select id="experience" className="w-full p-2 border rounded-md">
                  <option value="beginner">Beginner - New to tabletop games</option>
                  <option value="casual">Casual - Play occasionally</option>
                  <option value="regular">Regular - Play weekly</option>
                  <option value="expert">Expert - Dedicated hobbyist</option>
                </select>
              </div>
              <div>
                <Label htmlFor="preferences">Game Style Preferences</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Strategic Planning</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Social Deduction</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Storytelling</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Resource Management</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Luck/Randomness</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Competitive Play</span>
                  </label>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any other preferences or information you'd like us to know..." />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Preferences</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default PlayerProfile;
