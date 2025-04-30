
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
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return { success: false };
    }
    
    setIsSubmitting(true);
    
    try {
      // First, check if email already exists with any status
      const { data: existingEntries, error: checkError } = await supabase
        .from('waitlist_entries')
        .select('id, status, email')
        .eq('email', data.email)
        .maybeSingle();
      
      if (checkError) {
        throw checkError;
      }
      
      // If entry exists, provide appropriate feedback
      if (existingEntries) {
        if (existingEntries.status === 'approved') {
          toast.info("You've already been approved for the Flomanji Playtest! Please check your email for login information.");
          return { success: false, alreadyApproved: true };
        } else if (existingEntries.status === 'pending') {
          toast.info("You're already on our waitlist. We'll contact you soon!");
          return { success: false, alreadyOnWaitlist: true };
        } else if (existingEntries.status === 'rejected') {
          toast.info("Your previous application was not approved. If you believe this is an error, please contact support.");
          return { success: false, previouslyRejected: true };
        }
      }
      
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
