
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { v4 as uuidv4 } from "uuid";

export const FLOMANJI_PLAYER_CHARACTERS: PlayerCharacterCard[] = [
  {
    id: "chad-brogan",
    name: "Chadwick \"Chad\" Brogan III",
    type: "player-character",
    role: "The Spring Breaker",
    stats: {
      brawn: 2,
      moxie: 2,
      charm: 4, 
      grit: 1,
      weirdSense: 2
    },
    ability: {
      name: "Party Foul Insurance & Can I Crash Here?",
      description: "Once per game, after failing a Luck check prompted by the Goblet, Chad may declare \"My Bad!\" to reroll it. Also, once per game, when entering a Suburban or Coastal region, Chad may make a Charm check (DC 4). Success allows him to immediately Rest (Heal 1 Damage or Reduce Weirdness by 1) for free, even if Hazards are present."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Leaking Beer Koozie",
        type: "Tool",
        effect: "+1 to Social checks with other Spring Breakers"
      },
      {
        name: "Cracked Sunglasses (Designer Knockoff)",
        type: "Equipment",
        effect: "Reduce sunlight penalties by 1"
      },
      {
        name: "Dad's Credit Card (Declined)",
        type: "Tool",
        effect: "Once per game, attempt to make a purchase (Luck DC 5)"
      },
      {
        name: "Single Flip-Flop (Left)",
        type: "Equipment",
        effect: "-1 to Movement checks but +1 on Beach-related checks"
      },
      {
        name: "Faded Wristband (VIP Access?)",
        type: "Tool",
        effect: "May attempt to bluff access into restricted areas (Charm check)"
      }
    ],
    flavor: "Dude! Flomanji! Totally epic waves... wait, this is a swamp? And that gator's got my cooler? Bogus!",
    imagePrompt: "Photorealistic portrait of a young man (Chad), sunburnt, wearing board shorts and a slightly bewildered expression. Background is a mix of beach party remnants and encroaching swamp vines. Focus on misplaced confidence."
  },
  {
    id: "brenda-mcnulty",
    name: "Brenda McNulty",
    type: "player-character",
    role: "HOA Enforcer, Suspended",
    stats: {
      brawn: 2,
      moxie: 3,
      charm: 5,
      grit: 3,
      weirdSense: 1
    },
    ability: {
      name: "Cite Violation! & Find the Loophole",
      description: "Once per game, when facing an NPC in an Urban or Suburban region, Brenda may make a Charm check (DC 5). Success allows her to intimidate the NPC into retreating or offering a minor boon. Also, when Brenda fails a Stat Check related to a Hazard specifically labeled 'Bureaucracy' or 'Social', she may spend 1 Grit to reroll the check."
    },
    health: 5,
    weirdness: 0,
    luck: 1,
    starterGear: [
      {
        name: "Clipboard of Judgment",
        type: "Tool",
        effect: "+1 to Intimidation checks against NPCs"
      },
      {
        name: "Measuring Tape (Laser Precision)",
        type: "Tool",
        effect: "Can accurately measure distances up to 50ft"
      },
      {
        name: "Rulebook (Heavily Annotated)",
        type: "Tool",
        effect: "+1 to checks involving rules or regulations"
      },
      {
        name: "Sensible Shoes (Orthopedic)",
        type: "Equipment",
        effect: "+1 to Endurance checks related to walking"
      },
      {
        name: "Nametag ('Brenda - Compliance Officer')",
        type: "Equipment",
        effect: "+1 to Authority checks with civilians"
      }
    ],
    flavor: "Regulation 7C clearly states all existential threats must be pre-approved by the architectural review board! This state is completely out of compliance!",
    imagePrompt: "Photorealistic portrait of a middle-aged woman (Brenda) with a stern expression, wearing a slightly-too-official polo shirt. She's holding a clipboard like a weapon. Background is a pristine but eerie suburban street. Focus on authority."
  },
  {
    id: "mortimer-quigley",
    name: "Mortimer \"Mort\" Quigley",
    type: "player-character",
    role: "Cryptid Hunter",
    stats: {
      brawn: 1,
      moxie: 2,
      charm: 1,
      grit: 3,
      weirdSense: 5
    },
    ability: {
      name: "I Believe! & Track the Unknown",
      description: "Mort gains +1 on all Stat Checks involving Hazards or NPCs labeled with 'Weirdness', 'Animal', or 'Mystery' icons. Also, once per game, Mort may spend 1 Action to make a Luck check (DC 4). Success reveals the location of the nearest 'Cryptid' or 'Mystery' related NPC or Event."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Blurry Photograph (Evidence?)",
        type: "Tool",
        effect: "+1 to checks when convincing others about cryptids"
      },
      {
        name: "Night Vision Goggles (Battery Low)",
        type: "Equipment",
        effect: "2 uses: See in darkness for one scene"
      },
      {
        name: "Plaster Cast Kit (Bigfoot Print?)",
        type: "Tool",
        effect: "Create evidence of creature encounters"
      },
      {
        name: "Tinfoil Hat (Standard Issue)",
        type: "Equipment",
        effect: "+1 resistance to mind-affecting Weirdness"
      },
      {
        name: "Journal of Sightings (Mostly Raccoons)",
        type: "Tool",
        effect: "+1 to Knowledge checks about local fauna"
      }
    ],
    flavor: "The Skunk Ape is real! The Mothman vacations here! The signs are everywhere... you just need the right kind of eyes... and maybe this blurry photo.",
    imagePrompt: "Photorealistic portrait of a man (Mort) with wide, slightly manic eyes, wearing outdoor gear and holding a strange device. Background is a dark, misty swamp or forest. Focus on earnest belief."
  },
  {
    id: "swamp-mama-jolene",
    name: "\"Swamp Mama\" Jolene",
    type: "player-character",
    role: "Gator Wrangler & Herbalist",
    stats: {
      brawn: 3,
      moxie: 5,
      charm: 2,
      grit: 4,
      weirdSense: 1
    },
    ability: {
      name: "Gator Grip & Swamp Remedy",
      description: "Jolene gains +1 on all Moxie or Grit checks involving 'Gator' or 'Animal Handling' Hazards. Also, once per game, Jolene may spend 1 Action and discard 1 Gear card with a 'Plant' or 'Natural' keyword to allow herself or another player in her Region to Heal 2 Damage OR remove one 'Poisoned' or 'Sick' status effect."
    },
    health: 5,
    weirdness: 0,
    luck: 2,
    starterGear: [
      {
        name: "Wranglin' Rope (Frayed)",
        type: "Tool",
        effect: "+1 to Animal Handling checks, especially with gators"
      },
      {
        name: "Herbal Poultice (Smells Funny)",
        type: "Consumable",
        effect: "Heal 1 damage or neutralize minor poison"
      },
      {
        name: "Sturdy Waders (Patched)",
        type: "Equipment",
        effect: "Move through swampy terrain without penalty"
      },
      {
        name: "Gator Tooth (Lucky Charm)",
        type: "Artifact",
        effect: "+1 to Luck checks involving animals or swamp hazards"
      },
      {
        name: "Wide-Brimmed Hat (Sweat-Stained)",
        type: "Equipment",
        effect: "+1 resistance to sun-related hazards"
      }
    ],
    flavor: "Ain't nothin' in this swamp scares me more'n tax season. Now, hold still while I wrassle this here reptile... or brew ya somethin' for that rash.",
    imagePrompt: "Photorealistic portrait of a tough, weathered woman (Jolene) with determined eyes, perhaps with a coil of rope over her shoulder or holding herbs. Background is a dense swamp environment. Focus on resilience."
  },
  {
    id: "sheldon-goldstein",
    name: "Sheldon \"Shelly\" Goldstein",
    type: "player-character",
    role: "Snowbird Retiree",
    stats: {
      brawn: 1,
      moxie: 1,
      charm: 4,
      grit: 2,
      weirdSense: 2
    },
    ability: {
      name: "I Know People & Kvetch for Relief",
      description: "Once per game, Shelly may automatically succeed on one Charm Check (DC 5 or lower) against an NPC in an Urban or Suburban region. Also, once per game, Shelly may spend 1 Action to complain loudly about the situation. The Goblet sighs and reduces the global Heat track by 1, but Shelly gains 1 Weirdness from the stress."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Slightly Damp Bingo Card (Lucky Dauber)",
        type: "Tool",
        effect: "+1 to Luck checks in social situations"
      },
      {
        name: "Reading Glasses (Prescription Strength)",
        type: "Equipment",
        effect: "+1 to perception checks for small details"
      },
      {
        name: "Coupon Clippers (Extreme Saver Edition)",
        type: "Tool",
        effect: "Reduce cost of one purchase by 1"
      },
      {
        name: "Portable Oxygen Tank (Personal Reserve)",
        type: "Equipment",
        effect: "+1 to Grit checks involving exertion or air quality"
      },
      {
        name: "Early Bird Dinner Reservation (Still Honored?!)",
        type: "Tool",
        effect: "Once per game, reduce Heat by 1 in suburban regions"
      }
    ],
    flavor: "Left New York for sunshine and early bird specials. Found... this Flomanji chaos instead. Oy vey. Where's the shuffleboard court?",
    imagePrompt: "Photorealistic portrait of an elderly man (Shelly), maybe in a slightly-too-loud Flomanji shirt and khaki shorts. He looks exasperated but shrewd, perhaps adjusting his glasses. Background is a sunny but slightly chaotic Flomanji suburban scene. Focus on his personality."
  },
  {
    id: "darryl-jones",
    name: "Darryl \"Pixel\" Jones",
    type: "player-character",
    role: "Disgruntled Theme Park Employee",
    stats: {
      brawn: 2,
      moxie: 4,
      charm: 1,
      grit: 5,
      weirdSense: 1
    },
    ability: {
      name: "Crowd Control & I Quit!",
      description: "Darryl gains +1 on Moxie or Grit checks made to navigate or endure Hazards involving 'Crowds', 'Mobs', or 'Tourists'. Also, once per game, when facing an overwhelming situation, Darryl may declare \"I Quit!\". He ignores all Hazards in his current region for this turn but suffers -1 Charm permanently."
    },
    health: 5,
    weirdness: 0,
    luck: 2,
    starterGear: [
      {
        name: "Stained Character Suit Head",
        type: "Equipment",
        effect: "+2 intimidation against children, -1 against adults"
      },
      {
        name: "Spill-Proof Tumbler (Empty)",
        type: "Container",
        effect: "Can store one liquid safely"
      },
      {
        name: "Park Map (Secret Shortcuts)",
        type: "Tool",
        effect: "+1 to Navigation checks in theme park-like areas"
      },
      {
        name: "Employee ID Badge (Revoked)",
        type: "Tool",
        effect: "May attempt to bluff employee status (Charm check)"
      },
      {
        name: "Smile Muscles (Overused)",
        type: "Special",
        effect: "+1 to resist intimidation, -1 to genuine charm"
      }
    ],
    flavor: "Smile! Wave! Pretend that giant mosquito isn't draining your life force! After dealing with tourists all day, Flomanji is almost relaxing.",
    imagePrompt: "Photorealistic portrait of a tired-looking person (Darryl) in a partially removed, goofy theme park costume. Their expression is a mix of exhaustion and simmering rage. Background is a stylized, slightly nightmarish theme park setting. Focus on burnout."
  },
  {
    id: "rexford-grimes",
    name: "Rexford \"Rex\" Grimes",
    type: "player-character",
    role: "Survivalist Prepper",
    stats: {
      brawn: 2,
      moxie: 3,
      charm: 1,
      grit: 5,
      weirdSense: 1
    },
    ability: {
      name: "Always Prepared & Field Crafting",
      description: "Rex starts the game with one additional random Gear card. Also, once per game, Rex may spend 1 Action and discard 2 Gear cards to immediately draw 1 Treasure & Artifact card."
    },
    health: 5,
    weirdness: 0,
    luck: 3,
    starterGear: [
      {
        name: "Spork (Tactical Titanium)",
        type: "Tool",
        effect: "Multipurpose eating utensil, minor digging tool"
      },
      {
        name: "Water Purification Tablets (Expired?)",
        type: "Consumable",
        effect: "3 uses: Purify water source (50% chance of working)"
      },
      {
        name: "Paracord Bracelet (50ft)",
        type: "Tool",
        effect: "Can be unwound for 50ft of strong cord"
      },
      {
        name: "Camo Bandana",
        type: "Equipment",
        effect: "+1 to stealth checks in wilderness"
      },
      {
        name: "Survival Manual (Waterlogged)",
        type: "Tool",
        effect: "+1 to wilderness survival knowledge checks"
      }
    ],
    flavor: "Knew it! Knew this day would come! Flomanji Rising! Good thing I buried those MREs... now where did I put that shovel?",
    imagePrompt: "Photorealistic portrait of a rugged individual (Rex) wearing practical gear, maybe a bit paranoid-looking. Background is a cluttered garage or bunker filled with survival supplies. Focus on preparedness."
  },
  {
    id: "tiffany-monroe",
    name: "Tiffany \"Tiff\" Monroe",
    type: "player-character",
    role: "Instagram Influencer",
    stats: {
      brawn: 1,
      moxie: 1,
      charm: 5,
      grit: 1,
      weirdSense: 2
    },
    ability: {
      name: "Do It For The 'Gram! & Sponsored Content",
      description: "Once per game, Tiff can attempt to distract an NPC or non-animal Hazard by taking a selfie with it. \"Shake Charm, DC 4.\" Success = The Hazard/NPC is momentarily confused; ignore its effects for this turn. Failure = Gain 1 Weirdness. Also, when Tiff draws a Gear card with a 'Food', 'Luxury', or 'Fashion' keyword, she may immediately gain +1 Luck for her next check."
    },
    health: 5,
    weirdness: 0,
    luck: 4,
    starterGear: [
      {
        name: "Selfie Stick (Extended)",
        type: "Tool",
        effect: "+1 to social media related checks"
      },
      {
        name: "Ring Light (Battery Dying)",
        type: "Tool",
        effect: "2 uses: Provide light in darkness or +1 to appearance checks"
      },
      {
        name: "Portable Charger (Also Dying)",
        type: "Tool",
        effect: "2 uses: Recharge one electronic item"
      },
      {
        name: "Branded Water Bottle (Empty)",
        type: "Container",
        effect: "Can store water or other liquid"
      },
      {
        name: "Perfectly Applied Makeup (Sweating Off)",
        type: "Equipment",
        effect: "+1 to first impression Charm checks"
      }
    ],
    flavor: "#FlomanjiLife #Survivor #NoFilter #SponsoredByPanic! OMG, you guys, this lighting is terrible for my aesthetic, but the existential dread is kinda trending?",
    imagePrompt: "Photorealistic portrait of a young woman (Tiffany) striking a pose for a selfie amidst chaos. She looks slightly panicked but is trying to maintain her influencer smile. Background is a visually striking but dangerous Flomanji location (e.g., edge of a sinkhole, picturesque but gator-filled swamp). Focus on curated reality vs. harsh reality."
  },
  {
    id: "lenny-harper",
    name: "Lenny \"Scoop\" Harper",
    type: "player-character",
    role: "Local Blogger / Journalist",
    stats: {
      brawn: 1,
      moxie: 3,
      charm: 3,
      grit: 2,
      weirdSense: 3
    },
    ability: {
      name: "Get the Scoop & Deadline Pressure",
      description: "Once per game, after successfully interacting with an NPC, Lenny may ask the Goblet one additional question about the NPC's knowledge. The Goblet provides a brief, potentially cryptic answer. Also, when the global Heat track reaches 5 or higher, Lenny gains +1 on all Moxie checks."
    },
    health: 5,
    weirdness: 0,
    luck: 4,
    starterGear: [
      {
        name: "Voice Recorder (Low Battery)",
        type: "Tool",
        effect: "2 uses: Record conversations for later reference"
      },
      {
        name: "Steno Pad (Coffee Stained)",
        type: "Tool",
        effect: "+1 to memory checks about recorded information"
      },
      {
        name: "Fedora (Slightly Crooked)",
        type: "Equipment",
        effect: "+1 to journalism-related Charm checks"
      },
      {
        name: "Camera with Cracked Lens",
        type: "Tool",
        effect: "Can take photos as evidence (80% clear)"
      },
      {
        name: "Press Pass (Expired)",
        type: "Tool",
        effect: "May attempt to access restricted areas (Charm check)"
      }
    ],
    flavor: "This is bigger than the county fair scandal! 'Flomanji Phenomenon Baffles Experts!' Just gotta get the story... and maybe survive to post it.",
    imagePrompt: "Photorealistic portrait of a determined-looking person (Lenny) holding a notepad and pen, maybe looking slightly harried. Background is a chaotic scene they are trying to document (e.g., aftermath of a Hazard, a strange Event). Focus on investigative drive."
  }
];

/**
 * Get all Flomanji player character cards
 * @returns Array of PlayerCharacterCard objects
 */
export const getAllFlomanjiPlayerCharacters = (): PlayerCharacterCard[] => {
  return FLOMANJI_PLAYER_CHARACTERS.map(card => ({
    ...card,
    id: card.id || uuidv4()
  }));
};

/**
 * Get a Flomanji player character by ID
 * @param id The character ID to find
 * @returns The character card or undefined if not found
 */
export const getFlomanjiPlayerCharacterById = (id: string): PlayerCharacterCard | undefined => {
  return FLOMANJI_PLAYER_CHARACTERS.find(card => card.id === id);
};

/**
 * Export all Flomanji player character cards for use in other modules
 */
export { FLOMANJI_PLAYER_CHARACTERS };

