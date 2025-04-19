
import { NPCCard } from '@/types/cards/npc';

export const NPC_CARDS: NPCCard[] = [
  {
    id: "shady-pawn-shop-owner",
    name: "Shady Pawn Shop Owner",
    type: "npc",
    icons: [
      { symbol: "🛒", meaning: "Vendor" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Trade", "Urban/Suburb", "Gear Source"],
    checkDC: 11,
    actions: [
      {
        description: "Sell Gear",
        cost: 1,
        effect: "Discard 1–2 non‑Artifact Gear → Draw that many Gear cards"
      },
      {
        description: "Buy Gear",
        cost: 1,
        effect: "Charm DC 11 → Success: Draw 1 Gear; Failure: Lose 1 Action & Gain 1 Weirdness"
      },
      {
        description: "Ask Questions",
        cost: 1,
        effect: "Moxie DC 9 → Success: Gain Info (view adjacent Hazard/Bonus); Failure: Gain 1 Heat"
      }
    ],
    rules: ["Must have Gear to sell for Sell action"],
    flavor: "Everything's got a price. Especially desperation.",
    imagePrompt: "A shifty‑eyed owner behind a cluttered pawn‑shop counter, poorly lit, eyeing you suspiciously"
  },
  {
    id: "helpful-librarian",
    name: "Helpful Librarian",
    type: "npc",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Calm", "Urban/Suburb", "Information"],
    checkDC: 7,
    actions: [
      {
        description: "Research",
        cost: 1,
        effect: "Luck DC 9 → Success: Gain Info (view adjacent Hazard) or draw 1 basic Gear; Failure: no effect"
      },
      {
        description: "Quiet Respite",
        cost: 2,
        effect: "Reduce Weirdness by 1"
      }
    ],
    rules: ["Initial Charm DC 7 check required to interact", "Failure of initial Charm: Lose 1 Action"],
    flavor: "Shhh! Even during the apocalypse, fines still apply.",
    imagePrompt: "Stern librarian in glasses, finger to lips, amidst tall bookshelves"
  },
  {
    id: "stressed-park-ranger",
    name: "Stressed Park Ranger",
    type: "npc",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Forest/Swamp/Coastal", "Information"],
    actions: [
      {
        description: "Area Intel",
        cost: 1,
        effect: "Charm DC 9 or Moxie DC 11 → Success: Gain Info (adjacent Hazard) or negate next Hazard here; Failure: Gain 1 Weirdness"
      },
      {
        description: "Offer Help",
        cost: 1,
        effect: "Grit DC 11 → Success: Reduce Heat 1; Failure: Take 1 Damage"
      }
    ],
    rules: ["Choose one action per turn"],
    flavor: "Used to worry about tourists feeding gators. Now…",
    imagePrompt: "Exhausted ranger in uniform, wide‑eyed and twitchy in a dense swamp"
  },
  {
    id: "confused-tourist",
    name: "Confused Tourist",
    type: "npc",
    icons: [
      { symbol: "🗣️", meaning: "Social" },
      { symbol: "⚠️", meaning: "Hazard" }
    ],
    keywords: ["Tourist", "Urban/Coastal/Suburb"],
    checkDC: 7,
    actions: [
      {
        description: "Help Tourist",
        cost: 0,
        effect: "Charm DC 7 → Failure: Lose 1 Action"
      },
      {
        description: "Brush Off",
        cost: 0,
        effect: "Moxie DC 9 → Failure: Lose 1 Action and Gain 1 Heat"
      }
    ],
    rules: ["Triggers immediately on entry (0 Actions)"],
    flavor: "Excuse me? Is this hellmouth on the map?",
    imagePrompt: "Loud‑shirted tourist holding map upside‑down, oblivious to chaos"
  },
  {
    id: "gator-wrangler",
    name: "Gator Wrangler",
    type: "npc",
    icons: [
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Swamp", "Creature Handling", "Gear Source"],
    actions: [
      {
        description: "Get Info",
        cost: 1,
        effect: "Charm DC 9 or Moxie DC 11 → Success: Gain Info (nearby Hazard/Treasure); Failure: Gain 1 Weirdness"
      },
      {
        description: "Trade",
        cost: 1,
        effect: "Offer 1 Food/Tool → Grit DC 9: Success: Gain 'Gator Hide' or 'Alligator Tooth Necklace' Gear; Failure: nothing"
      },
      {
        description: "Hire Help",
        cost: 1,
        effect: "Discard 1 Treasure or 2 valuable Gear → Bypass one Gator Hazard this turn"
      }
    ],
    rules: ["Must have appropriate items for Trade and Hire actions"],
    flavor: "Respect the gator, respect the wrangler.",
    imagePrompt: "Rugged swamp‑attired individual holding a lasso, confident and intimidating"
  },
  {
    id: "questionable-vendor",
    name: "Questionable Roadside Vendor",
    type: "npc",
    icons: [
      { symbol: "🛒", meaning: "Vendor" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Highway", "Rural", "Weirdness"],
    checkDC: 9,
    actions: [
      {
        description: "Browse Wares",
        cost: 1,
        effect: "Luck DC 9 → Success: Draw 1 Gear; Failure: Draw 1 Gear & Gain 1 Weirdness; Natural 1: also Take 1 Damage or trigger minor Hazard"
      }
    ],
    rules: ["Natural 1 on check triggers additional negative effect"],
    flavor: "Taxidermy squirrels! Get 'em while they're… vaguely warm!",
    imagePrompt: "Rickety stand piled with odd junk—taxidermy, jars of mysterious fluids"
  },
  {
    id: "desperate-survivor",
    name: "Desperate Survivor",
    type: "npc",
    icons: [
      { symbol: "🗣️", meaning: "Social" },
      { symbol: "⚖️", meaning: "Choice" }
    ],
    keywords: ["Moral Dilemma"],
    actions: [
      {
        description: "Help",
        cost: 1,
        effect: "Give 1 Gear (Food/Water/First Aid) → Reduce Heat 1"
      },
      {
        description: "Refuse",
        cost: 1,
        effect: "Moxie DC 9 → Success: Gain 1 Weirdness; Failure: Take 1 Damage (Sudden Attack) or discard 1 random Gear (Theft)"
      }
    ],
    rules: ["Must have appropriate Gear for Help action"],
    flavor: "We're all in this together… right? Please?",
    imagePrompt: "Ragged figure pleading, eyes desperate, minor injuries visible"
  },
  {
    id: "neighborhood-watch",
    name: "Overzealous Neighborhood Watch",
    type: "npc",
    icons: [
      { symbol: "🏘️", meaning: "Suburb" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Suburbia", "Heat Interaction"],
    checkDC: 9,
    actions: [
      {
        description: "Deal with Watch",
        cost: 0,
        effect: "Charm DC 9 or Moxie DC 11 → Failure: Gain 1 Heat; if Heat ≥ 5, also Lose 1 Action"
      }
    ],
    rules: ["Triggers on entering Region (0 Actions)", "Heat ≥ 5 increases penalty"],
    flavor: "Your tent color violates subsection 4b!",
    imagePrompt: "Visor‑clad enforcer with clipboard and binoculars, frowning"
  },
  {
    id: "street-preacher",
    name: "Street Preacher",
    type: "npc",
    icons: [
      { symbol: "🗣️", meaning: "Social" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Urban", "Dubious Information"],
    checkDC: 9,
    actions: [
      {
        description: "Listen to Sermon",
        cost: 1,
        effect: "Weirdness DC 9 → Success: Draw 1 Event or Look at top Chaos card; Failure: Gain 1 Weirdness and Lose 1 Luck"
      }
    ],
    rules: ["Uses Weirdness stat for check"],
    flavor: "Repent now… or you'll be Flomanjified!",
    imagePrompt: "Fervent preacher with raised Bible, neon‑pastel aura around him"
  },
  {
    id: "voodoo-priestess",
    name: "Voodoo Priestess",
    type: "npc",
    icons: [
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Occult", "Swamp"],
    checkDC: 9,
    actions: [
      {
        description: "Seek Blessing",
        cost: 1,
        effect: "Charm DC 9 → Success: Choose one: Reduce 1 Weirdness or Gain 1 Luck; Failure: Gain 2 Weirdness and Lose 1 Action"
      }
    ],
    rules: ["Failure has severe Weirdness penalty"],
    flavor: "Would you like a blessing… or a curse?",
    imagePrompt: "Hooded figure chanting over a misty bayou with glowing talismans"
  },
  {
    id: "diy-mechanic",
    name: "DIY Mechanic",
    type: "npc",
    icons: [
      { symbol: "🛠️", meaning: "Tool" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Vehicle Repair", "Jury‑Rig"],
    checkDC: 9,
    actions: [
      {
        description: "Request Repairs",
        cost: 1,
        effect: "Grit DC 9 → Success: Repair one damaged Vehicle Gear (restore 1 Use) or gain +2 Bonus on next Repair check; Failure: Take 1 Heat"
      }
    ],
    rules: ["Must have damaged Vehicle Gear to repair"],
    flavor: "She'll run again… eventually.",
    imagePrompt: "Greasy overalls, makeshift workbench with car parts strewn about"
  },
  {
    id: "motel-manager",
    name: "Motel Manager",
    type: "npc",
    icons: [
      { symbol: "🏨", meaning: "Social" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Shelter", "Trade"],
    checkDC: 9,
    actions: [
      {
        description: "Book Room",
        cost: 1,
        effect: "Charm DC 9 → Success: Rest here (heal 1 Health or reduce 1 Weirdness) or draw 1 Gear; Failure: Gain 1 Heat"
      }
    ],
    rules: ["Success allows immediate rest action"],
    flavor: "Rooms are cheap… but your nightmares aren't.",
    imagePrompt: "Tired manager behind a cluttered desk, neon 'Vacancy' sign flickering"
  },
  {
    id: "sideshow-barker",
    name: "Sideshow Barker",
    type: "npc",
    icons: [
      { symbol: "🎪", meaning: "Event" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Carnival", "Mini‑Game"],
    checkDC: 9,
    actions: [
      {
        description: "Play Game",
        cost: 1,
        effect: "Luck DC 9 → Success: Draw 1 Gear and Gain 1 Luck; Failure: Lose 1 Action and Gain 1 Weirdness"
      }
    ],
    rules: ["Uses Luck stat for check"],
    flavor: "Step right up! Spin the wheel of misfortune!",
    imagePrompt: "Colorful but tattered carnival stand with a crazed barker gesturing wildly"
  },
  {
    id: "tour-bus-driver",
    name: "Tour Bus Driver",
    type: "npc",
    icons: [
      { symbol: "🚌", meaning: "Vehicle" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Mass Move", "Urban"],
    checkDC: 9,
    actions: [
      {
        description: "Hitch Ride",
        cost: 1,
        effect: "Moxie DC 9 → Success: All players on this Region move 1 tile toward any Urban or Highway Region; Failure: Take 1 Damage and Gain 1 Heat"
      }
    ],
    rules: ["Affects all players in Region"],
    flavor: "Next stop: somewhere less deadly… maybe.",
    imagePrompt: "Old bus idling in traffic, driver leaning out window, megaphone in hand"
  },
  {
    id: "conspiracy-theorist",
    name: "Conspiracy Theorist",
    type: "npc",
    icons: [
      { symbol: "🗣️", meaning: "Social" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Dubious Intel", "Heat Increase"],
    checkDC: 9,
    actions: [
      {
        description: "Listen to Theories",
        cost: 1,
        effect: "Charm DC 9 → Success: Look at top 2 Chaos cards, reorder them as you like; Failure: Gain 2 Heat and Lose 1 Luck"
      }
    ],
    rules: ["Severe Heat penalty on failure"],
    flavor: "They're always watching… especially in the swamp.",
    imagePrompt: "Disheveled person surrounded by scrawled notes, maps, and strange diagrams"
  },
  {
    id: "suspicious-fisherman",
    name: "Suspicious Fisherman",
    type: "npc",
    icons: [
      { symbol: "🐟", meaning: "Creature" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Coastal", "Information"],
    checkDC: 9,
    actions: [
      {
        description: "Ask About Area",
        cost: 1,
        effect: "Moxie DC 9 → Success: Gain Info (view adjacent Hazard) or draw 1 Gear; Failure: Gain 1 Weirdness"
      }
    ],
    rules: ["Uses Moxie for information check"],
    flavor: "Fish have eyes… and so do I.",
    imagePrompt: "Weathered angler holding a rod, glare in his eyes, murky water behind"
  },
  {
    id: "wildlife-conservationist",
    name: "Wildlife Conservationist",
    type: "npc",
    icons: [
      { symbol: "🦜", meaning: "Creature" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Swamp/Forest", "Aid"],
    checkDC: 9,
    actions: [
      {
        description: "Request Aid",
        cost: 1,
        effect: "Grit DC 9 → Success: Heal 1 Damage to any one Survivor or Reduce 1 Weirdness; Failure: Gain 1 Weirdness"
      }
    ],
    rules: ["Can target any Survivor in Region"],
    flavor: "We're all part of the ecosystem… some of us bite back.",
    imagePrompt: "Green‑vested biologist cradling a small gator or bird, earnest expression"
  }
];
