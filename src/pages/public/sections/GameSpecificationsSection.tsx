
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
