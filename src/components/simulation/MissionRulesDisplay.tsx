
import React from "react";
import { MissionSheet } from "@/types/cards/mission";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface MissionRulesDisplayProps {
  mission: MissionSheet;
}

const MissionRulesDisplay: React.FC<MissionRulesDisplayProps> = ({ mission }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{mission.name}</CardTitle>
            <CardDescription>
              {mission.keywords.join(", ")}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {mission.icons?.map((icon, i) => (
              <Badge key={i} variant="outline" title={icon.meaning}>{icon.symbol}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="objectives">Objectives</TabsTrigger>
            <TabsTrigger value="rules">Special Rules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div>
              <h3 className="font-medium mb-1">Mission Hook</h3>
              <p>{mission.hook}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Map Layout</h3>
                <p>{mission.mapLayout}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Starting Heat</h3>
                <p>{mission.startingHeat}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Extraction Point</h3>
              <p>{mission.extractionRegion}</p>
            </div>
            
            {mission.scaling && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-1">Small Group Scaling</h3>
                  <p>{mission.scaling.small}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Large Group Scaling</h3>
                  <p>{mission.scaling.large}</p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-1">Difficulty</h3>
                <p>{mission.difficultyRating ? `${mission.difficultyRating}/10` : 'Not rated'}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Est. Duration</h3>
                <p>{mission.estimatedDuration ? `${mission.estimatedDuration} rounds` : 'Unknown'}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Players</h3>
                <p>{mission.recommendedPlayerCount?.join(', ') || 'Any'}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="objectives" className="space-y-4 pt-4">
            {mission.objectives.map((objective, index) => (
              <div key={index} className="border p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{objective.description}</h3>
                  <Badge variant={objective.required ? "default" : "outline"}>
                    {objective.required ? "Required" : "Optional"}
                  </Badge>
                </div>
                {objective.difficultyLevel && (
                  <div className="text-xs text-muted-foreground mb-1">
                    Difficulty: {objective.difficultyLevel}/5
                  </div>
                )}
                {objective.reward && (
                  <div className="bg-secondary/50 p-2 rounded text-sm">
                    <span className="font-medium">Reward:</span> {objective.reward}
                  </div>
                )}
                {objective.completionCheck && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">How to complete:</span> {objective.completionCheck}
                  </div>
                )}
              </div>
            ))}
            
            {mission.phases && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Mission Phases</h3>
                {mission.phases.map((phase, index) => (
                  <div key={index} className="border p-3 rounded-md mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{phase.name}</h4>
                      {phase.timeLimit && (
                        <Badge variant="outline">
                          {phase.timeLimit} {phase.timeLimit === 1 ? 'round' : 'rounds'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mb-2">{phase.description}</p>
                    
                    <div className="space-y-2">
                      {phase.objectives.map((obj, idx) => (
                        <div key={idx} className="bg-secondary/20 p-2 rounded text-sm">
                          <div className="flex items-center gap-2">
                            <span>{obj.description}</span>
                            {obj.required && <Badge variant="secondary">Required</Badge>}
                          </div>
                          {obj.reward && <div className="text-xs mt-1">Reward: {obj.reward}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-4 pt-4">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MissionRulesDisplay;
