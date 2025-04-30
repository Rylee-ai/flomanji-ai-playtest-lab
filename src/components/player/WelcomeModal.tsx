
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { usePlayerShipping } from "@/hooks/usePlayerShipping";
import { PackageOpen, ArrowRight, Star } from "lucide-react";
import { toast } from "sonner";

// Key for local storage to track first-time users
const WELCOME_SHOWN_KEY = "flomanji-welcome-shown";

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile } = useAuth();
  const { shippingAddress } = usePlayerShipping();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the user is logged in and it's their first visit
    if (user && profile) {
      const hasShownWelcome = localStorage.getItem(WELCOME_SHOWN_KEY);
      if (!hasShownWelcome) {
        // Set a small delay to allow the UI to fully load
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [user, profile]);
  
  const handleClose = () => {
    // Mark that we've shown the welcome message to this user
    localStorage.setItem(WELCOME_SHOWN_KEY, "true");
    setIsOpen(false);
  };
  
  const handleGetStarted = () => {
    // If user doesn't have a shipping address, direct them to add one
    if (!shippingAddress) {
      navigate("/player/shipping");
      toast.info("Please add your shipping address to receive your playtest materials");
    } else {
      navigate("/player/dashboard");
    }
    handleClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <Star className="text-primary mr-2 h-6 w-6" /> 
            Welcome to Flomanji Playtest!
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Congratulations! You've been selected to participate in the Flomanji playtest program.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <p>
            We're excited to have you join our community of playtesters. Your feedback will be invaluable in helping us create the best possible game experience.
          </p>
          
          <div className="bg-muted/50 p-4 rounded-md flex items-start">
            <PackageOpen className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Next Steps:</h3>
              <p className="text-sm text-muted-foreground">
                To receive your physical playtest materials, please provide your shipping address. We'll send you game components as soon as they're ready!
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Later
          </Button>
          <Button onClick={handleGetStarted} className="gap-2">
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
