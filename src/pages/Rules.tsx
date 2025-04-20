import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { parseMarkdown } from "@/lib/utils";

const FLOMANJI_RULES = `# Flomanji Master Players Guide
*Survive the sunshine. Embrace the chaos.* *Version 1.0 — Production‑Ready — 18 April 2025*

> **Layout Notes (💡):**
    - Use full‑spread art for cover; include summoning storm and neon gator silhouette.
    - Chapter openers get full‑page illustrations; sidebar call‑outs for designer commentary.

## 1  Welcome to Flomanji

*"When Flomanji Man meets survival horror, you're in for one wild ride."*
Flomanji is a **semi‑co‑operative card‑and‑dice adventure** for 2–6 players. Set in a heightened 1987 Flomanji, it blends survival‑horror tension with tongue‑in‑cheek 'Flomanji Man' absurdity. Every session unfolds like a one‑shot B‑movie: outrun hurricanes, barter with swamp witches, and — if you're lucky — escape the entity known only as *Flomanji* before it eats the Sunshine State alive.

💡 *Sidebar:* Flomanji draws DNA from: **Eldritch Horror** (co‑op tension), **Dead of Winter** (modular missions), and **Battlestar Galactica** (traitor jeopardy).

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
- **Defeat:** Heat hits 10, or all un‑Flomanjified Survivors are eliminated.
> **Call‑Out (💡):** Introduce Galaxy Bar as optional Special Zone in Chapter 11; see Appendix for full card.

## 2  Creating Your Survivor

Every great Flomanji tale begins with a hardened—and a bit unhinged—Survivor. In this chapter you'll assemble your card, equip your starting hand, and launch into the danger.
💡 *Layout Notes:* Survivor cards are poker‑size, double‑sided. Front shows Stats, Ability, tracking spots; back shows flavor art and starter gear slots.

**2.1  Stat Rundown**
Stats govern every action, hazard, and social parley. Each Survivor starts with 1 in every stat, plus 7 points to customize.

- **Brawn:** Brute force, melee combat, and feats of strength.
- **Moxie:** Evasion, agility, and sheer nerve.
- **Charm:** Smooth talking, bartering, and leading a crew.
- **Grit:** Endurance, resisting Weirdness, and surviving damage.
- **Weird Sense:** Uncovering secrets, sensing danger, and outsmarting the unnatural.

> Designer Note: Stats are capped at 6 during character creation to ensure balance.

**2.2  Special Abilities**
Each Survivor wields a unique Ability that bends the rules. Some boost stats, others manipulate luck, and a few unlock new action types.

> Worked Example: "Airboat" Alvarez can spend Luck to re‑roll dice, turning near‑misses into clutch plays.

**2.3  Health, Weirdness & Luck**
Track these meters carefully — they dictate your odds of survival.

- **Health:** Damage taken. Deplete it, and you're Flomanjified.
- **Weirdness:** Exposure to the unnatural. High Weirdness triggers freakish events.
- **Luck:** A meta‑currency to bend fate. Spend it to re‑roll dice, avoid hazards, or gain advantages.

> Designer Note: Health and Weirdness reset between sessions, but Luck persists — spend it wisely!

**2.4  Starting Gear**
Every Survivor begins with a signature item or two. These tools offer immediate advantages, but can be lost or broken.

> Worked Example: The Journalist starts with a Camera, which can reveal hidden clues or blind enemies.

## 3  The Five Regions

Flomanji is divided into five distinct Regions, each with unique hazards, NPCs, and environmental effects.
💡 *Layout Notes:* Region cards are tarot‑sized, double‑sided. Front shows name, flavor text, and special effect; back shows map art and key locations.

**3.1  Everglades**
The wild heart of Flomanji. Swamps teem with gators, cryptids, and hermits.
*Region Effect:* +1 Difficulty to all Charm checks.

**3.2  Coastal Highway**
A ribbon of asphalt hugging the coast. Expect biker gangs, tourist traps, and sudden storms.
*Region Effect:* +1 Difficulty to all Moxie checks.

**3.3  Suburbs**
Cookie‑cutter homes hide dark secrets. Beware nosy neighbors, crazed cults, and things lurking in the cul‑de‑sacs.
*Region Effect:* +1 Difficulty to all Brawn checks.

**3.4  Downtown**
Neon‑lit streets pulse with vice. Gangsters, corrupt cops, and voodoo priests prowl the night.
*Region Effect:* +1 Difficulty to all Grit checks.

**3.5  Beaches**
Sun‑soaked sands turn sinister after dark. Watch for rogue waves, flesh‑eating fish, and ancient curses.
*Region Effect:* +1 Difficulty to all Weird Sense checks.

> Designer Note: Region effects stack with Hazard modifiers, creating dynamic challenges.

## 4  Drawing Trouble

Each round begins by revealing a card from the Trouble deck. These cards introduce new elements: Gear, Hazards, NPCs, and Events.
💡 *Layout Notes:* Trouble cards are standard poker‑sized. Each features evocative art and clear instructions.

**4.1  Gear**
Equipment to aid your quest. Weapons, tools, and talismans offer stat boosts or special actions.

> Worked Example: The Chainsaw grants +2 Brawn in combat, but is loud and unwieldy.

**4.2  Hazards**
Obstacles to overcome. Natural disasters, monsters, and traps test your skills.

> Worked Example: The Hurricane requires a Moxie check to avoid being swept away.

**4.3  NPCs**
Characters to interact with. Allies, enemies, and wild cards offer aid, opposition, or cryptic clues.

> Worked Example: The Swamp Witch may offer a blessing… for a price.

**4.4  Events**
Unexpected occurrences that shake up the game. Twists of fate, rumors, and omens.

> Worked Example: "Blood Moon" increases Weirdness for all Survivors.

> Designer Note: The Trouble deck is modular. Add or remove cards to customize difficulty and theme.

## 5  Taking Actions

Each turn, Survivors get two actions. Movement is always free, but other actions require careful planning.

**5.1  Move**
Travel to an adjacent Region. Essential for reaching objectives or escaping danger.

> Worked Example: "Airboat" Alvarez moves from the Everglades to the Coastal Highway.

**5.2  Use Gear**
Activate an item. Weapons, tools, and talismans offer unique effects.

> Worked Example: The Journalist uses the Camera to blind a pursuing monster.

**5.3  Interact**
Engage with an NPC or investigate a location. Charm, intimidate, or uncover secrets.

> Worked Example: The Cultist attempts to recruit a new member with a Charm check.

**5.4  Team-Up**
Assist another Survivor. Share gear, heal damage, or combine efforts on a check.

> Worked Example: The Wrestler lends Brawn to "Airboat" Alvarez for a feat of strength.

**5.5  Rest**
Recover Health or Luck. A brief respite from the chaos.

> Worked Example: The Doctor spends a turn bandaging wounds, regaining 2 Health.

**5.6  Mission**
Advance the Primary or Secondary Objective. Essential for winning the game.

> Worked Example: The Detective deciphers a clue, progressing the "Find the Artifact" Mission.

> Designer Note: Action economy is tight. Every choice matters.

## 6  Chaos Strikes

At the end of each turn, unleash a Chaos card. These cards represent the escalating madness of Flomanji.

**6.1  Heat**
The global temperature rises. As Heat increases, hazards intensify and the endgame approaches.

> Worked Example: Heat rises to 5. All fire‑based hazards gain +1 Difficulty.

**6.2  Weirdness**
Personal exposure to the unnatural. High Weirdness triggers bizarre events and mutations.

> Worked Example: The Cultist's Weirdness hits 7. They begin seeing visions of Flomanji Man.

**6.3  Region Effects**
Each Region has a unique effect that alters gameplay. These effects stack with other modifiers.

> Worked Example: In the Everglades, all Charm checks suffer +1 Difficulty.

**6.4  Card Combos**
Some Chaos cards trigger combos with Trouble cards. These interactions create unexpected twists.

> Worked Example: "Electrical Storm" + "Chainsaw" = The Chainsaw gains +1 Brawn, but shocks the user for 1 Health.

> Designer Note: Chaos cards ensure no two sessions are alike. Embrace the unpredictability.

## 7  Checks & Combat

Checks resolve actions and hazards. Roll 2d6, add your stat, and compare to the Difficulty Class (DC).

**7.1  The Check Formula**
2d6 + Stat ≥ DC = Success. Exploding dice add to the chaos.

> Worked Example: "Airboat" Alvarez rolls 2d6 + Brawn (3) to lift a gator. He rolls 5 and 6, plus his Brawn of 3, for a total of 14. If the DC is 12, he succeeds.

**7.2  Exploding Dice**
Any die roll of 6 explodes, adding another die to the roll. Keep rolling until you don't roll a 6.

> Worked Example: The Cultist rolls a 6 on one die, then rolls a 3. The total for that die is 9.

**7.3  Combat**
A special type of check. Brawn + Weapon vs. Enemy Defense. Damage is dealt on a success.

> Worked Example: The Wrestler attacks a zombie with a tire iron. He rolls 2d6 + Brawn (4) + Weapon (2) against the zombie's Defense of 10.

**7.4  Critical Success & Failure**
Rolling doubles on the dice triggers a critical effect. Success grants a bonus, failure inflicts a penalty.

> Worked Example: The Journalist rolls double 6s on a Charm check. They gain a valuable clue or ally.

> Designer Note: Checks are the heart of Flomanji. Keep the formula consistent and clear.

## 8  Heat & Weirdness

These twin timers track the rising stakes. Manage them carefully, or face dire consequences.

**8.1  Heat**
The global temperature of Flomanji. As Heat rises, the environment becomes more hostile.

- **Heat 5:** All Hazards gain +1 Difficulty.
- **Heat 7:** All Regions suffer a negative effect (e.g., Everglades floods, Downtown riots).
- **Heat 9:** All Survivors gain +1 Weirdness each round.
- **Heat 10:** Game Over. Flomanji consumes the Sunshine State.

> Worked Example: Heat reaches 7. The Beaches become infested with flesh‑eating fish.

**8.2  Weirdness**
Personal exposure to the unnatural. High Weirdness triggers bizarre events and mutations.

- **Weirdness 3:** Minor hallucinations. Visual and auditory distortions.
- **Weirdness 5:** Strange compulsions. Irrational behavior.
- **Weirdness 7:** Physical mutations. Unnatural growths or deformities.
- **Weirdness 9:** Loss of control. The Survivor becomes an NPC, controlled by the GM.
- **Weirdness 10:** Flomanjified. The Survivor is removed from the game.

> Worked Example: The Detective's Weirdness hits 7. They grow a third eye, granting +1 Weird Sense, but suffering ‑1 Charm.

> Designer Note: Heat and Weirdness create constant pressure. Players must balance risk and reward.

## 9  Winning & Losing

Flomanji is a game of survival. To win, you must complete the Primary Objective and escape before time runs out.

**9.1  Primary Objective**
The main goal of the session. Usually involves finding an artifact, defeating a monster, or escaping a location.

> Worked Example: The Primary Objective is "Find the Lost Idol." The Survivors must locate the idol and bring it to the Extraction Region.

**9.2  Secondary Objectives**
Optional goals that grant rewards. Completing these objectives can make the game easier.

> Worked Example: A Secondary Objective is "Rescue the Tourist." Rescuing the tourist grants +2 Luck to the party.

**9.3  Extraction Region**
A safe zone where Survivors can escape. Reaching this region with the Primary Objective triggers victory.

> Worked Example: The Extraction Region is "The Airport." The Survivors must reach the airport with the Lost Idol to win the game.

**9.4  Defeat Conditions**
Flomanji is unforgiving. The game ends in defeat if any of the following occur:

- Heat reaches 10.
- All un‑Flomanjified Survivors are eliminated.

> Designer Note: Flomanji is designed to be challenging. Not every session will end in victory.

*End of Flomanji Master Players Guide – embark on your bizarre quest!*`;

  const [rules, setRules] = useState(FLOMANJI_RULES);
  const [editMode, setEditMode] = useState(false);
  const [editedRules, setEditedRules] = useState("");
  const rulesHtml = parseMarkdown(rules);

  useEffect(() => {
    const savedRules = localStorage.getItem("flomanji-rules");
    if (savedRules) {
      setRules(savedRules);
    }
  }, []);

  const handleEditClick = () => {
    setEditedRules(rules);
    setEditMode(true);
  };

  const handleSaveRules = () => {
    try {
      localStorage.setItem("flomanji-rules", editedRules);
      setRules(editedRules);
      setEditMode(false);
      toast.success("Rules saved successfully");
    } catch (error) {
      console.error("Error saving rules:", error);
      toast.error("Failed to save rules");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  return (
    <div className="container py-6 mx-auto max-w-[90rem] space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Flomanji Rules</h1>
        {!editMode && (
          <Button onClick={handleEditClick}>
            Edit Rules
          </Button>
        )}
      </div>
      
      {editMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Flomanji Rules</CardTitle>
            <CardDescription>
              Use Markdown formatting to edit the rules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              value={editedRules}
              onChange={(e) => setEditedRules(e.target.value)}
              className="min-h-[600px] font-mono"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveRules}>
                Save Rules
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="rules">
          <TabsList>
            <TabsTrigger value="rules">Rules Content</TabsTrigger>
            <TabsTrigger value="usage">AI Usage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules">
            <Card>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert py-6">
                <div dangerouslySetInnerHTML={{ __html: rulesHtml }} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>How Rules Are Used</CardTitle>
                <CardDescription>
                  Understanding how the AI agents interpret these rules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Game Master Agent</h3>
                  <p className="text-sm text-muted-foreground">
                    The GM agent uses these rules to create narrative descriptions, enforce rule 
                    mechanics, and determine outcomes of player actions, while maintaining Flomanji's 
                    unique blend of horror and absurdist humor.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Player Agents</h3>
                  <p className="text-sm text-muted-foreground">
                    Player agents reference these rules to make strategic decisions about their 2 actions 
                    per turn, stat allocation, and how to respond to hazards (Fight, Flee, Negotiate, or Outsmart).
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Critic Agent</h3>
                  <p className="text-sm text-muted-foreground">
                    The critic agent analyzes how well the twin-timer mechanics (Heat and Weirdness) 
                    create tension, whether hazard DCs are appropriate, and if the game maintains the 
                    B-movie Florida absurdity that makes Flomanji unique.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Rules;
