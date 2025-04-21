
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EmailConfirmationPage = () => (
  <div className="container max-w-md mx-auto py-16 flex flex-col min-h-screen items-center justify-center">
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl mb-2">Welcome to the Flomanji Playtest!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Your account has been created and your email address verified. You can now log in to get started.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          <Link to="/auth">Log In</Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export default EmailConfirmationPage;
