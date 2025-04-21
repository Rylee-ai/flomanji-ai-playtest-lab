
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronRight, 
  Clock, 
  Users, 
  Zap, 
  Shield, 
  Play,
  Map,
  Info,
  Check,
  ArrowRight,
  Plus
} from "lucide-react";
import { TREASURE_CARDS } from "@/lib/cards/treasures";

const HomePage = () => {
  const waitlistRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get 12 treasure cards for the card breakdown section
  const displayCards = TREASURE_CARDS.slice(0, 12);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-[url('/lovable-uploads/ce75a97c-6836-41ee-b39b-1719726cb097.png')] bg-cover bg-center py-32">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container relative mx-auto px-4 flex flex-col items-start max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            FLOMANJI:<br />
            <span className="text-amber-400">Can You Escape Paradise?</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-300">
            A deck-building survival adventure where paradise and chaos collide
          </p>
          
          <div className="flex gap-4 mb-8">
            <Button size="lg" onClick={scrollToWaitlist} className="bg-amber-500 hover:bg-amber-600 text-black">
              Join Beta Waitlist
            </Button>
          </div>
          
          <div className="flex gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" /> 30-60 min
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" /> 2-6 players
            </div>
            <div className="flex items-center">
              <Info className="h-4 w-4 mr-1" /> Ages 12+
            </div>
          </div>
        </div>
      </section>

      {/* Game Overview Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center mb-8">
            <Badge variant="outline" className="mr-2 bg-amber-500/10 text-amber-400 border-amber-500/20">1</Badge>
            <h2 className="text-2xl font-bold">Game Overview</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Paradise's Craziest Card Game</h3>
                <p className="text-gray-400 mb-4">
                  Flomanji combines deck-building mechanics with survival storytelling as players navigate through exotic environments, encountering bizarre hazards, eccentric characters, and unexpected treasures.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Now in development</span>
                  <Link to="/about" className="text-amber-400 flex items-center">
                    Learn more <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-800/30">
                <h4 className="font-medium mb-2">Deck Building</h4>
                <Badge className="bg-amber-600">Core Mechanic</Badge>
              </div>
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
                <h4 className="font-medium mb-2">Heat System</h4>
                <Badge className="bg-blue-600">Core Mechanic</Badge>
              </div>
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
                <h4 className="font-medium mb-2">Character Abilities</h4>
                <Badge className="bg-green-600">Core Mechanic</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center mb-8">
            <Badge variant="outline" className="mr-2 bg-amber-500/10 text-amber-400 border-amber-500/20">2</Badge>
            <h2 className="text-2xl font-bold">Key Features</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <Zap className="h-8 w-8 text-yellow-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">AI Game Master</h3>
                <p className="text-gray-400 text-sm">
                  Dynamic storytelling powered by AI that adapts to your choices and creates unique gameplay experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-green-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Risk Management</h3>
                <p className="text-gray-400 text-sm">
                  Balance heat levels, resources, and strategy to survive the increasingly chaotic environment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <Map className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Mission System</h3>
                <p className="text-gray-400 text-sm">
                  Complete unique objectives while exploring distinctive regions with special challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <Plus className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Flomanjified Cards</h3>
                <p className="text-gray-400 text-sm">
                  Encounter bizarre paradise-themed hazards, characters and treasures with unique abilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Design Pillars */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center mb-8">
            <Badge variant="outline" className="mr-2 bg-amber-500/10 text-amber-400 border-amber-500/20">3</Badge>
            <h2 className="text-2xl font-bold">Design Pillars</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-3">1. Narrative-Driven Design</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Immersive storytelling that reacts to player decisions</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Characters with unique backgrounds and motivations</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Branching scenarios with meaningful consequences</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">AI-enhanced Game Master experience</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-3">2. Tactical Resource Management</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Heat system creates escalating challenge</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Strategic deck building and card management</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Cooperation and competition mechanics</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Risk vs. reward decision making</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-3">3. Paradise Meets Fantasy</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Authentic paradise environments and hazards</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Surreal, magical realism with tropical flair</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Character-driven humor and absurd situations</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-800 text-amber-400 rounded-full p-1 mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-gray-400 text-sm">Unique "Flomanjified" game elements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-2">Gear Up, Get Weird, Get Out</h2>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Get ready for an adventure where danger is just the beginning.
            Every game tells a story, every decision matters, and paradise never felt so dangerous.
          </p>

          <div className="relative mx-auto max-w-md">
            <div className="bg-gray-900 border border-green-900/60 p-6 rounded-lg relative z-10">
              <Badge className="bg-green-600 mb-2">Early Access</Badge>
              <h3 className="text-xl font-bold mb-2">Join our Playtest</h3>
              <p className="text-gray-400 text-sm mb-4">
                Be among the first to experience Flomanji and help shape its development.
              </p>
              <Button 
                onClick={scrollToWaitlist} 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Sign Up Now
              </Button>
            </div>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-gray-800 p-2 rounded-full">
              <ChevronRight className="rotate-180 h-5 w-5" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-gray-800 p-2 rounded-full">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            <span className="h-2 w-2 rounded-full bg-gray-700"></span>
            <span className="h-2 w-2 rounded-full bg-gray-700"></span>
          </div>
        </div>
      </section>

      {/* Game Specifications */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Game Specifications</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
              <h3 className="text-lg font-bold mb-2">2-6</h3>
              <p className="text-gray-400">Number of players supported per game session</p>
            </div>
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
              <h3 className="text-lg font-bold mb-2">30-60 min</h3>
              <p className="text-gray-400">Average playtime for a full game mission</p>
            </div>
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
              <h3 className="text-lg font-bold mb-2">12+</h3>
              <p className="text-gray-400">Recommended player age for gameplay</p>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-6">Card Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {displayCards.map((card, i) => (
              <div key={i} className="bg-gray-900 aspect-card rounded-lg border border-gray-800 flex flex-col">
                <div className="flex-1"></div>
                <div className="p-3 border-t border-gray-800">
                  <p className="text-sm font-medium">{card.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-order Section */}
      <section className="py-16 bg-black text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-2">Get Ready for Launch!</h2>
          <p className="text-gray-400 mb-10">Pre-order now and be ready when Flomanji hits game tables</p>
          
          <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg text-gray-400 uppercase tracking-wide mb-2">Starting From</h3>
            <div className="flex items-center justify-center mb-3">
              <span className="text-4xl font-bold">$49.99</span>
              <span className="text-gray-400 ml-2">USD</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">Base game with all core components</p>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
              Pre-Order Now
            </Button>
            <p className="mt-3 text-xs text-gray-500">Ships Q2 2025 • Limited quantities available</p>
          </div>
        </div>
      </section>

      {/* Waitlist Signup */}
      <section ref={waitlistRef} className="py-16 bg-gray-950">
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

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-amber-400 mb-3">FLOMANJI</h3>
              <p className="text-gray-400 max-w-md text-sm">
                A deck-building survival adventure where the weird and wild collide in paradise.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-bold mb-3 text-gray-300">GAME</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link to="/" className="hover:text-white">Overview</Link></li>
                  <li><Link to="/" className="hover:text-white">Features</Link></li>
                  <li><Link to="/" className="hover:text-white">Gameplay</Link></li>
                  <li><Link to="/" className="hover:text-white">FAQ</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-bold mb-3 text-gray-300">COMPANY</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link to="/" className="hover:text-white">About</Link></li>
                  <li><Link to="/" className="hover:text-white">Team</Link></li>
                  <li><Link to="/" className="hover:text-white">Contact</Link></li>
                  <li><Link to="/" className="hover:text-white">Press Kit</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-bold mb-3 text-gray-300">LEGAL</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link to="/" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link to="/" className="hover:text-white">Terms of Service</Link></li>
                  <li><Link to="/" className="hover:text-white">Cookies</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <Separator className="bg-gray-800 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Flomanji. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
