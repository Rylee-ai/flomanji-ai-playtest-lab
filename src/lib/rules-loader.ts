
/**
 * Loads the rules content for Flonaki simulations.
 * Tries localStorage first, then falls back to the complete players guide (full text).
 */
export const getExampleRules = (): string => {
  const savedRules =
    typeof window !== "undefined"
      ? localStorage.getItem("flonaki-rules")
      : null;

  if (savedRules) {
    return savedRules;
  }

  // Return complete default rules content (first few lines changed)
  return `# Flonaki Master Players Guide
*Survive the sunshine. Embrace the chaos.* *Version 1.0 — Production-Ready — 18 April 2025*

> **Layout Notes (💡):**
    - Use full‑spread art for cover; include summoning storm and neon gator silhouette.
    - Chapter openers get full‑page illustrations; sidebar call‑outs for designer commentary.

## 1  Welcome to Flonaki

*"When Flonaki Man meets survival horror, you're in for one wild ride."*
Flonaki is a **semi‑co‑operative card‑and‑dice adventure** for 2–6 players. Set in a heightened 1987 Flonaki, it blends survival‑horror tension with tongue‑in‑cheek 'Flonaki Man' absurdity. Every session unfolds like a one‑shot B‑movie: outrun hurricanes, barter with swamp witches, and — if you're lucky — escape the entity known only as *Flonaki* before it eats the Sunshine State alive.

💡 *Sidebar:* Flonaki draws DNA from: **Eldritch Horror** (co‑op tension), **Dead of Winter** (modular missions), and **Battlestar Galactica** (traitor jeopardy).

**1.1  The Core Loop**
Each round pulses with rising stakes through this five‑step loop:

1. **Draw Trouble**
    - Reveal a card from the Trouble deck (Gear, Hazard, NPC, or Event) to unleash new obstacles or opportunities.
2. **Take Two Actions**
    - Move, use equipment, rest, team‑up, or advance the Mission.
3. **Chaos Strikes**
    - Unleash one Chaos card — the world escalates.
4. **Advance the Timers**
    - Global **Heat** ticks upward; personal **Weirdness** may spike.
5. **Repeat**
    - Until you beat the Mission… or the Sunshine State burns.

> Worked Example: Eddie "Airboat" Alvarez draws Hazard 'Swamp Witch's Curse,' spends Charm, fails DC 11 — gains 2 Weirdness, discards his bug spray, and the horror deepens.

**1.2  Victory & Defeat**

- **Victory:** Complete every Primary Objective and reach the Extraction Region before Heat 10.
- **Defeat:** Heat hits 10, or all un‑Flonakiified Survivors are eliminated.
> **Call‑Out (💡):** Introduce Galaxy Bar as optional Special Zone in Chapter 11; see Appendix for full card.

## 2  Creating Your Survivor

Every great Flonaki tale begins with a hardened—and a bit unhinged—Survivor. In this chapter you'll assemble your card, equip your starting hand, and launch into the danger.
💡 *Layout Notes:* Survivor cards are poker‑size, double‑sided. Front shows Stats, Ability, tracking spots; back shows flavor art and starter gear slots.

**2.1  Survivor Card Components**

- **Name & Role:** Your title and archetype (e.g. Eddie "Airboat" Alvarez — Everglades Tour Guide).
- **Stats:** Five core attributes—**Brawn, Moxie, Charm, Grit, Weird Sense**—to which you assign 5 Upgrade Points (no stat may exceed 5 at start).
- **Unique Ability:** One‑line trait that triggers during play (see examples).
- **Health:** Track on your personal d6 (start at 5; at 0 you are **Incapacitated**).
- **Weirdness:** Use your personal d10, starting at 0, to track Weirdness (flip to a Flonakiified card at 10).
- **Luck Tokens:** Represented by your Luck d6, start with half your Stat total (rounded up).
- **Starter Gear Slots (5):** Place your opening five Gear cards here.

**2.2  Step 1  Select a Board**
Each Survivor chooses a color‑coded board (Starter or Advanced). These record your Unique Ability and host your Health/Weirdness dice and Gear slots.
**2.3  Step 2  Assign Upgrade Points**
You have **5 Upgrade Points** to distribute among your five Stats. No Stat may exceed 5. Mark values with pen or pencil.

> **Guidance:** New players often boost Moxie or Grit first. Weird Sense is niche but key for cryptid hunters.

**2.4  Step 3  Name & Backstory**
Give your Survivor a memorable name and one colourful sentence:
"**Sandy Dupree, retired roller‑derby champion and part‑time gator wrangler.**"
**2.5  Step 4  Initial Draw**
Each player draws **4 Main Deck** cards (3 if 5–6 players):

- Keep **Gear** and **Treasure** in hand.
- Resolve **NPC** or **Event** cards immediately.
- Shuffle any **Hazard** cards back into the deck.
> Worked Example: Eddie's first draw is **Alligator Farm** (Region): he triggers Gator Wrangler NPC, gains a **Gator Hide** for his Airboat crew.

**2.6  Step 5  Claim Luck Tokens**
Total your five Stats, halve and round up. That is your starting Luck on your Luck d6.

> Worked Example: Sandy's Stats total 12 → 12 ÷ 2 = 6 → she places her Luck pip on 6.

With your Survivor ready—Stats set, backstory chosen, cards drawn, and dice placed—brace yourself for the rising Heat. Chapter 3 unpacks the heart of your character: Attributes & Mechanics.

## 3  Core Attributes & Game Mechanics

In Flonaki, your Survivor's stats drive every roll and decision. This chapter dives deep—no shortcuts—covering checks, Actions, Damage, and the twin‑timer interplay.
💡 *Layout Notes:* Include full‑page stat sheet mock‑up showing die icons, stat labels, and example checks.
**3.1  The Five Stats**
Each Survivor has five core attributes. During a check, you roll 2d6 + the relevant Stat + modifiers against a Difficulty Class (DC).

| Stat            | Explains                    | Sample Uses                                |
| --------------- | --------------------------- | ------------------------------------------ |
| **Brawn**       | Raw muscle                  | Forcing jammed doors, wrestling a gator    |
| **Moxie**       | Speed & daring              | Dive‑rolling, fleeing collapsing pier      |
| **Charm**       | Persuasion                  | Convincing NPCs, dodging suspicion         |
| **Grit**        | Mental toughness            | Resisting toxins, repairing equipment      |
| **Weird Sense** | Sixth sense for the uncanny | Interpreting cryptid signs, warding curses |

> **Check Formula:** 2d6 + Stat + Modifiers ≥ DC → Success. Fail = consequences.

**3.2  Difficulty Classes**

| Descriptor | DC |
| ---------- | -- |
| Easy       | 7  |
| Standard   | 9  |
| Hard       | 11 |
| Heroic     | 13 |

Use DC 7 for low‑stakes tasks, DC 9 for normal challenges, DC 11 for dangerous tests, DC 13 for heroics.
**3.3  Actions Catalogue**
Each turn you have **2 Actions**. You may take any combination:

- **Move (1 Action):** Shift to an orthogonally adjacent Region (pay extra costs if terrain demands).
- **Use Gear (1 Action):** Activate a single card's main ability.
- **Interact (1 Action):** Engage NPCs, Region features, or Event effects.
- **Team‑Up (1 Action):** Grant +1 to an ally's immediate check or trade Gear on same tile.
- **Rest (1 Action):** Only in safe Regions; choose to heal 1 Damage or reduce 1 Weirdness.
- **Mission (1 Action):** Advance mission tasks per the Mission sheet.
> **Reactions (⚡):** Cards with a lightning icon can be played any time, free of your action budget.

**3.4  Damage & Healing**

- **Health:** Track via 5 Health cards. Discard lowest card equal to damage. Reach 0 cards = Incapacitated.
- **Healing:** Draw 1 Health card per heal effect (max 5 in hand).

**3.5  Luck Tokens**

- **Spend Before Roll:** +1 per token to your check.
- **Spend After Roll:** Reroll a single die.
- **Regain:** Natural 12 on a check or certain card effects.

**3.6  The Twin Timers**
Flonaki is a race against two clocks:

- **Heat:** Global danger meter. Advance +1 each End Phase (+2 if 4–6 players) and via card effects. At Heat 10 → Defeat.
- **Weirdness:** Individual sanity meter tracked on your d10. Gain pips via weird events; at Weirdness 10 → flip to a Flonakiified Role.
> **Cross‑Timer Triggers:** Some Effects tie Heat to Weirdness (e.g. "At Heat 9, each turn survivors gain +1 Weirdness").

With these mechanics locked, you hold the tools to face every bizarre horrors Flonaki can vomit at you. Chapter 4 charts how to navigate and reveal the map itself.

## 4  Map & Regions

Your adventure unfolds across a dynamic map of Flonaki. Instead of a static board, Flonaki uses **Region cards** laid out each game to create unique pathways, chokepoints, and surprises.
💡 *Layout Notes:* Show a sample 3×3 map grid with Region cards face‑down and reveal arrows. Sidebar on modular layouts (grid vs branching highway).
**4.1  Setting Up the Mission Map**

1. **Start Region:** Place the Mission's designated Start Region card face‑up.
2. **Build the Deck:** Shuffle the remaining 37 standard Region cards (see Appendix D).
3. **Lay Out:** According to the Mission sheet, form a grid or branching highway pattern of face‑down Region cards around the Start.
4. **Flips & Exploration:** When a Survivor enters a face‑down card, flip it and immediately resolve its **On Enter** effect.
> Worked Example: In Mission "Blood Tide," place **Research Lab Extraction** at the far edge. Lay three columns of three face‑down Regions in a grid; players start at **Abandoned Gas Station**.

**4.2  Region Card Anatomy**
Each Region card follows a standardized format:

    ──────────────────────────
    CARD TITLE
    Type: REGION
    Biome Tags: [emoji tags]
    ──────────────────────────
    On Enter: …
    Action (1 Action): …
    Rest (1 Action): …
    Bonus Zone (once/visit): …
    ──────────────────────────
    Flavor: "…"
    Image Prompt: …
    ──────────────────────────
- **Type & Tags:** Clarify this tile's environment.
- **On Enter:** Triggers immediately.
- **Action:** Optional ability for 1 Action.
- **Rest:** Benefit when resting.
- **Bonus Zone:** One‑off special use anytime on tile.

💡 *Designer Tip:* Use region art that clearly illustrates biome and call‑out icons for each effect.
**4.3  Flipping & Resolving Regions**

- **Flip Moment:** Occurs the moment you enter. Resolve **On Enter** fully before spending Actions.
- **Known vs Unknown:** Once flipped, all Survivors see the card; you may plan Actions accordingly.
- **Face‑Down Hazards:** Some Regions tag extra Hazards to be drawn from the Hazard deck when flipped.

**4.4  Region Roster**
Below is the complete list of Region cards (see next page for full card text). Use these 38 unique locations to build every map:
**Swamp (8):** Everglades Marsh · Cypress Bayou · Alligator Farm · Quicksand Bog · Mangrove Tangle · Abandoned Airboat Dock · Mosquito Infestation Site · Old Sugar Mill Ruins
**Coastal (6):** Forgotten Beach · Crashing Cliffs · Red Tide Strand · Shipwreck Cove · Saltwater Fishing Pier · Hurricane Refuge Camp
**Urban (6):** Ghost Mall · Abandoned Gas Station · Police Roadblock · Industrial Canal · Rooftop Helipad · Tourist Strip
**Highway (5):** Mile‑Long Bridge · Rusted Traffic Jam · Rest‑Stop Diner · Decommissioned Tollbooth · Overturned Tanker Site
**Forest (5):** Pine Barrens · Fire Tower Lookout · Lumber Mill Clearing · Hidden Bunker Entrance · Wolf Creek Campground
**Exposed (4):** Sweltering Salt Flats · Sun‑baked Citrus Grove  Bleached Parking Lot · Flooded Farmland
**Underground (4):** Toxic Sewer Junction · Cave of Echoes · Abandoned Subway Tunnel · Buried Research Vault
Flip, explore, survive—and let no Region be safe.

## 5  Cards & Phases

Every game of Flonaki revolves around drawing and resolving cards in a structured turn sequence. This chapter breaks down:

1. **Deck Composition**
2. **Card Anatomy**
3. **Turn Phases**

💡 *Layout Notes:* Show iconography for each card type; flowchart of turn phases with miniature illustrations.
**5.1  Deck Composition**

- **Main Deck (≥80 cards):** Contains Gear, Hazard, NPC, and Event cards.
- **Chaos Deck (30 cards):** Global escalation; triggered in Chaos Phase.
- **Treasure & Artifact Deck (20 cards):** Rare reward deck; drawn via specific triggers.
- **Region Cards (38):** Map tiles—see Chapter 4.
- **NPC Deck (17 cards):** Social encounters; drawn via Region or Event effects.
- **Flonakiified Role Deck (9 cards):** Replaces Survivors at Weirdness 10 or on death.
- **Secret Objective Deck (8 cards):** Hidden goals for Traitor Variant.
- **Automa Deck (30 cards):** Solo AI instructions (optional solo mode).
> Designer Tip: Keep decks separated in labeled tuck boxes; use color‑coded backs.

**5.2  Card Anatomy**
All cards (except Regions) share a uniform layout:

    ──────────────────────────
    CARD NAME
    Type Line with Icons
    ──────────────────────────
    Keywords: … (for reference)
    ──────────────────────────
    Main Text: Effects, Checks, Costs
    ──────────────────────────
    Flavor Text: "…"
    Image Prompt: …
    ──────────────────────────
- **Type Line:** Card category and relevant icons (⚔️, 🤝, 🐊, etc.).
- **Keywords:** Mechanics tags for designers and GMs.
- **Main Text:** Precise rules, DCs, Action costs.
- **Flavor Text & Image Prompt:** Guide art and tone.

**5.3  Turn Phases**
Each round consists of four phases. Track them in order:

1. **Draw Phase (Draw Trouble)**
    - Draw the top card of the Main Deck.
    - Immediately resolve its card type:
        - **Gear:** Keep in hand.
        - **Hazard:** Read and resolve as a check.
        - **NPC:** Place and Interact as prompt.
        - **Event:** Read aloud and apply global or local effects.
2. **Action Phase (2 Actions each)**
    - Players take turns spending Actions in any order.
    - Valid Actions: Move, Use Gear, Interact, Team‑Up, Rest, Mission.
    - Players may react with ⚡ cards at any time.
3. **Chaos Phase**
    - Reveal the top Chaos card.
    - Resolve its global effect (Heat spikes, new Hazards, Flotsam).
    - Flonakiified Roles act now (see Appendix B).
4. **End Phase (Advance Timers)**
    - Increase Heat per player count.
    - Check for any cross‑timer triggers (see Ch. 3.6).
    - If Heat ≥ 10, the game ends in defeat.
> Worked Example: After player actions, Chaos card 'Blistering Sun' adds +2 Heat (4‑6 players). Then each Survivor's Companion Oath triggers +1 Weirdness due to Heat 9.

With your scissors and glue in hand, you now understand exactly how to wield every card Flonaki throws at you. Chapter 6 escalates into Facing Danger: Hazards, Combat & Damage.

## 6  Facing Danger — Hazards, Combat & Damage

When you venture into Flonaki's wilds, threats lurk everywhere. This chapter unpacks every Hazard type, the combat flow, damage mechanics, and how to survive—if you can.
💡 *Layout Notes:* Two‑page spread: left – Hazard card anatomy with icon call‑outs; right – staged combat example illustrated like movie storyboard.
**6.1  Hazard Card Anatomy**
Every Hazard card shares a standard template:

    ───────────────────────────────────
    CARD NAME    (Creature/Weather/Trap…)
    Type: Hazard · [Biome Icons]
    ─────────────────────────────────────
    DCs: Fight ⛏️9  Flee 🏃9  Negotiate 💬11  Outsmart 🧠7
    On Failure: … (Damage, Weirdness, Heat)
    Keywords: …
    Flavor: "…"
    ─────────────────────────────────────
- **Type & Biome:** Identifies category and where it appears.
- **DCs:** Standard Difficulty Classes for each response option.
- **On Failure:** Immediate consequence if all checks fail.
- **Keywords & Flavor:** Designer tags and atmospheric text.

**6.2  Combat & Checks**
When facing a Hazard, survivors choose one of four **Responses** and make a group check:

1. **Fight ⛏️**: Roll 2d6 + Brawn + Gear + teamwork bonuses ≥ Fight DC.
2. **Flee 🏃**: Roll 2d6 + Moxie + Gear bonuses ≥ Flee DC.
3. **Negotiate 💬**: Roll 2d6 + Charm + situational modifiers ≥ Negotiate DC.
4. **Outsmart 🧠**: Roll 2d6 + Weird Sense + tool bonuses ≥ Outsmart DC.
> Group Help: Each additional success adds +1 to the check outcome.
> Natural Results: A natural 12 grants +1 Luck; a natural 2 triggers Minor Chaos draw.

Combat Flow

1. **Declare Response:** Survivors pick Fight, Flee, Negotiate, or Outsmart.
2. **Roll Checks:** Everyone rolls simultaneously.
3. **Apply Gear:** Add tool/Weapon bonuses (e.g. Machete +2 Fight).
4. **Resolve Outcome:** If **≥ DC**, Hazard is overcome. If **< DC**, apply **On Failure**.
5. **Rewards & Penalties:** On success draw Gear/Treasure or reduce Heat; on failure take damage or weirdness.
> Worked Example: A Panther Ambush (Creature, Fight 11). Sandy (Brawn 2 + Bat +1) rolls 5+3=8, Eddie (Brawn 2 + Machete +2) rolls 3+4=7. Total successes = 11: Hazard defeated, everyone gains 1 Treasure.

**6.3  Boss Hazards**
Bosses are elite Hazards with HP and ongoing threat:

- **HP = 3 × number of Survivors.**
- **Each success** removes 1 HP.
- **Chaos Strike:** During each Chaos Phase, Boss deals 1 Damage to nearest Survivor unless countered.
> Rule Tip (💡): Boss HP scales so larger groups feel the squeeze.

**6.4  Damage, Incapacitation & Healing**

- **Damage:** Reduce your Health d6 by 1 per point of damage.
- **0 Health:** You become **Incapacitated**—you cannot act, drop all Gear, and may only crawl 1 tile per turn.
- **Death:** Taking Damage while at 0 Health eliminates you (no further actions).
- **Healing:**
    - **Rest:** Spend 1 Action in safe Regions to increase your Health d6 by 1 (up to maximum of 5).
    - **Consumables:** Use Food or First Aid to heal 1–2 Health.
    - **NPC/Modules:** Certain NPC encounters or optional modules may restore additional Health.

**6.5  Environmental & Trap Hazards  Environmental & Trap Hazards**

- **Environmental:** Weather, Toxic Spills, Heat Stroke. Often impose Heat or Weirdness.
- **Traps:** Quicksand, Pitfalls. Require Moxie or Grit checks or Gear to avoid.
> Designers: Ensure Environmental effects reference the Heat & Weirdness timers for dramatic tension.

With combat rules and damage flow etched into your memory, Chapter 7 readies you for the twin‑timer's ultimate clash: Heat & Weirdness management.

## 7  Heat & Weirdness — The Twin Timers

Survival in Flonaki demands mastering two relentless forces: the rising global Heat and your own slipping sanity. This chapter explores every facet of these dual threat meters.
💡 *Layout Notes:* Show interlocking gauge graphics for Heat and Weirdness, with call‑outs for threshold effects. Include sample round‑tracker.
**7.1  Raising Heat**
Heat represents gathering danger and urgency. It increases from these sources:

- **End Phase Tick:** +1 Heat each round (or +2 if 4–6 players).
- **Chaos Cards & Hazards:** Specific cards raise Heat (e.g. **Blistering Sun**, **Red Tide Strand**).
- **Player Effects:** Some Gear or NPC effects may add Heat as a cost.
> **Minimum Heat:** Heat never falls below the highest tick threshold crossed (e.g. if Heat is at 5, card effects cannot drop it below 5).

Heat Track Setup

- Use a **d10** dial or track printed 0–10.
- Start at 0.
- When Heat 10 is reached, the game ends in defeat.

**7.2  Managing Weirdness**
Weirdness gauges the psychological toll of Flonaki's horrors. Track on your personal d10:

- **Gain Pips:** From card effects, Hazard failures, Environmental triggers.
- **Thresholds:**
    - 3 pips: **Attuned** (you gain +1 on Weird checks).
    - 5 pips: **Hallucinating** (draw extra Gear on success; −1 Charm).
    - 7 pips: **Paranoid** (cannot Team‑Up; −1 Action per turn).
    - 10 pips: **Flonakiified** (flip to your Flonakiified Role card).

Reducing Weirdness

- **Resting:** In a safe Region, spend 1 Action to reduce 1 Weirdness.
- **Consumables:** Certain Food (Sublix Half‑Sub) or NPC (Voodoo Priestess) reduce more.
- **Galaxy Bar Lounge:** Heal 1 Weirdness by taking no actions on that round.

**7.3  Cross‑Timer Interplay**
Heat and Weirdness are intertwined:

- **Heat Triggers:** At **Heat 9**, each Survivor gains +1 Weirdness at end of round.
- **Weirdness Effects:** Some Chaos or Region cards escalate Heat based on players' average Weirdness.
> Worked Example: After a Chaos spike to Heat 9, every Survivor rolls to add 1 Weirdness. Carlotta's pip jumps from 4 to 5, triggering Hallucinating bonuses next check.

**7.4  Strategic Balance**
Mastering Flonaki means balancing risk and recovery:

- **When to Heat Dump:** Use Gear, NPCs, or Galaxy Bar to shed Heat before boss encounters.
- **Weirdness Trade‑Offs:** Pushing Weird Sense checks can net extra Gear, but beware threshold penalties.
- **Team Coordination:** Share rest turns and resources to stagger Weirdness climbs.
> **Designer Note (💡):** Use the Weirdness gauge as a visual cue—players should feel their sanity fraying as Heat surges around them.

With the twin‑timers laid bare, Chapter 8 arms you with optional modules and mission frameworks to heighten the drama or tailor your Flonaki experience.

## 8  Mission Framework & Optional Modules

The heart of Flonaki is its *Missions*—self‑contained adventures—and the wealth of *Optional Modules* you can layer on for endless replayability. This chapter shows you how to read a Mission sheet, link games into a campaign, and customize difficulty or style with modular rules.
💡 *Layout Notes:* Show a stylized Mission sheet with call‑outs for each section; include module icons grid at chapter end.
**8.1  Mission Sheet Walkthrough**
Every Mission comes with a dedicated sheet laid out in clear sections:

1. **Narrative Hook & Setup:** Read aloud to set the scene.
2. **Map Diagram:** Exact layout instructions for Regions (grid or highway).
3. **Starting Heat:** Default or mission‑specific starting value.
4. **Primary & Secondary Objectives:** Clear victory goals with checkboxes.
5. **Fail Conditions:** Instant‑loss triggers (e.g. Heat 10, all players Flonakiified).
6. **Scaling Table:** Adjust timers or objective counts based on player count.
7. **Special Rules:** Mission‑unique twists (e.g. hurricane track, traffic jam hazards).
> Worked Example: Mission **"Gator‑Aid on I‑95"** opens with a tanker spill on I‑95. Map uses a 3×3 grid; start at **Broken Overpass**, extract at **Research Lab**; Heat starts at 2; objectives include escort and antidote collection.

**8.2  Linking Missions — Campaign Play**
Flonaki shines as a one‑shot, but linking Missions creates a dramatic mini‑campaign:

- **Survivor Continuity:** Escaped Survivors carry over Gear and half of their Luck.
- **Heat Scarring:** Each campaign failure adds +1 to next Mission's starting Heat.
- **Treasure Points:** Earn Treasure to unlock boons—heal scars, purchase Gear, or access Advanced Boards.
> Designer Tip (💡): Track campaign reputation or state reputation (0–10) for narrative flavor and optional modifiers.

**8.3  Optional Module – Video Game Arcade**
Insert the **Video Game Arcade** as a special Chill Zone for strategic respite and chaos:

- **Setup:** Shuffle 1 Video Game Arcade Region into the deck when a Mission rule, Gear, or Chaos card instructs.
- **Effects (once per visit per player):**
- • **Fast Travel:** Free Move to any visited Region.
- • **Play Arcade (1 Action):** –1 Heat + roll d6 for bonus (Mini‑Table, see Appendix).
- • **Talk to Bartender (1 Action):** Spend 1 Gear → Draw 1 Chaos or Artifact.
- • **Lounge & Chill (no Action):** Heal 1 Weirdness if no other actions taken this round.
> Design Intent: A mid‑session pacing break, Heat vent, and thematic arcade interlude that rewards risk and cooperation.

**8.4  Other Optional Modules**
Use these modules individually or combine them to dial up challenge and variety:

| Module                           | Effect Summary                                                                |
| -------------------------------- | ----------------------------------------------------------------------------- |
| **Competitive Florida Man Mode** | Race for Treasure; remove Team‑Up; add Betray Action; traitors remain active. |
| **Nightmare Difficulty**         | Start Heat 3; passive Chaos effect; Rest adds Weirdness; Bosses roll 3d6.     |
| **Legacy Mini‑Campaign**         | Five‑mission arc; track State Reputation; permanent scars; unlock boons.      |
| **Family‑Friendly "Sunny Day"**  | Remove Weirdness; swap horrors for goofy art; Charm to befriend bosses.       |
| **Secret Traitor Variant**       | Deal Secret Objectives; some players work against group; triggers suspense.   |
| **Solo Automa**                  | 30‑card AI deck simulates a partner; discard Luck when Heat ticks; optional.  |

> Designer Advice: Balance complexity—combine at most two modules for your first few plays to avoid rule overload.

With Missions framed and Modules at hand, you're ready to craft every Flonaki session from pulse‑pounding terror to absurd relief. Chapter 9 dives into Appendices and quick reference tables for at‑a‑glance convenience.

## 9  Appendices & Quick Reference

This final chapter gathers all essential tables, icons, and module details into one place for quick consultation during play.
**9.1  Quick Rules Reference**

| Topic                    | Summary                                                                    |                 |            |                 |
| ------------------------ | -------------------------------------------------------------------------- | --------------- | ---------- | --------------- |
| **Actions per Turn**     | 2 Actions (Move, Use Gear, Interact, Team‑Up, Rest, Mission) + ⚡ Reactions |                 |            |                 |
| **Check Formula**        | 2d6 + Stat + Modifiers ≥ DC → Success                                      |                 |            |                 |
| **Default DCs**          | Easy 7                                                                     | Standard 9      | Hard 11    | Heroic 13       |
| **Health**               | Track on d6 (5 maximum); reduce per damage; heal via Rest or Consumables   |                 |            |                 |
| **Heat Tick**            | +1 End Phase (+2 if 4–6 players); Deck & effects may add more              |                 |            |                 |
| **Weirdness Thresholds** | 3 Attuned                                                                  | 5 Hallucinating | 7 Paranoid | 10 Flonakiified |
| **Luck Tokens**          | Spend pre/post-roll; start = half Stats rounded up; regain on nat 12       |                 |            |                 |
| **Rest (1 Action)**      | Heal 1 Health or reduce 1 Weirdness (safe Regions only)                    |                 |            |                 |

**9.2  Icon Key**

| Icon | Meaning                   |
| ---- | ------------------------- |
| ⚔️   | Fight response or Combat  |
| 🏃   | Move / Flee response      |
| 💬   | Negotiate response        |
| 🧠   | Outsmart / Weird check    |
| ⚡    | Reaction (no Action cost) |
| 🐊   | Swamp Biome               |
| 🏖️  | Coastal Biome             |
| 🏙️  | Urban Biome               |
| 🛣️  | Highway Biome             |
| 🌳   | Forest Biome              |
| ☀️   | Exposed Biome             |
| 🕳️  | Underground Biome         |
| ☣️   | Toxic/Environmental       |
| 🔮   | Weirdness-related         |
| 🛟   | Treasure & Artifact       |
| 🗣️  | Social / NPC              |

**9.3  Appendix A – Video Game Arcade Mini‑Table**
After **Play Arcade (1 Action)**, roll d6:

1. **Psychic Backlash** – Gain 1 Weirdness.
2. **Classic Glitch** – Next Region re‑triggers its On Enter hazard.
3. 3–4. **Heat Sink** – Reduce Heat by 2.
4. **Snack Spill** – Draw 1 minor Gear (Consumable).
5. **Jackpot** – Draw 1 Gear & Heal 1 Weirdness.

**9.4  Appendix B – Flonakiified Roles**
List of 9 Roles, Icons & Chaos Actions (see Chapter 10):

1. Swamp Zombie (💀🐊)
2. Toxic Wraith (💀☣️)
3. Psychic Revenant (💀🔮)
4. Roadside Ghoul (💀🚗)
5. Neon Phantom (💀🌃🔮)
6. Cryptid Crawler (🦍🔮)
7. Radioactive Gator (☢️🐊)
8. Underground Lurker (🕳️💀)
9. Storm Specter (🌪️💀)

**9.5  Appendix C – Secret Objectives**
List of 8 Objectives & alignment:
• Heat Maximus (Saboteur)
• Betrayal Bloom (Saboteur)
• Gear Hoarder (Saboteur)
• Treasure Guardian (Innocent)
• Clue Collector (Innocent)
• Caregiver (Innocent)
• Speed Runner (Innocent)
• Arcade Enthusiast (Innocent)
**9.6  Appendix D – Region Roster**
See Chapter 4.4 for full list of 38 Region Cards by Biome.
**9.7  Appendix E – Solo Automa Deck**
30 AI cards that govern solo play; refer to Chapter 11.2 and follow Automa Card Anatomy (icons, If/Else logic, DCs).
**9.8  FAQs & Designer Notes**

- **Q:** Can I mix Optional Modules arbitrarily?
- **A:** Combine no more than two at first to maintain clarity.
- **Q:** What if my players hate weirdness thresholds?
- **A:** Consider the "Sunny Day" module to remove Weirdness entirely.
- **Q:** How to balance Gear scarcity?
- **A:** Adjust Hazard draw rates or house-rule additional Gear draws from NPCs.

----------

*End of Flonaki Master Players Guide – embark on your bizarre quest!*`;
}
