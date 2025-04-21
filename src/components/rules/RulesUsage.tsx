
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RulesUsage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Game Master Agent</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The GM agent uses these rules to create narrative descriptions, enforce rule 
                mechanics, and determine outcomes of player actions, while maintaining Flomanji's 
                unique blend of horror and absurdist humor.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium">Key Rule Applications:</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Interprets dice mechanics (2d6 + stat ≥ DC) to resolve skill checks</li>
                  <li>Manages Heat and Weirdness progression based on chapter 7 thresholds</li>
                  <li>Creates region descriptions from chapter 4 region specifications</li>
                  <li>Designs hazards with multiple response options (Fight, Flee, Negotiate, Outsmart)</li>
                  <li>Enforces the twin-timer mechanics that drive gameplay tension</li>
                </ul>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>In Simulations:</strong> The GM agent tracks the game state, coordinates turn sequencing, 
                and applies all mechanical effects from the core rules processor.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Player Agents</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Player agents reference these rules to make strategic decisions about their 2 actions 
                per turn, stat allocation, and how to respond to hazards (Fight, Flee, Negotiate, or Outsmart).
              </p>
              <div className="space-y-2">
                <h4 className="font-medium">Key Rule Applications:</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Prioritizes actions based on chapter 3.3 action catalog</li>
                  <li>Calculates optimal hazard responses based on character stats and DCs</li>
                  <li>Manages personal Weirdness thresholds (Attuned, Hallucinating, Paranoid)</li>
                  <li>Strategically uses gear and abilities according to chapter 5 card mechanics</li>
                  <li>Plans movement through regions based on chapter 4 region effects</li>
                </ul>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>In Simulations:</strong> Player agents analyze risk vs. reward for each action, 
                coordinate with teammates, and adapt to changing Heat and Weirdness conditions to 
                achieve mission objectives while avoiding Flomanjification.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Critic Agent</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The critic agent analyzes how well the twin-timer mechanics (Heat and Weirdness) 
                create tension, whether hazard DCs are appropriate, and if the game maintains the 
                B-movie Florida absurdity that makes Flomanji unique.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium">Key Rule Applications:</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Evaluates rule implementation accuracy across all game systems</li>
                  <li>Assesses difficulty balance based on chapter 3.2 DC standards</li>
                  <li>Measures pacing through Heat progression against intended mission duration</li>
                  <li>Analyzes effectiveness of card interactions and region effects</li>
                  <li>Provides feedback on narrative-mechanical integration</li>
                </ul>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>In Simulations:</strong> The critic agent generates detailed analytics on 
                mission success rates, character performance metrics, and balance recommendations 
                for mission and card adjustments based on observed gameplay patterns.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Game Engine Integration</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The Flomanji rules are directly integrated into the game engine, which handles all mechanical
                aspects of the simulation through several key components:
              </p>
              <div className="space-y-2">
                <h4 className="font-medium">Core Components:</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li><strong>FlomanjiRulesProcessor:</strong> Central rules interpreter that validates actions and processes gameplay effects</li>
                  <li><strong>TurnManager:</strong> Tracks and advances game turns according to chapter 5.3 turn phases</li>
                  <li><strong>HeatManager:</strong> Controls Heat progression and threshold effects from chapter 7.1</li>
                  <li><strong>ActionValidator:</strong> Ensures player actions conform to rules in chapter 3.3</li>
                  <li><strong>Win/Loss Conditions:</strong> Evaluates mission objectives and fail states continuously</li>
                </ul>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>For Developers:</strong> The rules text serves as the authoritative source for all game logic implementation. 
                When adding new features or cards, reference the specific rule sections to ensure consistent mechanics.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RulesUsage;
