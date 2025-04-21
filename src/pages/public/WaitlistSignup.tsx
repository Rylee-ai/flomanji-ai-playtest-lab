
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const WaitlistSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      toast({
        title: "Please agree to terms",
        description: "You must agree to the terms and conditions to join the waitlist",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would submit to your database in a real implementation
      console.log({
        firstName,
        lastName,
        email,
        timestamp: new Date().toISOString(),
      });
      
      setIsSuccess(true);
      toast({
        title: "Waitlist Signup Successful",
        description: "Thank you for joining our waitlist! We'll be in touch soon.",
      });
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="container max-w-md mx-auto py-12">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Waitlist Signup Successful!</CardTitle>
            <CardDescription className="text-green-700">
              Thank you for your interest in the Flomanji Playtest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">
              We've received your information and added you to our waitlist. 
              Keep an eye on your email ({email}) for updates on your application 
              status and next steps.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/">Return to Homepage</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-md mx-auto py-12">
      <Card className="border-2">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Join the Waitlist</CardTitle>
            <CardDescription>
              Sign up to be considered for the Flomanji Playtest Program
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="terms" 
                checked={agreeTerms} 
                onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              />
              <Label 
                htmlFor="terms" 
                className="text-sm leading-tight"
              >
                I agree to receive emails about the Flomanji Playtest Program and 
                understand that my information will be handled according to the 
                Privacy Policy.
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Limited spots available. Selected participants will be notified by email.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default WaitlistSignup;
