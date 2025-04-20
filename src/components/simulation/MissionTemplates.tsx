
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SimulationConfig } from "@/types";

interface MissionTemplate {
  name: string;
  description: string;
  startingHeat: number;
  missionType: SimulationConfig['missionType'];
}

interface MissionTemplatesProps {
  onTemplateSelect: (template: MissionTemplate) => void;
}

const missionTemplates: MissionTemplate[] = [
  {
    name: "Everglades Escape",
    description: "Escape the Everglades before a hurricane hits. Navigate through swamp regions while avoiding dangerous wildlife and rising Heat.",
    startingHeat: 3,
    missionType: "escape"
  },
  {
    name: "Arcade Quest",
    description: "Find the legendary Video Game Arcade hidden somewhere in the city. Navigate urban regions while managing Weirdness and avoiding Night Stalkers.",
    startingHeat: 2,
    missionType: "exploration"
  },
  {
    name: "Gator-Aid on I-95",
    description: "A tanker has spilled on I-95, creating mutant gators. Collect antidote samples from Highway regions while escorting survivors to safety.",
    startingHeat: 4,
    missionType: "escort"
  }
];

const MissionTemplates = ({ onTemplateSelect }: MissionTemplatesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mission Templates</CardTitle>
        <CardDescription>
          Quick-start with a pre-configured mission template
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {missionTemplates.map((template, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:bg-accent/50 transition-colors" 
            onClick={() => onTemplateSelect(template)}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{template.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <div className="mt-2">
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                  Starting Heat: {template.startingHeat}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default MissionTemplates;
