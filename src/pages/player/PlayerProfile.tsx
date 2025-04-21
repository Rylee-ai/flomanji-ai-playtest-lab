
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const PlayerProfile = () => {
  const { profile, user } = useAuth();
  
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    // This would save the address to the database in a real implementation
    toast({
      title: "Address Updated",
      description: "Your shipping address has been updated successfully",
    });
  };
  
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
          <form onSubmit={handleSaveAddress}>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
              <CardDescription>
                Where we'll send your playtest materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" placeholder="123 Main St" />
                </div>
                <div>
                  <Label htmlFor="apartment">Apartment/Suite (Optional)</Label>
                  <Input id="apartment" placeholder="Apt 4B" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input id="postal" placeholder="10001" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="United States" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Address</Button>
            </CardFooter>
          </form>
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
