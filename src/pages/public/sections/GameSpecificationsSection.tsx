
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
      answer: "Flomanji is a semi-cooperative card-and-dice adventure game for 2-6 players. Set in a heightened 1987 Florida, it blends survival-horror tension with tongue-in-cheek 'Florida Man' absurdity. Players navigate supernatural threats while managing Heat and Weirdness levels in a cinematic B-movie horror-comedy atmosphere."
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
      answer: "The core gameplay revolves around a five-step loop: Draw Trouble, Take Two Actions, Chaos Strikes, Advance the Timers, and Repeat. For skill checks, players roll 2d6 + relevant stat + modifiers against Difficulty Classes (Easy DC 7, Standard DC 9, Hard DC 11, Heroic DC 13). The game features Heat and Weirdness tracking systems that drive the mounting tension."
    },
    {
      question: "What makes Flomanji unique?",
      answer: "Flomanji combines deck-building elements with survival horror in a unique 1987 Florida setting. The Heat and Weirdness mechanics create escalating tension, while the B-movie horror-comedy tone provides a perfect balance of thrills and humor. The modular region cards create a different map layout each playthrough."
    },
    {
      question: "What stats do characters have?",
      answer: "Characters have five main stats: Brawn (physical strength), Moxie (agility/speed), Charm (social interaction), Grit (mental toughness), and Weird Sense (supernatural awareness). They also track Health on a d6 (max 5), Weirdness on a d10, and Luck tokens which can be spent to boost rolls."
    },
    {
      question: "How does the Heat system work?",
      answer: "Heat represents mounting global danger. During the End Phase, Heat increases by +1 each round (or +2 if 4-6 players). If Heat reaches 10, the game ends in defeat. At Heat 9, all players gain +1 Weirdness each round. Heat can also increase from card effects, but never drops below the highest threshold crossed."
    },
    {
      question: "What actions can I take on my turn?",
      answer: "Each turn you have 2 Actions to spend. Options include: Move (go to adjacent Region), Use Gear (activate card ability), Interact (engage with NPCs or features), Team-Up (help another player), Rest (heal 1 Health or reduce 1 Weirdness in safe Regions), or Mission actions (advance objectives). Cards with lightning icons can be played as Reactions without using an Action."
    },
    {
      question: "What happens when I encounter hazards?",
      answer: "When facing hazards, players choose one of four approaches: Fight (Brawn check), Flee (Moxie check), Negotiate (Charm check), or Outsmart (Weird Sense check). The group rolls simultaneously, with each success adding +1 to the check outcome. If the total meets or exceeds the hazard's DC, it's overcome. Failure triggers consequences like damage, Weirdness gain, or Heat increase."
    },
    {
      question: "What happens when Weirdness increases?",
      answer: "As Weirdness increases, characters cross important thresholds: at 3 pips, you become Attuned (+1 on Weird checks); at 5 pips, you're Hallucinating (draw extra Gear on success but -1 Charm); at 7 pips, you're Paranoid (cannot Team-Up and -1 Action per turn); at 10 pips, you become Flomanjified (flip to your Flomanjified Role card)."
    },
    {
      question: "How do Team-Up actions work?",
      answer: "Team-Up actions allow multiple players to combine efforts. Each player spends 1 Action to participate. The lead player makes the check, and each additional helping player adds +1 to the result. Successful Team-Ups can accomplish tasks that would be impossible alone, making coordination essential for overcoming high-DC challenges."
    },
    {
      question: "What are Flomanjified conditions?",
      answer: "Flomanjified conditions are supernatural alterations that affect characters when exposed to too much Weirdness (10 pips). When Flomanjified, your character flips to a special role card with new abilities and drawbacks, like 'Swamp Zombie' or 'Toxic Wraith.' Some conditions grant benefits like seeing through murky water but make bright light painful."
    },
    {
      question: "How does damage and healing work?",
      answer: "Health is tracked via a d6, starting at 5. When taking damage, reduce your Health accordingly. At 0 Health, you become Incapacitated and cannot act. You can heal by: spending 1 Action to Rest in a safe Region (+1 Health), using Food or First Aid consumables, or through certain NPC encounters. If taking damage while at 0 Health, you're eliminated."
    },
    {
      question: "What happens if a character is knocked out?",
      answer: "When reduced to 0 Health, a character becomes Incapacitated—they drop all Gear, cannot take actions, and may only crawl 1 Region per turn. Other players can spend 1 Action to revive them with 1 Health. If all players are Incapacitated simultaneously, the mission ends in failure."
    },
    {
      question: "How do I win or lose the game?",
      answer: "Victory comes from completing all Primary Objectives and reaching the Extraction Region before Heat reaches 10. The game ends in defeat if Heat reaches 10, or if all un-Flomanjified Survivors are eliminated. Some missions may have additional win or loss conditions specified on the Mission sheet."
    },
    {
      question: "Can missions be linked together?",
      answer: "Yes! While Flomanji shines as a one-shot game, the rules include Campaign Play options. Escaped Survivors carry over Gear and half their Luck. Each campaign failure adds +1 to the next Mission's starting Heat. You can earn Treasure Points to unlock boons, heal scars, purchase Gear, or access Advanced Character Boards."
    },
    {
      question: "What's in the base game?",
      answer: "The base game includes 6 player characters, 80+ Main Deck cards (Gear, Hazards, NPCs, Events), 30 Chaos cards, 20 Treasure & Artifact cards, 38 Region cards, 17 NPC cards, 9 Flomanjified Role cards, 8 Secret Objective cards (for the Traitor variant), custom dice, Heat and Weirdness trackers, and 5 complete missions."
    },
    {
      question: "Is there a solo mode?",
      answer: "Yes, Flomanji includes comprehensive solo rules using the Automa system. The 30-card Automa deck provides AI instructions that simulate a partner, allowing single players to experience the full game with automated opponent behavior and modified objectives specifically balanced for solo play."
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
