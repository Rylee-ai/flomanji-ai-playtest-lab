
import React from "react";
import { MissionSheet } from "@/types/cards/mission";
import { Badge } from "@/components/ui/badge";

interface MissionRulesTabProps {
  mission: MissionSheet;
}

const MissionRulesTab: React.FC<MissionRulesTabProps> = ({ mission }) => (
  <div className="space-y-4 pt-4">
    <div>
      <h3 className="font-medium mb-2">Special Rules</h3>
      <ul className="space-y-2 list-disc list-inside">
        {mission.specialRules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
    {mission.challenges && mission.challenges.length > 0 && (
      <div className="mt-4">
        <h3 className="font-medium mb-2">Mission Challenges</h3>
        {mission.challenges.map((challenge, index) => (
          <div key={index} className="border p-3 rounded-md mb-3">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{challenge.description}</h4>
              <Badge>
                {challenge.frequency === 'once' ? 'One-time' : 
                  challenge.frequency === 'recurring' ? 'Recurring' : 'Triggered'}
              </Badge>
            </div>
            {challenge.trigger && (
              <div className="text-sm mb-1">
                <span className="font-medium">Trigger:</span> {challenge.trigger}
              </div>
            )}
            <div className="flex gap-4 text-sm">
              {challenge.heatEffect !== undefined && challenge.heatEffect !== 0 && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Heat:</span>
                  <span className={challenge.heatEffect > 0 ? "text-red-500" : "text-green-500"}>
                    {challenge.heatEffect > 0 ? `+${challenge.heatEffect}` : challenge.heatEffect}
                  </span>
                </div>
              )}
              {challenge.weirdnessEffect !== undefined && challenge.weirdnessEffect !== 0 && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Weirdness:</span>
                  <span className={challenge.weirdnessEffect > 0 ? "text-purple-500" : "text-green-500"}>
                    {challenge.weirdnessEffect > 0 ? `+${challenge.weirdnessEffect}` : challenge.weirdnessEffect}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
    <div className="mt-4">
      <h3 className="font-medium mb-1">Flavor Text</h3>
      <p className="italic">{mission.flavor}</p>
    </div>
  </div>
);

export default MissionRulesTab;
