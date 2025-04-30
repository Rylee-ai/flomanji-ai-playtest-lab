
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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  
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
    setStatusMessage(null);
    
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
          const message = "You've already been approved for the Flomanji Playtest! Please check your email for login information.";
          toast.info(message);
          setStatusMessage(message);
          return { success: false, alreadyApproved: true };
        } else if (existingEntries.status === 'pending') {
          const message = "You're already on our waitlist. We'll contact you soon when a spot opens up!";
          toast.info(message);
          setStatusMessage(message);
          return { success: false, alreadyOnWaitlist: true };
        } else if (existingEntries.status === 'rejected') {
          const message = "Your previous application was not approved. If you believe this is an error, please contact support.";
          toast.info(message);
          setStatusMessage(message);
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
      const successMessage = "Thank you for your interest in Flomanji! Your application has been received and is now pending review. We'll be in touch soon once your application has been considered.";
      toast.success(successMessage);
      setStatusMessage(successMessage);
      
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
    statusMessage
  };
};
