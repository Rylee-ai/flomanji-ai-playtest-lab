
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface WaitlistFormData {
  firstName: string;
  lastName: string;
  email: string;
  agreedToTerms: boolean;
}

export const useWaitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const submitToWaitlist = async (data: WaitlistFormData) => {
    if (!data.agreedToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to receive emails about the Flomanji Playtest Program",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate an API call - this would be replaced with a real API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would submit to your database in a real implementation
      console.log("Submitting to waitlist:", data);
      
      setIsSuccess(true);
      toast({
        title: "Waitlist Signup Successful",
        description: "Thank you for your interest in Flomanji! We'll be in touch soon.",
      });
      
      return { success: true };
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
      
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    submitToWaitlist,
    isSubmitting,
    isSuccess,
  };
};
