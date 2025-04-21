
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EmailConfirmationPage = () => (
  <div className="container max-w-md mx-auto py-16 flex flex-col min-h-screen items-center justify-center">
    <Card className="w-full border-2">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold mb-2">Welcome to the Flomanji Playtest!</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="mb-6 text-lg">
          Your account has been created and your email address verified. You can now log in to access the playtest experience.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg py-6">
          <Link to="/auth">Log In</Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export default EmailConfirmationPage;
