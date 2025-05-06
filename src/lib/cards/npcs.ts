
import { NPCCard } from "@/types/cards/npc";
import { log } from "@/utils/logging";

// Collection of NPC cards for Flomanji
export const NPC_CARDS: NPCCard[] = [
  {
    id: "npc-capn-scurvy",
    name: "Cap'n Scurvy",
    type: "npc",
    icons: [
      { symbol: "👥", meaning: "Social" },
      { symbol: "📻", meaning: "Radio" },
      { symbol: "🌊", meaning: "Coastal" }
    ],
    keywords: ["Trader", "Information", "Coastal", "Chaotic"],
    rules: [
      "Encounter: Goblet plays static then booming voice: \"Ahoy, landlubber! Cap'n Scurvy's Swap Meet is open! Lookin' to trade or just listen to my ramblings?\" Player chooses: Trade or Listen.",
      "Trade: Player may discard 1 Gear to draw 1 Gear OR discard 2 Gear to draw 1 Treasure/Artifact card.",
      "Listen: \"Shake Luck, DC 4.\" Success: Goblet relays a cryptic clue about the current Mission or a nearby Hazard. Fail: Goblet plays loud, annoying music; player gains 1 Weirdness."
    ],
    flavor: "Goblet (as Cap'n): 'Broadcasting live from the heart of the weird! Don't touch that dial... or that gator!'",
    imagePrompt: "An old man with a wild beard, an eyepatch, and headphones, sitting in a makeshift radio booth on a dilapidated houseboat.",
    checkDC: 4,
    actions: [
      {
        description: "Trade Gear",
        cost: 1,
        effect: "Player may discard 1 Gear to draw 1 Gear OR discard 2 Gear to draw 1 Treasure/Artifact card."
      },
      {
        description: "Listen for Information",
        cost: 1,
        effect: "Shake Luck, DC 4. Success: Receive a cryptic clue about the Mission or nearby Hazard. Fail: Gain 1 Weirdness."
      }
    ]
  },
  {
    id: "npc-bertha-bait-shop",
    name: "Bertha the Bait Shop Owner",
    type: "npc",
    icons: [
      { symbol: "👥", meaning: "Social" },
      { symbol: "🐟", meaning: "Fish" },
      { symbol: "🌿", meaning: "Swamp" }
    ],
    keywords: ["Trader", "Information", "Swamp", "Gruff"],
    rules: [
      "Encounter: Goblet grunts: \"Need bait? Or just wastin' air? Whatcha want?\" Player chooses: Buy Bait or Ask Rumors.",
      "Buy Bait: Discard 1 Gear card with a 'Food' or 'Shiny' keyword to draw 1 Gear card (likely fishing-related).",
      "Ask Rumors: \"Shake Charm, DC 4.\" Success: Goblet reveals the location type of the nearest Hazard card not yet revealed. Fail: Goblet scoffs: \"Ain't heard nothin'. Get out.\""
    ],
    flavor: "Goblet (as Bertha): 'Got live shrimp, dead shrimp, mystery shrimp... Take yer pick.'",
    imagePrompt: "A stern-looking older woman behind the counter of a cluttered bait shop, holding a bucket of wriggling things.",
    checkDC: 4,
    actions: [
      {
        description: "Buy Bait",
        cost: 1,
        effect: "Discard 1 Gear card with a 'Food' or 'Shiny' keyword to draw 1 Gear card (likely fishing-related)."
      },
      {
        description: "Ask Rumors",
        cost: 1,
        effect: "Shake Charm, DC 4. Success: Learn location type of nearest unrevealed Hazard. Fail: No information."
      }
    ]
  },
  {
    id: "npc-skunk-ape-truther",
    name: "Skunk Ape Truther (Dale)",
    type: "npc",
    icons: [
      { symbol: "👥", meaning: "Social" },
      { symbol: "🐾", meaning: "Animal" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Information", "Weirdness Check", "Swamp Dweller"],
    rules: [
      "Encounter: Goblet whispers conspiratorially: \"Psst! Seen 'im? The big hairy fella? Smells like... well, you know. Got info, if yer not one of them.\" Player must \"Shake Weirdness, DC 3.\"",
      "Success: \"You understand! Here's what I know...\" Goblet reveals a shortcut: Player may immediately move to any adjacent region for free.",
      "Failure: \"Yer eyes ain't right. Yer one of them cover-up agents!\" Player gains 1 Weirdness from the intense paranoia."
    ],
    flavor: "Goblet (as Dale): 'They say it's just swamp gas and bear tracks... THEY LIE!'",
    imagePrompt: "A man in full camouflage, wearing a tinfoil hat, peering intensely from behind a large palmetto frond.",
    checkDC: 3,
    actions: [
      {
        description: "Share Conspiracy Theories",
        cost: 1,
        effect: "Shake Weirdness, DC 3. Success: Gain a shortcut to any adjacent region. Failure: Gain 1 Weirdness."
      }
    ]
  },
  {
    id: "npc-gator-wrestler-gary",
    name: "Gator Wrestler Gary (Off-Duty)",
    type: "npc",
    icons: [
      { symbol: "🐊", meaning: "Gator" },
      { symbol: "👥", meaning: "Social" },
      { symbol: "🎭", meaning: "Entertainment" }
    ],
    keywords: ["Risk/Reward", "Moxie Check", "Information"],
    rules: [
      "Encounter: Goblet speaks with bravado: \"Yeah, I wrestle gators for a living. Wanna learn a trick? Or maybe arm wrestle? Winner gets info.\" Player chooses: Learn Trick or Arm Wrestle.",
      "Learn Trick: Automatically gain +1 on your next Stat Check involving a Gator Hazard.",
      "Arm Wrestle: \"Shake Moxie, DC 5.\" Success: \"Yer strong! Alright, listen up...\" Goblet reveals the location of the nearest Treasure/Artifact card. Fail: \"Ha! Weakling! Try the petting zoo.\" Player loses 1 Grit."
    ],
    flavor: "Goblet (as Gary): 'Rule number one: Don't lose a finger. Rule number two: Try really hard not to lose a finger.'",
    imagePrompt: "A muscular man with several scars and maybe a missing finger, wearing a sleeveless shirt, leaning against an airboat.",
    checkDC: 5,
    actions: [
      {
        description: "Learn Gator Trick",
        cost: 1,
        effect: "Gain +1 on your next Stat Check involving a Gator Hazard."
      },
      {
        description: "Arm Wrestle",
        cost: 1,
        effect: "Shake Moxie, DC 5. Success: Learn location of nearest Treasure/Artifact. Fail: Lose 1 Grit."
      }
    ]
  },
  {
    id: "npc-coupon-queen",
    name: "The Coupon Queen of Kissimmee",
    type: "npc",
    icons: [
      { symbol: "👥", meaning: "Social" },
      { symbol: "🛒", meaning: "Shopping" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Trader", "Luck Check", "Urban"],
    rules: [
      "Encounter: Goblet speaks rapidly: \"Got coupons for everything! Two-for-one swamp tours! Discount gator jerky! Wanna trade? Feeling lucky?\" Player must \"Shake Luck, DC 4.\"",
      "Success: \"Your lucky day! Trade 1 Gear card for 2 Gear cards.\"",
      "Failure: \"Expired! Sorry, hon. Maybe next time.\" No trade possible this turn."
    ],
    flavor: "Goblet (as Coupon Queen): 'This one saves you 50 cents on hurricane shutters! It's practically free!'",
    imagePrompt: "A woman with an overflowing binder of coupons, standing excitedly outside a strip mall.",
    checkDC: 4,
    actions: [
      {
        description: "Trade Coupons",
        cost: 1,
        effect: "Shake Luck, DC 4. Success: Trade 1 Gear card for 2 Gear cards. Failure: No trade possible."
      }
    ]
  },
  {
    id: "npc-mysterious-night-fisherman",
    name: "Mysterious Night Fisherman",
    type: "npc",
    icons: [
      { symbol: "❓", meaning: "Mystery" },
      { symbol: "💧", meaning: "Water" },
      { symbol: "🌙", meaning: "Night" }
    ],
    keywords: ["Information", "Weirdness Gain", "Night Encounter"],
    rules: [
      "Encounter: Goblet whispers: \"Figure in the dark... casting a line into the void. Approach?\" Player chooses: Approach or Ignore.",
      "Approach: \"Shake Charm, DC 5.\" Success: Goblet reveals a cryptic hint related to the Mission objective. Fail: \"The figure vanishes... leaving only ripples and a sense of dread.\" Player gains 1 Weirdness.",
      "Ignore: Safe, but the Goblet notes your lack of courage."
    ],
    flavor: "Goblet: 'Some say he's fishing for souls... others say just catfish.'",
    imagePrompt: "A silhouetted figure fishing off a dark pier under a full moon, the water glowing faintly.",
    checkDC: 5,
    actions: [
      {
        description: "Approach Fisherman",
        cost: 1,
        effect: "Shake Charm, DC 5. Success: Receive hint about Mission objective. Fail: Gain 1 Weirdness."
      },
      {
        description: "Ignore Fisherman",
        cost: 0,
        effect: "Nothing happens, but your caution is noted."
      }
    ]
  },
  {
    id: "npc-theme-park-mascot",
    name: "Overzealous Theme Park Mascot (Runaway)",
    type: "npc",
    icons: [
      { symbol: "🎭", meaning: "Entertainment" },
      { symbol: "⚡", meaning: "Speed" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Hazard Trigger", "Moxie Check", "Absurdity"],
    rules: [
      "Encounter: Goblet plays slightly off-key theme park music: \"It's Sunny the Squirrel! And he looks... frantic. He's running right at you!\" Player must \"Shake Moxie, DC 4, to stand your ground!\"",
      "Failure: \"You get bowled over by pure, unhinged enthusiasm!\" Player takes 1 Damage and loses next action.",
      "Success: \"You sidestep the fuzzy fury! Sunny keeps running, maybe towards a Hazard...\" Player may choose an adjacent region; if it contains a Hazard, Sunny triggers it instead of the next player entering."
    ],
    flavor: "Goblet: 'He escaped his corporate overlords... and possibly his sanity.'",
    imagePrompt: "A slightly terrifying, wide-eyed squirrel mascot sprinting down a road, leaving chaos in its wake.",
    checkDC: 4,
    actions: [
      {
        description: "Stand Your Ground",
        cost: 1,
        effect: "Shake Moxie, DC 4. Success: Redirect mascot to trigger a Hazard in adjacent region. Fail: Take 1 Damage and lose next action."
      }
    ]
  },
  {
    id: "npc-shady-pawn-shop-owner",
    name: "Shady Pawn Shop Owner (Ricky Rat)",
    type: "npc",
    icons: [
      { symbol: "👥", meaning: "Social" },
      { symbol: "🛒", meaning: "Shopping" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Trader", "Risk/Reward", "Charm Check"],
    rules: [
      "Encounter: Goblet speaks shiftily: \"Whatcha got? Whatcha need? Everything's got a price... especially your desperation.\" Player may offer to Sell or Buy.",
      "Sell: Offer 1 Gear card. \"Shake Charm, DC 4.\" Success = Draw 2 Gear cards. Fail = \"Nah, that's junk. Get lost.\" (Discard offered Gear for nothing).",
      "Buy: Ask to see 'Top Shelf' item. \"Shake Luck, DC 5.\" Success = Draw 1 Treasure/Artifact card. Fail = \"Nothin' good today. Maybe check the dumpster.\""
    ],
    flavor: "Goblet (as Ricky): 'Authentic mermaid tears! Slightly used... Found 'em myself.'",
    imagePrompt: "A greasy-looking man behind a counter cluttered with bizarre items, under a flickering neon sign \"RICKY RAT'S PAWN & LIES\".",
    checkDC: 4,
    actions: [
      {
        description: "Sell Gear",
        cost: 1,
        effect: "Offer 1 Gear card and shake Charm, DC 4. Success: Draw 2 Gear cards. Fail: Lose the offered Gear."
      },
      {
        description: "Buy 'Top Shelf' Item",
        cost: 1,
        effect: "Shake Luck, DC 5. Success: Draw 1 Treasure/Artifact card. Fail: Nothing happens."
      }
    ]
  },
  {
    id: "npc-golf-cart-guru",
    name: "The Golf Cart Guru",
    type: "npc",
    icons: [
      { symbol: "👥", meaning: "Social" },
      { symbol: "🚗", meaning: "Vehicle" },
      { symbol: "🧠", meaning: "Wisdom" }
    ],
    keywords: ["Information", "Buff", "Luck Check"],
    rules: [
      "Encounter: Goblet speaks serenely: \"Ah, a seeker. The path is long, the golf cart is slow. Seek wisdom? Or perhaps... a speed boost?\" Player chooses: Seek Wisdom or Speed Boost.",
      "Seek Wisdom: Gain +1 Luck until the end of your next turn.",
      "Speed Boost: \"Shake Luck, DC 3.\" Success: Gain +1 Movement on your next turn. Fail: \"The battery died mid-blessing.\" No effect."
    ],
    flavor: "Goblet (as Guru): 'The journey of a thousand miles begins with a single charge... hopefully.'",
    imagePrompt: "An elderly person meditating peacefully in the driver's seat of a heavily decorated golf cart adorned with wind chimes.",
    checkDC: 3,
    actions: [
      {
        description: "Seek Wisdom",
        cost: 1,
        effect: "Gain +1 Luck until the end of your next turn."
      },
      {
        description: "Speed Boost",
        cost: 1,
        effect: "Shake Luck, DC 3. Success: Gain +1 Movement on your next turn. Fail: No effect."
      }
    ]
  },
  {
    id: "npc-hurricane-survivor",
    name: "Hurricane Survivor Cynthia",
    type: "npc",
    icons: [
      { symbol: "👥", meaning: "Social" },
      { symbol: "🌪️", meaning: "Weather" },
      { symbol: "💪", meaning: "Grit" }
    ],
    keywords: ["Buff Provider", "Grit Check", "Resourceful"],
    rules: [
      "Encounter: Goblet sounds weary but tough: \"Rode out Cat 5 in a bathtub. Seen worse than you, probably. Need a pep talk?\" Player must \"Shake Grit, DC 3, to show you're tough too.\"",
      "Success: \"Alright, you got grit. Here's some advice...\" Player gains +1 Grit permanently.",
      "Failure: \"Soft. You wouldn't last five minutes in Andrew. Now scram.\" No effect."
    ],
    flavor: "Goblet (as Cynthia): 'Board up your windows and your heart, kid.'",
    imagePrompt: "A woman with weathered face and determined eyes, standing strong amidst debris, holding a generator pull cord.",
    checkDC: 3,
    actions: [
      {
        description: "Seek Tough Advice",
        cost: 1,
        effect: "Shake Grit, DC 3. Success: Gain +1 Grit permanently. Fail: No effect."
      }
    ]
  },
  {
    id: "npc-fruit-stand-vendor",
    name: "Roadside Fruit Stand Vendor (Mysteriously Cheap)",
    type: "npc",
    icons: [
      { symbol: "🍊", meaning: "Food" },
      { symbol: "🛒", meaning: "Shopping" },
      { symbol: "❓", meaning: "Mystery" }
    ],
    keywords: ["Trader", "Risk/Reward", "Weirdness Gain"],
    rules: [
      "Encounter: Goblet sounds folksy but odd: \"Fresh Flomanji oranges! So cheap, it's criminal... or maybe somethin' else. Buy somethin'?\" Player may discard 1 Gear to draw 1 'Food' Gear. Then, \"Shake Luck, DC 4.\"",
      "Success: The fruit is fine (or provides a minor temporary buff specified on the food card).",
      "Failure: \"Tastes... funny.\" Gain 1 Weirdness."
    ],
    flavor: "Goblet (as Vendor): 'Grown in... special soil. Real special.'",
    imagePrompt: "A dilapidated fruit stand with piles of unnaturally vibrant oranges, run by someone whose eyes glow faintly.",
    checkDC: 4,
    actions: [
      {
        description: "Buy Mystery Fruit",
        cost: 1,
        effect: "Discard 1 Gear to draw 1 'Food' Gear. Shake Luck, DC 4. Success: Fruit is fine. Fail: Gain 1 Weirdness."
      }
    ]
  },
  {
    id: "npc-lizard-people-conspiracist",
    name: "Lizard People Conspiracist (Gary B.)",
    type: "npc",
    icons: [
      { symbol: "👥", meaning: "Social" },
      { symbol: "🌀", meaning: "Weirdness" },
      { symbol: "🏛️", meaning: "Government" }
    ],
    keywords: ["Information (Unreliable)", "Weirdness Check", "Debuff"],
    rules: [
      "Encounter: Goblet whispers urgently: \"They're in the government! The water! The Goblet maybe! You gotta believe me! Listen?\" Player must \"Shake Weirdness, DC 4, to understand his 'truth'.\"",
      "Success: \"You see it too! They put chips in the...\" Player gains 1 Weirdness but learns the location of the nearest 'Urban' Hazard.",
      "Failure: \"You're one of THEM! Get away!\" Player suffers -1 Charm until end of next turn."
    ],
    flavor: "Goblet (as Gary B.): 'The governor shed his skin on live TV! Open your eyes!'",
    imagePrompt: "A man frantically gesturing with charts covered in red string, pointing towards a government building.",
    checkDC: 4,
    actions: [
      {
        description: "Listen to Conspiracies",
        cost: 1,
        effect: "Shake Weirdness, DC 4. Success: Gain 1 Weirdness but learn location of nearest Urban Hazard. Fail: -1 Charm until end of next turn."
      }
    ]
  },
  {
    id: "npc-lost-tourist",
    name: "Perpetually Lost Tourist (Bernice)",
    type: "npc",
    icons: [
      { symbol: "👥", meaning: "Social" },
      { symbol: "🗺️", meaning: "Map" },
      { symbol: "😤", meaning: "Frustration" }
    ],
    keywords: ["Delay", "Misdirection", "Luck Check"],
    rules: [
      "Encounter: Goblet sounds whiny and confused: \"Excuse me? Is this the way to the... uh... Big Gator Land? My map is all wet.\" Player must \"Shake Luck, DC 3, to escape quickly.\"",
      "Failure: \"Oh thank goodness! Can you just show me...?\" Player loses their next Move action explaining directions.",
      "Success: \"Okay, thanks!\" Player escapes, gains +1 Luck for their patience."
    ],
    flavor: "Goblet (as Bernice): 'I thought the giant mouse statue was closer to the beach?'",
    imagePrompt: "A tourist wearing mismatched clothes, holding a soggy map upside down, looking utterly bewildered.",
    checkDC: 3,
    actions: [
      {
        description: "Attempt to Escape",
        cost: 1,
        effect: "Shake Luck, DC 3. Success: Gain +1 Luck. Fail: Lose next Move action explaining directions."
      }
    ]
  },
  {
    id: "npc-sentient-spanish-moss",
    name: "Sentient Spanish Moss (The Hanging Judge)",
    type: "npc",
    icons: [
      { symbol: "🌿", meaning: "Plant" },
      { symbol: "❓", meaning: "Mystery" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Environmental Hazard", "Weirdness Check", "Judgement"],
    rules: [
      "Encounter: Goblet whispers anciently: \"The Moss... it watches. It judges your soul. Do you confess your Flomanji sins?\" Player must \"Shake Weirdness, DC 5.\"",
      "Success: \"The Moss accepts your weirdness.\" Player may remove 1 Heat from the global track.",
      "Failure: \"Unworthy! The Moss constricts!\" Player takes 1 Damage and gains 1 Weirdness."
    ],
    flavor: "Goblet: 'Older than the state, wiser than the politicians.'",
    imagePrompt: "Spanish Moss hanging so thick it forms a vaguely judgmental face, tendrils seeming to reach out.",
    checkDC: 5,
    actions: [
      {
        description: "Confess to the Moss",
        cost: 1,
        effect: "Shake Weirdness, DC 5. Success: Remove 1 Heat from global track. Fail: Take 1 Damage and gain 1 Weirdness."
      }
    ]
  },
  {
    id: "npc-synchronized-swimmers",
    name: "Retention Pond Synchronized Swimmers",
    type: "npc",
    icons: [
      { symbol: "💧", meaning: "Water" },
      { symbol: "🎭", meaning: "Entertainment" },
      { symbol: "🏡", meaning: "Suburban" }
    ],
    keywords: ["Buff Provider", "Charm Check", "Performance"],
    rules: [
      "Encounter: Goblet plays elegant-ish music: \"Behold! Suburban water ballet! Applaud their artistry?\" Player must \"Shake Charm, DC 3, to show appreciation.\"",
      "Success: \"Inspired by their grace! Gain +1 Charm until end of next turn.\"",
      "Failure: \"You disturbed their concentration! They splash you.\" Gain +1 Heat from embarrassment."
    ],
    flavor: "Goblet: 'Making the best of storm water runoff. Truly inspiring.'",
    imagePrompt: "A group of people in slightly-too-small swimsuits performing synchronized swimming in a typical suburban retention pond.",
    checkDC: 3,
    actions: [
      {
        description: "Applaud Performance",
        cost: 1,
        effect: "Shake Charm, DC 3. Success: Gain +1 Charm until end of next turn. Fail: Gain +1 Heat from embarrassment."
      }
    ]
  },
  {
    id: "npc-alligator-whisperer",
    name: "The Alligator Whisperer",
    type: "npc",
    icons: [
      { symbol: "🐊", meaning: "Gator" },
      { symbol: "👥", meaning: "Social" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Animal Handling", "Buff", "Weirdness Check"],
    rules: [
      "Encounter: Goblet speaks calmly: \"They understand me... most of the time. Want me to teach you the soothing sounds?\" Player must \"Shake Weirdness, DC 4.\"",
      "Success: \"You have the gift! Gain 'Gator Calm' status: Automatically pass the next Gator Hazard check.\"",
      "Failure: \"You lack the connection. The gators sense your fear.\" Suffer -1 Moxie until end of next turn."
    ],
    flavor: "Goblet (as Whisperer): 'Just hum gently and offer it your least favorite Gear card.'",
    imagePrompt: "Someone sitting calmly cross-legged inches away from a large alligator, seemingly communicating.",
    checkDC: 4,
    actions: [
      {
        description: "Learn Gator Soothing",
        cost: 1,
        effect: "Shake Weirdness, DC 4. Success: Gain 'Gator Calm' status to automatically pass next Gator Hazard check. Fail: -1 Moxie until end of next turn."
      }
    ]
  }
];

log.info("NPC cards initialized with 15 character cards");
