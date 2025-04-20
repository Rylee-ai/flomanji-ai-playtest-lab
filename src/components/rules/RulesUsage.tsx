
import React from "react";

const RulesUsage = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default RulesUsage;
