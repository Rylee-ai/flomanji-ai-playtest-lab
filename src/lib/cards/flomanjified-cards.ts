
import { FlomanjifiedRoleCard } from '@/types/cards/flomanjified';
import { v4 as uuidv4 } from 'uuid';

// Define the flomanjified role cards
export const FLOMANJIFIED_CARDS: FlomanjifiedRoleCard[] = [
  {
    id: uuidv4(),
    name: "Chaotic Chad",
    type: "flomanjified",
    originalRole: "The Spring Breaker",
    chaosAction: "When Chad becomes Flomanjified, he throws an impromptu beach party regardless of the environment. All players within his region must make a Charm check (DC 4) or lose 1 Action dealing with his antics.",
    specialAbility: "Frat House Energy: Once per game, Chad can convert any hazard into a temporary ally for one round by challenging it to a drinking contest.",
    description: "Chad's carefree and reckless attitude has been amplified by the chaos energies of Flomanji, turning his party vibes into reality-warping festivities.",
    icons: [
      { symbol: "🏄", meaning: "Beach Culture" },
      { symbol: "🌀", meaning: "Chaos Energy" }
    ],
    keywords: ["flomanjified", "party", "reality-warping", "spring break"],
    flavor: "DUDES! This is TOTALLY the most epic Spring Break EVER! The trees are dancing, the alligators are wearing sunglasses, and I think that palm tree just asked me for my number!",
    imagePrompt: "A surfer-type guy glowing with strange energy, beach attire partly transformed into weird vegetation, surrounded by partying wildlife and animated beach toys."
  },
  {
    id: uuidv4(),
    name: "HOAzilla",
    type: "flomanjified",
    originalRole: "HOA Enforcer",
    chaosAction: "HOAzilla stomps through the region measuring infractions with laser-precise vision. Every player in the region must discard one Gear card or suffer 1 damage from a citation storm.",
    specialAbility: "Regulatory Nightmare: Can transform any region into a 'Regulated Zone' for one round. All actions in that zone require an additional Charm or Moxie check (DC 3).",
    description: "Brenda's obsession with rules has merged with Flomanji's chaos, creating a towering manifestation of bureaucratic nightmares made flesh.",
    icons: [
      { symbol: "📋", meaning: "Bureaucracy" },
      { symbol: "👹", meaning: "Monster" }
    ],
    keywords: ["flomanjified", "bureaucracy", "rules", "enforcement"],
    flavor: "SECTION 7.3.2 CLEARLY STATES NO SURVIVAL ACTIVITIES AFTER 8PM! YOUR TENT COLOR IS NOT PRE-APPROVED! YOUR SCREAMS OF TERROR EXCEED NOISE ORDINANCES!",
    imagePrompt: "A monstrous figure resembling a middle-aged woman in business attire grown to kaiju proportions, wielding a giant clipboard like a weapon, surrounded by a storm of regulatory documents and warning notices."
  },
  {
    id: uuidv4(),
    name: "The Believer",
    type: "flomanjified",
    originalRole: "Cryptid Hunter",
    chaosAction: "The Believer emits a pulse of weird energy that warps reality. Each player must make a Weird Sense check (DC 4) or gain 1 Weirdness as their perception of reality temporarily fractures.",
    specialAbility: "I Told You So: Once per game, can summon a minor cryptid to assist the party. The cryptid provides +1 to all players' next Stat Check but then vanishes.",
    description: "Mort's belief in the paranormal has attracted Flomanji's attention, turning him into a beacon for the very weird phenomena he sought to document.",
    icons: [
      { symbol: "👣", meaning: "Cryptid" },
      { symbol: "🌌", meaning: "Dimensional Anomaly" }
    ],
    keywords: ["flomanjified", "cryptid", "paranormal", "reality-bending"],
    flavor: "I'VE BECOME THE EVIDENCE! MY SKIN IS DOCUMENTING INTERDIMENSIONAL FREQUENCIES! THE TRUTH ISN'T OUT THERE—IT'S IN HERE! *thumps chest which makes an echo like a vast empty cavern*",
    imagePrompt: "A wide-eyed researcher whose body is partially transparent revealing star-like energy within, floating slightly above the ground, with strange cryptid-like appendages occasionally phasing into view around him, surrounded by floating cameras and research equipment."
  },
  {
    id: uuidv4(),
    name: "Swamp Colossus",
    type: "flomanjified",
    originalRole: "Gator Wrangler & Herbalist",
    chaosAction: "Swamp Colossus merges with the local plant life, creating a temporary swamp in her region. All players must make a Grit check (DC 4) or become Tangled, losing 1 Action next turn.",
    specialAbility: "Herbal Explosion: Once per game, can create a burst of healing spores. All players in her region recover 1 Health but must make a Luck check (DC 3) or gain 1 Weirdness.",
    description: "Jolene's connection to the swamp has been amplified by Flomanji's magic, literally making her one with the wetlands she calls home.",
    icons: [
      { symbol: "🌿", meaning: "Plant Hybrid" },
      { symbol: "💦", meaning: "Swamp Power" }
    ],
    keywords: ["flomanjified", "swamp", "plant", "healer"],
    flavor: "THE SWAMP AIN'T JUST MY HOME NO MORE—IT'S MY BODY AND SOUL! YA'LL COME GET THESE HEALIN' HERBS 'FORE I FORGET WHICH VINES ARE ME AND WHICH AIN'T!",
    imagePrompt: "A woman whose lower body has transformed into a mass of cypress roots and swamp vegetation, with alligators swimming around her as if she were a living ecosystem. Her arms are vine-like, and Spanish moss grows from her hair. She cradles glowing healing herbs in her hands."
  },
  {
    id: uuidv4(),
    name: "The Eternal Complainer",
    type: "flomanjified",
    originalRole: "Snowbird Retiree",
    chaosAction: "The Eternal Complainer launches into a tirade so potent it briefly warps reality. All players must make a Grit check (DC 3) or lose their next Action covering their ears.",
    specialAbility: "Back In My Day: Once per game, can temporarily revert a region to a 'safer' version of itself for one round, removing all active Hazards (they return the following round).",
    description: "Shelly's gift for complaint has been weaponized by Flomanji's magic, giving his words the power to actually change reality—though rarely in useful ways.",
    icons: [
      { symbol: "👴", meaning: "Elder" },
      { symbol: "🔊", meaning: "Sonic Power" }
    ],
    keywords: ["flomanjified", "complainer", "reality-altering", "nostalgia"],
    flavor: "THIS ISN'T HOW FLORIDA WAS IN 1975! THE COSMIC HORROR WAS MUCH MORE POLITE BACK THEN! AND THE DIMENSIONAL RIFTS OPENED AT REASONABLE HOURS!",
    imagePrompt: "An elderly man floating slightly above a rocking chair, mouth open impossibly wide as sound waves visibly emanate from him, surrounded by flickering reality that shifts between modern day and a 1970s version with each complaint."
  }
];

// Helper function to retrieve flomanjified cards
export const getFlomanjifiedCards = (): FlomanjifiedRoleCard[] => {
  return FLOMANJIFIED_CARDS;
};

// Helper function to get a specific flomanjified card by ID
export const getFlomanjifiedCardById = (id: string): FlomanjifiedRoleCard | undefined => {
  return FLOMANJIFIED_CARDS.find(card => card.id === id);
};
