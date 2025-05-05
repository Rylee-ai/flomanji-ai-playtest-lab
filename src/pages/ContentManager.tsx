
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileBasedModeHeader } from "@/components/admin/FileBasedModeHeader";
import GameContentManager from "@/components/admin/GameContentManager";
import MissionOverviewGrid from "@/components/admin/MissionOverviewGrid";
import { CardType } from "@/types/cards";

const ContentManager = () => {
  const [activeSection, setActiveSection] = React.useState<"cards" | "missions">("cards");

  return (
    <div className="container py-6">
      <FileBasedModeHeader />

      <Tabs value={activeSection} onValueChange={(value) => setActiveSection(value as "cards" | "missions")}>
        <TabsList className="mb-4">
          <TabsTrigger value="cards">Card Library</TabsTrigger>
          <TabsTrigger value="missions">Mission Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cards">
          <GameContentManager />
        </TabsContent>
        
        <TabsContent value="missions">
          <MissionOverviewGrid analyticsData={[]} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
