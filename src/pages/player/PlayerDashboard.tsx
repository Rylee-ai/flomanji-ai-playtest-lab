
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Truck, User, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const PlayerDashboard = () => {
  const { profile } = useAuth();
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome, {profile?.firstName || 'Player'}</h1>
        <p className="text-muted-foreground">
          Thank you for joining the Flomanji Playtest Program
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Chat with Game Master</CardTitle>
            <CardDescription>
              Start a conversation with our AI Game Master
            </CardDescription>
          </CardHeader>
          <CardContent>
            Ask questions about rules, discuss strategies, or try a simulated game scenario with our AI-powered Game Master.
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/player/chat">
                Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Truck className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Shipping Status</CardTitle>
            <CardDescription>
              Track your playtest materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            Check the status of your physical game materials and get updates on when they'll arrive at your door.
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link to="/player/shipping">
                View Shipping <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <User className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              View and update your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            Manage your contact details, shipping address, and preferences for the Flomanji Playtest Program.
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link to="/player/profile">
                View Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Playtest Information</CardTitle>
          <CardDescription>
            Important details about your participation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p>
              Thank you for joining the Flomanji Playtest Program! As a participant, you'll have the opportunity to:
            </p>
            <ul>
              <li>Interact with our AI Game Master to learn rules and simulate play</li>
              <li>Receive physical game materials to test at home</li>
              <li>Provide valuable feedback that will shape the final game</li>
              <li>Participate in exclusive playtest events and discussions</li>
            </ul>
            <p>
              We're excited to have you on this journey with us as we refine and perfect the Flomanji experience.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerDashboard;
