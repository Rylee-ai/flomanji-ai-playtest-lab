
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useWaitlist } from "@/hooks/useWaitlist";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Info } from "lucide-react";

const WaitlistSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const { submitToWaitlist, isSubmitting, isSuccess, statusMessage } = useWaitlist();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    const result = await submitToWaitlist({
      firstName,
      lastName,
      email,
      agreedToTerms: agreeTerms
    });
    
    // Scroll to top to ensure users see the status message
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <Alert variant="default" className="border-green-500 bg-green-50 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <AlertTitle className="text-green-700">Application Received!</AlertTitle>
              <AlertDescription className="text-green-600">
                Your waitlist application has been successfully submitted. Your current status is <strong>pending review</strong>.
              </AlertDescription>
            </Alert>
            <p className="text-green-700 mb-4">
              We've received your information and added you to our waitlist. 
              Keep an eye on your email ({email}) for updates on your application 
              status and next steps. An admin will review your application soon.
            </p>
            <div className="border border-green-300 bg-green-100 p-4 rounded-md">
              <h3 className="text-green-800 font-medium mb-2">What happens next?</h3>
              <ol className="list-decimal list-inside text-green-700 space-y-2">
                <li>Our team reviews your application (typically within 1-3 business days)</li>
                <li>If approved, you'll receive an email with login information</li>
                <li>Once logged in, you can set your shipping address for your physical prototype</li>
                <li>Start playtesting and providing valuable feedback!</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button asChild className="w-full">
              <a href="/">Return to Homepage</a>
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Application ID: #{new Date().getTime().toString().slice(-8)}
            </p>
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
            {statusMessage && (
              <Alert variant="default" className="border-amber-500 bg-amber-50">
                <Info className="h-5 w-5 text-amber-500" />
                <AlertDescription className="text-amber-800">
                  {statusMessage}
                </AlertDescription>
              </Alert>
            )}
          
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
