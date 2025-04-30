
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

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
      toast.error("Please agree to receive emails about the Flomanji Playtest Program");
      return { success: false };
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase with field names matching the database schema
      const { error } = await supabase
        .from('waitlist_entries')
        .insert([
          { 
            first_name: data.firstName, 
            last_name: data.lastName, 
            email: data.email,
            status: 'pending'
          }
        ]);
      
      if (error) {
        if (error.code === '23505') { // Unique violation
          toast.error("This email is already on our waitlist");
          return { success: false, error };
        }
        throw error;
      }
      
      setIsSuccess(true);
      toast.success("Thank you for your interest in Flomanji! We'll be in touch soon.");
      
      return { success: true };
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      toast.error("There was a problem submitting your request. Please try again.");
      
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
