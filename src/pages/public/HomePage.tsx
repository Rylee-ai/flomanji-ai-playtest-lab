
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-primary text-white py-20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Flomanji AI Playtest Lab
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8">
            Join our exclusive playtest program and help shape the future of Flomanji - 
            the tabletop game where Florida and Jumanji collide!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/waitlist">Join Waitlist</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
              <Link to="/auth">Playtester Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The Flomanji Playtest Experience</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <div className="text-primary text-4xl font-bold mb-4">01</div>
                <h3 className="text-xl font-bold mb-2">AI Game Master</h3>
                <p className="text-gray-600">
                  Interact with our AI Game Master to learn rules, test scenarios, and play simulated games anytime.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <div className="text-primary text-4xl font-bold mb-4">02</div>
                <h3 className="text-xl font-bold mb-2">Physical Components</h3>
                <p className="text-gray-600">
                  Receive exclusive prototype cards and game materials delivered to your door.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <div className="text-primary text-4xl font-bold mb-4">03</div>
                <h3 className="text-xl font-bold mb-2">Feedback Portal</h3>
                <p className="text-gray-600">
                  Shape the future of Flomanji by providing valuable feedback directly to the design team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Joining our playtest program is easy! Follow these simple steps to become part of the Flomanji development journey.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-bold mb-2">Sign Up</h3>
              <p className="text-gray-600">Join our waitlist by submitting your information</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-bold mb-2">Get Approved</h3>
              <p className="text-gray-600">Our team will review and approve your application</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-bold mb-2">Receive Materials</h3>
              <p className="text-gray-600">Get your playtest package shipped to your address</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-bold mb-2">Play & Provide Feedback</h3>
              <p className="text-gray-600">Enjoy the game and share your insights</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/waitlist">Join the Waitlist Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Adventure?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Spaces in our playtest program are limited. Join our waitlist today to be considered for this exclusive opportunity!
          </p>
          <Button asChild size="lg">
            <Link to="/waitlist">Join the Waitlist</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
