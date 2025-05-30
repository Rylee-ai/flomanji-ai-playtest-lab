
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/auth/AuthContext"; // Import directly from the source
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { showSuccessToast, showErrorToast, showInfoToast } from "@/lib/toast";
import { isAdminUser } from "@/utils/auth-helpers";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { signIn, user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";
  
  // If user is already logged in, redirect them to the appropriate dashboard
  useEffect(() => {
    if (user && profile) {
      console.log("User already authenticated:", user.email, "Role:", profile.role);
      setIsRedirecting(true);
      const redirectPath = isAdminUser(profile) ? '/dashboard' : '/player';
      navigate(redirectPath, { replace: true });
    }
  }, [user, profile, navigate]);
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Attempting sign in with:", email);
      const { error } = await signIn(email, password);
      
      if (!error) {
        console.log("Sign-in successful");
        showSuccessToast("Welcome back!", "You have successfully signed in");
        setIsRedirecting(true);
        
        // Delay navigation slightly to ensure profile is loaded
        setTimeout(() => {
          if (profile) {
            const redirectPath = isAdminUser(profile) ? '/dashboard' : '/player';
            console.log(`Redirecting authenticated user to ${redirectPath}`);
            navigate(redirectPath, { replace: true });
          } else {
            console.log("Profile not loaded yet, the auth state listener will handle redirection");
          }
        }, 300);
      } else {
        console.error("Sign-in error:", error);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Unexpected error during sign in:", err);
      showErrorToast("An unexpected error occurred during sign in");
      setIsLoading(false);
    }
  };
  
  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="ml-2">Redirecting to dashboard...</span>
      </div>
    );
  }
  
  return (
    <div className="container max-w-md mx-auto py-12">
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSignIn}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="signin-password">Password</Label>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-xs text-muted-foreground"
                  type="button"
                  onClick={() => {
                    showInfoToast("Reset Password", "Please contact an admin for password reset assistance");
                  }}
                  disabled={isLoading}
                >
                  Forgot password?
                </Button>
              </div>
              <Input
                id="signin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            
            <div className="text-center pt-2 border-t w-full">
              <p className="text-sm text-muted-foreground mb-2">
                Don't have an account yet?
              </p>
              <Button variant="outline" asChild disabled={isLoading}>
                <Link to="/waitlist" className="flex items-center justify-center gap-2">
                  Join our waitlist <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AuthPage;
