import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * GameSpecificationsSection
 * Displays frequently asked questions about Flomanji gameplay, mechanics, and setup
 * Uses same core game knowledge as PlayerChat component
 */
export const GameSpecificationsSection = () => {
  const faqs = [
    {
      question: "What is Flomanji?",
      answer: "Flomanji is a semi-cooperative survival horror card-and-dice adventure game set in a heightened 1987 Florida. Players navigate through supernatural threats while managing Heat and Weirdness levels in a cinematic B-movie horror-comedy atmosphere."
    },
    {
      question: "How long does a game take?",
      answer: "A typical game of Flomanji takes 30-60 minutes to complete, depending on the mission chosen and number of players involved."
    },
    {
      question: "How many players can play?",
      answer: "Flomanji supports 2-6 players, making it perfect for both intimate gaming sessions and larger group experiences."
    },
    {
      question: "What are the core mechanics?",
      answer: "Players roll 2d6 + relevant stat for skill checks (1-3: Failure, 4-7: Partial Success, 8-10: Success). Each turn, players have 2 Actions they can use to Move, Use Gear, Interact, Team-Up, Rest, or complete Mission objectives. The game features Heat and Weirdness tracking systems that affect gameplay dynamics."
    },
    {
      question: "What makes Flomanji unique?",
      answer: "Flomanji combines deck-building elements with survival horror in a unique 1987 Florida setting. The Heat and Weirdness mechanics create escalating tension, while the B-movie horror-comedy tone provides a perfect balance of thrills and humor."
    },
    {
      question: "What stats do characters have?",
      answer: "Characters have five main stats: Brawn (physical strength), Moxie (agility/speed), Charm (social interaction), Grit (resilience), and Weird Sense (supernatural awareness). They also track Health, Weirdness, and Luck points."
    },
    {
      question: "How does the Heat system work?",
      answer: "The Heat system represents mounting tension and danger. At Heat 9, all players gain +1 Weirdness each round. If Heat reaches 10, the game ends in defeat. Players must carefully manage their actions to prevent Heat from escalating too quickly."
    },
    {
      question: "What happens when I encounter hazards?",
      answer: "When facing hazards, players can choose one of four approaches: Fight (Brawn check), Flee (Moxie check), Negotiate (Charm check), or Outsmart (Weird Sense check). Each approach has different consequences and may affect the Heat level."
    },
    {
      question: "What happens when Weirdness increases?",
      answer: "As Weirdness increases, characters gain access to supernatural abilities but also face greater dangers. At Weirdness 3, players draw a Weird card. At Weirdness 6, they gain a Flomanjified condition. At Weirdness 9, they must make Weird Sense checks each round or take damage."
    },
    {
      question: "How do Team-Up actions work?",
      answer: "Team-Up actions allow two or more players to combine their efforts. The lead player makes the check and adds +1 for each helping player. All participants must spend an action, but successful Team-Ups can accomplish tasks that would be impossible alone."
    },
    {
      question: "What are Flomanjified conditions?",
      answer: "Flomanjified conditions are supernatural alterations that affect characters when exposed to too much Weirdness. These can grant both benefits and drawbacks, like 'Swamp Vision' allowing you to see through murky water but making bright light painful."
    },
    {
      question: "How does character progression work?",
      answer: "Characters earn Experience Points (XP) for completing mission objectives and surviving scenarios. XP can be spent to improve stats, learn new abilities, or remove negative conditions. Each mission typically awards 1-3 XP based on performance."
    },
    {
      question: "What happens if a character is knocked out?",
      answer: "When reduced to 0 Health, a character is knocked out and cannot take actions. Other players can spend an action to revive them with 1 Health. If all players are knocked out simultaneously, the mission ends in failure."
    },
    {
      question: "Can I replay missions?",
      answer: "Yes! Missions are designed to be highly replayable. Random event cards, different character combinations, and player choices create unique experiences each time. Some missions also have alternate objectives and endings to discover."
    },
    {
      question: "What's in the base game?",
      answer: "The base game includes 6 player characters, 120+ cards (including Hazards, Gear, and Events), custom dice, Heat and Weirdness trackers, character sheets, and 5 complete missions. Additional content expansions are planned for future release."
    },
    {
      question: "Is there a solo mode?",
      answer: "Yes, Flomanji includes comprehensive solo rules using the Automa system. This allows single players to experience the full game with automated opponent behavior and modified mission objectives specifically balanced for solo play."
    }
  ];

  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to know about surviving the supernatural chaos of 1987 Florida
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
