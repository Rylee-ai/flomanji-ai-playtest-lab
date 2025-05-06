
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { log } from "@/utils/logging";

// Collection of Player Character cards for Flomanji
export const PLAYER_CHARACTER_CARDS: PlayerCharacterCard[] = [
  {
    id: "chad-brogan-iii",
    name: "CHADWICK \"CHAD\" BROGAN III",
    type: "player-character",
    role: "The Spring Breaker",
    flavor: "\"Dude! Flomanji! Totally epic waves... wait, this is a swamp? And that gator's got my cooler? Bogus!\"",
    stats: {
      brawn: 3, // Default Brawn value
      moxie: 2,
      charm: 4,
      grit: 1,
      weirdSense: 0
    },
    ability: {
      name: "Party Foul Insurance & Can I Crash Here?",
      description: "Once per game, after failing a Luck check prompted by the Goblet, Chad may declare \"My Bad!\" to reroll it. Additionally, once per game when entering a Suburban or Coastal region, Chad may make a Charm check (DC 4). Success allows him to immediately Rest (Heal 1 Damage or Reduce Weirdness by 1) for free, even if Hazards are present."
    },
    health: 10,
    weirdness: 0,
    luck: 5,
    icons: [],
    keywords: ["Spring Breaker", "Tourist", "Party"],
    rules: ["Once per game, after failing a Luck check prompted by the Goblet, Chad may declare \"My Bad!\" to reroll it.", 
           "Once per game, when entering a Suburban or Coastal region, Chad may make a Charm check (DC 4). Success allows him to immediately Rest (Heal 1 Damage or Reduce Weirdness by 1) for free, even if Hazards are present."],
    imagePrompt: "Photorealistic portrait of a young man (Chad), sunburnt, wearing board shorts and a slightly bewildered expression. Background is a mix of beach party remnants and encroaching swamp vines. Focus on misplaced confidence.",
    starterGear: [
      { name: "Leaking Beer Koozie", type: "Tool", effect: "May be used to keep one beverage cold for an unnaturally long time." },
      { name: "Cracked Sunglasses (Designer Knockoff)", type: "Accessory", effect: "+1 Charm when interacting with NPCs labeled 'Tourist' or 'Party'." },
      { name: "Dad's Credit Card (Declined)", type: "Tool", effect: "Once per game, may be used to attempt a bribe. 50% chance of success." },
      { name: "Single Flip-Flop (Left)", type: "Footwear", effect: "Makes a surprisingly effective weapon against small Hazards." },
      { name: "Faded Wristband (VIP Access?)", type: "Accessory", effect: "May provide access to restricted areas in Urban regions." }
    ]
  },
  {
    id: "brenda-mcnulty",
    name: "BRENDA MCNULTY",
    type: "player-character",
    role: "HOA Enforcer, Suspended",
    flavor: "\"Regulation 7C clearly states all existential threats must be pre-approved by the architectural review board! This state is completely out of compliance!\"",
    stats: {
      brawn: 3, // Default Brawn value
      moxie: 3,
      charm: 5,
      grit: 3,
      weirdSense: 0
    },
    ability: {
      name: "Cite Violation! & Find the Loophole",
      description: "Once per game, when facing an NPC in an Urban or Suburban region, Brenda may make a Charm check (DC 5). Success allows her to intimidate the NPC into retreating or offering a minor boon. Additionally, when Brenda fails a Stat Check related to a Hazard labeled 'Bureaucracy' or 'Social', she may spend 1 Grit to reroll the check."
    },
    health: 10,
    weirdness: 0,
    luck: 1,
    icons: [],
    keywords: ["HOA", "Bureaucrat", "Authority"],
    rules: [
      "Once per game, when facing an NPC in an Urban or Suburban region, Brenda may make a Charm check (DC 5). Success allows her to intimidate the NPC into retreating or offering a minor boon.",
      "When Brenda fails a Stat Check related to a Hazard specifically labeled 'Bureaucracy' or 'Social', she may spend 1 Grit to reroll the check."
    ],
    imagePrompt: "Photorealistic portrait of a middle-aged woman (Brenda) with a stern expression, wearing a slightly-too-official polo shirt. She's holding a clipboard like a weapon. Background is a pristine but eerie suburban street. Focus on authority.",
    starterGear: [
      { name: "Clipboard of Judgment", type: "Tool", effect: "+1 Charm when intimidating NPCs in Urban or Suburban regions." },
      { name: "Measuring Tape (Laser Precision)", type: "Tool", effect: "Can be used to detect if something is 'not up to code'." },
      { name: "Rulebook (Heavily Annotated)", type: "Reference", effect: "+1 on checks involving bureaucracy or regulations." },
      { name: "Sensible Shoes (Orthopedic)", type: "Footwear", effect: "Reduces movement penalties in difficult terrain." },
      { name: "Nametag ('Brenda - Compliance Officer')", type: "Accessory", effect: "+2 Charm when dealing with authority figures." }
    ]
  },
  {
    id: "mortimer-quigley",
    name: "MORTIMER \"MORT\" QUIGLEY",
    type: "player-character",
    role: "Cryptid Hunter",
    flavor: "\"The Skunk Ape is real! The Mothman vacations here! The signs are everywhere... you just need the right kind of eyes... and maybe this blurry photo.\"",
    stats: {
      brawn: 3, // Default Brawn value
      moxie: 2,
      charm: 1,
      grit: 3,
      weirdSense: 0
    },
    ability: {
      name: "I Believe! & Track the Unknown",
      description: "Mort gains +1 on all Stat Checks involving Hazards or NPCs labeled with 'Weirdness', 'Animal', or 'Mystery' icons. Once per game, Mort may spend 1 Action to make a Luck check (DC 4). Success reveals the location of the nearest 'Cryptid' or 'Mystery' related NPC or Event."
    },
    health: 10,
    weirdness: 0,
    luck: 5,
    icons: [],
    keywords: ["Cryptid Hunter", "Believer", "Investigator"],
    rules: [
      "Mort gains +1 on all Stat Checks involving Hazards or NPCs labeled with 'Weirdness', 'Animal', or 'Mystery' icons.",
      "Once per game, Mort may spend 1 Action to make a Luck check (DC 4). Success reveals the location (adjacent or current region) of the nearest 'Cryptid' or 'Mystery' related NPC or Event."
    ],
    imagePrompt: "Photorealistic portrait of a man (Mort) with wide, slightly manic eyes, wearing outdoor gear and holding a strange device. Background is a dark, misty swamp or forest. Focus on earnest belief.",
    starterGear: [
      { name: "Blurry Photograph (Evidence?)", type: "Tool", effect: "When shown to certain NPCs, may reveal hidden information about local mysteries." },
      { name: "Night Vision Goggles (Battery Low)", type: "Tool", effect: "Allows partial visibility in dark regions for limited time." },
      { name: "Plaster Cast Kit (Bigfoot Print?)", type: "Tool", effect: "Can be used to create evidence of cryptid encounters." },
      { name: "Tinfoil Hat (Standard Issue)", type: "Headwear", effect: "Provides protection against certain 'Mental' hazards." },
      { name: "Journal of Sightings (Mostly Raccoons)", type: "Reference", effect: "Contains useful information about local cryptids and their habitats." }
    ]
  },
  {
    id: "swamp-mama-jolene",
    name: "\"SWAMP MAMA\" JOLENE",
    type: "player-character",
    role: "Gator Wrangler & Herbalist",
    flavor: "\"Ain't nothin' in this swamp scares me more'n tax season. Now, hold still while I wrassle this here reptile... or brew ya somethin' for that rash.\"",
    stats: {
      brawn: 3, // Default Brawn value
      moxie: 5,
      charm: 2,
      grit: 4,
      weirdSense: 0
    },
    ability: {
      name: "Gator Grip & Swamp Remedy",
      description: "Jolene gains +1 on all Moxie or Grit checks involving 'Gator' or 'Animal Handling' Hazards. Once per game, Jolene may spend 1 Action and discard 1 Gear card with a 'Plant' or 'Natural' keyword to allow herself or another player in her Region to Heal 2 Damage OR remove one 'Poisoned' or 'Sick' status effect."
    },
    health: 10,
    weirdness: 0,
    luck: 2,
    icons: [],
    keywords: ["Gator Wrangler", "Herbalist", "Local"],
    rules: [
      "Jolene gains +1 on all Moxie or Grit checks involving 'Gator' or 'Animal Handling' Hazards.",
      "Once per game, Jolene may spend 1 Action and discard 1 Gear card with a 'Plant' or 'Natural' keyword to allow herself or another player in her Region to Heal 2 Damage OR remove one 'Poisoned' or 'Sick' status effect."
    ],
    imagePrompt: "Photorealistic portrait of a tough, weathered woman (Jolene) with determined eyes, perhaps with a coil of rope over her shoulder or holding herbs. Background is a dense swamp environment. Focus on resilience.",
    starterGear: [
      { name: "Wranglin' Rope (Frayed)", type: "Tool", effect: "Can be used to temporarily restrain animal Hazards." },
      { name: "Herbal Poultice (Smells Funny)", type: "Consumable", effect: "Heals 1 Damage when applied." },
      { name: "Sturdy Waders (Patched)", type: "Clothing", effect: "Reduces movement penalties in water and swamp terrain." },
      { name: "Gator Tooth (Lucky Charm)", type: "Accessory", effect: "+1 Luck when dealing with animal hazards." },
      { name: "Wide-Brimmed Hat (Sweat-Stained)", type: "Headwear", effect: "Provides protection against sun-related environmental effects." }
    ]
  },
  {
    id: "sheldon-goldstein",
    name: "SHELDON \"SHELLY\" GOLDSTEIN",
    type: "player-character",
    role: "Snowbird Retiree",
    flavor: "\"Left New York for sunshine and early bird specials. Found... this Flomanji chaos instead. Oy vey. Where's the shuffleboard court?\"",
    stats: {
      brawn: 3, // Default Brawn value
      moxie: 1,
      charm: 4,
      grit: 2,
      weirdSense: 0
    },
    ability: {
      name: "I Know People & Kvetch for Relief",
      description: "Once per game, Shelly may automatically succeed on one Charm Check (DC 5 or lower) against an NPC in an Urban or Suburban region. Once per game, Shelly may spend 1 Action to complain loudly about the situation. The Goblet sighs and reduces the global Heat track by 1, but Shelly gains 1 Weirdness from the stress."
    },
    health: 10,
    weirdness: 0,
    luck: 5,
    icons: [],
    keywords: ["Retiree", "Snowbird", "Social"],
    rules: [
      "Once per game, Shelly may automatically succeed on one Charm Check (DC 5 or lower) against an NPC in an Urban or Suburban region (Declare \"My nephew Morty knows the owner!\").",
      "Once per game, Shelly may spend 1 Action to complain loudly about the situation. The Goblet sighs and reduces the global Heat track by 1, but Shelly gains 1 Weirdness from the stress."
    ],
    imagePrompt: "Photorealistic portrait of an elderly man (Shelly), maybe in a slightly-too-loud Flomanji shirt and khaki shorts. He looks exasperated but shrewd, perhaps adjusting his glasses. Background is a sunny but slightly chaotic Flomanji suburban scene. Focus on his personality.",
    starterGear: [
      { name: "Slightly Damp Bingo Card (Lucky Dauber)", type: "Tool", effect: "Can be used for minor luck-based benefits." },
      { name: "Reading Glasses (Prescription Strength)", type: "Accessory", effect: "Allows detailed inspection of small objects." },
      { name: "Coupon Clippers (Extreme Saver Edition)", type: "Tool", effect: "Can reduce the 'cost' of certain actions in Urban regions." },
      { name: "Portable Oxygen Tank (Personal Reserve)", type: "Medical", effect: "Can be used to recover from certain environmental hazards." },
      { name: "Early Bird Dinner Reservation (Still Honored?!)", type: "Social", effect: "Provides safe access to certain Urban locations during evening hours." }
    ]
  },
  {
    id: "darryl-jones",
    name: "DARRYL \"PIXEL\" JONES",
    type: "player-character",
    role: "Disgruntled Theme Park Employee",
    flavor: "\"Smile! Wave! Pretend that giant mosquito isn't draining your life force! After dealing with tourists all day, Flomanji is almost relaxing.\"",
    stats: {
      brawn: 3, // Default Brawn value
      moxie: 4,
      charm: 1,
      grit: 5,
      weirdSense: 0
    },
    ability: {
      name: "Crowd Control & I Quit!",
      description: "Darryl gains +1 on Moxie or Grit checks made to navigate or endure Hazards involving 'Crowds', 'Mobs', or 'Tourists'. Once per game, when facing an overwhelming situation, Darryl may declare \"I Quit!\". He ignores all Hazards in his current region for this turn but suffers -1 Charm permanently."
    },
    health: 10,
    weirdness: 0,
    luck: 2,
    icons: [],
    keywords: ["Theme Park", "Employee", "Burnout"],
    rules: [
      "Darryl gains +1 on Moxie or Grit checks made to navigate or endure Hazards involving 'Crowds', 'Mobs', or 'Tourists'.",
      "Once per game, when facing an overwhelming situation (e.g., multiple Hazards, high Heat), Darryl may declare \"I Quit!\". He ignores all Hazards in his current region for this turn but suffers -1 Charm permanently."
    ],
    imagePrompt: "Photorealistic portrait of a tired-looking person (Darryl) in a partially removed, goofy theme park costume. Their expression is a mix of exhaustion and simmering rage. Background is a stylized, slightly nightmarish theme park setting. Focus on burnout.",
    starterGear: [
      { name: "Stained Character Suit Head", type: "Disguise", effect: "Can be used to frighten certain NPCs or disguise identity." },
      { name: "Spill-Proof Tumbler (Empty)", type: "Container", effect: "Can store various liquids safely." },
      { name: "Park Map (Secret Shortcuts)", type: "Reference", effect: "Reveals hidden paths in Urban and Attraction regions." },
      { name: "Employee ID Badge (Revoked)", type: "Accessory", effect: "May grant access to certain restricted areas." },
      { name: "Smile Muscles (Overused)", type: "Physical", effect: "Can force a convincing smile in social situations (+1 Charm for first social check per day)." }
    ]
  },
  {
    id: "rexford-grimes",
    name: "REXFORD \"REX\" GRIMES",
    type: "player-character",
    role: "Survivalist Prepper",
    flavor: "\"Knew it! Knew this day would come! Flomanji Rising! Good thing I buried those MREs... now where did I put that shovel?\"",
    stats: {
      brawn: 3, // Default Brawn value
      moxie: 3,
      charm: 1,
      grit: 5,
      weirdSense: 0
    },
    ability: {
      name: "Always Prepared & Field Crafting",
      description: "Rex starts the game with one additional random Gear card. Once per game, Rex may spend 1 Action and discard 2 Gear cards to immediately draw 1 Treasure & Artifact card."
    },
    health: 10,
    weirdness: 0,
    luck: 3,
    icons: [],
    keywords: ["Survivalist", "Prepper", "Paranoid"],
    rules: [
      "Rex starts the game with one additional random Gear card.",
      "Once per game, Rex may spend 1 Action and discard 2 Gear cards to immediately draw 1 Treasure & Artifact card."
    ],
    imagePrompt: "Photorealistic portrait of a rugged individual (Rex) wearing practical gear, maybe a bit paranoid-looking. Background is a cluttered garage or bunker filled with survival supplies. Focus on preparedness.",
    starterGear: [
      { name: "Spork (Tactical Titanium)", type: "Tool", effect: "Can be used as both eating utensil and emergency digging tool." },
      { name: "Water Purification Tablets (Expired?)", type: "Consumable", effect: "Can make contaminated water safe to drink (mostly)." },
      { name: "Paracord Bracelet (50ft)", type: "Tool", effect: "Can be unraveled for various survival uses." },
      { name: "Camo Bandana", type: "Clothing", effect: "Provides minor concealment in natural environments." },
      { name: "Survival Manual (Waterlogged)", type: "Reference", effect: "+1 on survival-related skill checks in wilderness regions." }
    ]
  },
  {
    id: "tiffany-monroe",
    name: "TIFFANY \"TIFF\" MONROE",
    type: "player-character",
    role: "Instagram Influencer",
    flavor: "\"#FlomanjiLife #Survivor #NoFilter #SponsoredByPanic! OMG, you guys, this lighting is terrible for my aesthetic, but the existential dread is kinda trending?\"",
    stats: {
      brawn: 3, // Default Brawn value
      moxie: 1,
      charm: 5,
      grit: 1,
      weirdSense: 0
    },
    ability: {
      name: "Do It For The 'Gram! & Sponsored Content",
      description: "Once per game, Tiff can attempt to distract an NPC or non-animal Hazard by taking a selfie with it. Success = The Hazard/NPC is momentarily confused. When Tiff draws a Gear card with a 'Food', 'Luxury', or 'Fashion' keyword, she may immediately gain +1 Luck for her next check."
    },
    health: 10,
    weirdness: 0,
    luck: 4,
    icons: [],
    keywords: ["Influencer", "Social Media", "Trendsetter"],
    rules: [
      "Once per game, Tiff can attempt to distract an NPC or non-animal Hazard by taking a selfie with it. \"Shake Charm, DC 4.\" Success = The Hazard/NPC is momentarily confused; ignore its effects for this turn. Failure = Gain 1 Weirdness.",
      "When Tiff draws a Gear card with a 'Food', 'Luxury', or 'Fashion' keyword, she may immediately gain +1 Luck for her next check."
    ],
    imagePrompt: "Photorealistic portrait of a young woman (Tiffany) striking a pose for a selfie amidst chaos. She looks slightly panicked but is trying to maintain her influencer smile. Background is a visually striking but dangerous Flomanji location (e.g., edge of a sinkhole, picturesque but gator-filled swamp). Focus on curated reality vs. harsh reality.",
    starterGear: [
      { name: "Selfie Stick (Extended)", type: "Tool", effect: "Allows photos from unusual angles, may also serve as a poking device." },
      { name: "Ring Light (Battery Dying)", type: "Tool", effect: "Provides illumination and improves appearance in social situations." },
      { name: "Portable Charger (Also Dying)", type: "Tool", effect: "Can restore power to one electronic device." },
      { name: "Branded Water Bottle (Empty)", type: "Container", effect: "Can store liquids, also serves as status symbol in certain situations." },
      { name: "Perfectly Applied Makeup (Sweating Off)", type: "Consumable", effect: "+1 Charm for the next social encounter." }
    ]
  },
  {
    id: "lenny-harper",
    name: "LENNY \"SCOOP\" HARPER",
    type: "player-character",
    role: "Local Blogger / Journalist",
    flavor: "\"This is bigger than the county fair scandal! 'Flomanji Phenomenon Baffles Experts!' Just gotta get the story... and maybe survive to post it.\"",
    stats: {
      brawn: 3, // Default Brawn value
      moxie: 3,
      charm: 3,
      grit: 2,
      weirdSense: 0
    },
    ability: {
      name: "Get the Scoop & Deadline Pressure",
      description: "Once per game, after successfully interacting with an NPC, Lenny may ask the Goblet one additional question about the NPC's knowledge. When the global Heat track reaches 5 or higher, Lenny gains +1 on all Moxie checks."
    },
    health: 10,
    weirdness: 0,
    luck: 4,
    icons: [],
    keywords: ["Journalist", "Blogger", "Investigator"],
    rules: [
      "Once per game, after successfully interacting with an NPC, Lenny may ask the Goblet one additional question about the NPC's knowledge (e.g., \"Do they know about nearby Hazards?\" \"Can they help with the Mission?\"). The Goblet provides a brief, potentially cryptic answer.",
      "When the global Heat track reaches 5 or higher, Lenny gains +1 on all Moxie checks."
    ],
    imagePrompt: "Photorealistic portrait of a determined-looking person (Lenny) holding a notepad and pen, maybe looking slightly harried. Background is a chaotic scene they are trying to document (e.g., aftermath of a Hazard, a strange Event). Focus on investigative drive.",
    starterGear: [
      { name: "Voice Recorder (Low Battery)", type: "Tool", effect: "Can record conversations for later reference." },
      { name: "Steno Pad (Coffee Stained)", type: "Tool", effect: "Allows documentation of important information." },
      { name: "Fedora (Slightly Crooked)", type: "Clothing", effect: "Grants minor authority in investigative situations." },
      { name: "Camera with Cracked Lens", type: "Tool", effect: "Can capture evidence, though quality may vary." },
      { name: "Press Pass (Expired)", type: "Accessory", effect: "May grant access to restricted areas or information sources." }
    ]
  },
];

// Update the function to return our Flomanji player characters
export const getAllFlomanjiPlayerCharacters = (): PlayerCharacterCard[] => {
  log.info("Retrieving all Flomanji player characters");
  return [...PLAYER_CHARACTER_CARDS];
};

log.info(`${PLAYER_CHARACTER_CARDS.length} Flomanji player character cards initialized`);
