
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check } from "lucide-react";
import { useWaitlist } from "@/hooks/useWaitlist";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const WaitlistSignupSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
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
      agreedToTerms
    });
    
    if (result.success) {
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setAgreedToTerms(false);
      
      // Scroll to form to ensure status message is visible
      const formElement = e.currentTarget;
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section ref={ref} className="py-16 bg-gray-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold mb-2 text-center">Join the Closed Beta</h2>
        <p className="text-gray-400 mb-12 text-center max-w-3xl mx-auto">
          Sign up for the Flomanji playtest program and be the first to experience the game.
          Limited spots available!
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {statusMessage && (
                <Alert className="bg-amber-500/10 border border-amber-400/20">
                  <AlertDescription className="text-amber-200 text-sm">
                    {statusMessage}
                  </AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">
                    First Name
                  </label>
                  <Input 
                    id="firstName" 
                    className="bg-gray-800 border-gray-700 text-white" 
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">
                    Last Name
                  </label>
                  <Input 
                    id="lastName" 
                    className="bg-gray-800 border-gray-700 text-white" 
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  className="bg-gray-800 border-gray-700 text-white" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="rounded border-gray-700 bg-gray-800 text-amber-500 focus:ring-amber-500"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms" className="text-xs text-gray-400">
                  I agree to receive emails about the Flomanji Playtest Program
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Join the Waitlist"} 
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
              {isSuccess && (
                <div className="p-3 bg-green-900/30 border border-green-800 rounded text-green-400 text-sm">
                  <p className="font-medium">Thank you! Your application has been submitted successfully.</p>
                  <p className="mt-1">Your application is now pending review. We'll contact you soon with updates.</p>
                  <p className="mt-2">Want to learn more? <a href="/waitlist" className="underline hover:text-green-300">View Waitlist Details</a></p>
                </div>
              )}
            </form>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
              <h3 className="text-lg font-bold mb-2">Beta Tester Perks</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-amber-400 mr-2 mt-1" />
                  <span>Early access to the digital AI playtesting tools</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-amber-400 mr-2 mt-1" />
                  <span>Physical prototype cards delivered to your door</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-amber-400 mr-2 mt-1" />
                  <span>Direct feedback channel to the design team</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-amber-400 mr-2 mt-1" />
                  <span>Exclusive beta tester credit in the final game</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-400/20 rounded-lg">
              <p className="text-sm text-gray-300">
                <span className="font-medium">Limited availability:</span> We're selecting a diverse group of playtesters to ensure comprehensive feedback. Apply now to increase your chances of selection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
WaitlistSignupSection.displayName = "WaitlistSignupSection";
