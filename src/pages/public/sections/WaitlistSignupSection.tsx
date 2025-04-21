
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check } from "lucide-react";

export const WaitlistSignupSection = React.forwardRef<HTMLDivElement>((props, ref) => (
  <section ref={ref} className="py-16 bg-gray-950">
    <div className="container mx-auto px-4 max-w-5xl">
      <h2 className="text-3xl font-bold mb-2 text-center">Join the Closed Beta</h2>
      <p className="text-gray-400 mb-12 text-center max-w-3xl mx-auto">
        Sign up for the Flomanji playtest program and be the first to experience the game.
        Limited spots available!
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                <Input 
                  id="firstName" 
                  className="bg-gray-800 border-gray-700 text-white" 
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                <Input 
                  id="lastName" 
                  className="bg-gray-800 border-gray-700 text-white" 
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email Address
              </label>
              <Input 
                id="email" 
                type="email" 
                className="bg-gray-800 border-gray-700 text-white" 
                placeholder="name@example.com"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="rounded border-gray-700 bg-gray-800 text-amber-500 focus:ring-amber-500"
              />
              <label htmlFor="terms" className="text-xs text-gray-400">
                I agree to receive emails about the Flomanji Playtest Program
              </label>
            </div>
            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black">
              Join the Waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
            <h3 className="text-lg font-bold mb-2">Beta Tester Perks</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-amber-400 mr-2 mt-1" />
                <span>Early access to the digital AI playtesting tools</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-amber-400 mr-2 mt-1" />
                <span>Physical prototype cards delivered to your door</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-amber-400 mr-2 mt-1" />
                <span>Direct feedback channel to the design team</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-amber-400 mr-2 mt-1" />
                <span>Exclusive beta tester credit in the final game</span>
              </li>
            </ul>
          </div>
          <div className="p-4 bg-amber-500/10 border border-amber-400/20 rounded-lg">
            <p className="text-sm text-gray-300">
              <span className="font-medium">Limited availability:</span> We're selecting a diverse group of playtesters to ensure comprehensive feedback. Apply now to increase your chances of selection.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
));
WaitlistSignupSection.displayName = "WaitlistSignupSection";
