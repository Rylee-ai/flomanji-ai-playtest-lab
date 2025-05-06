
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileBasedModeHeader } from "@/components/admin/FileBasedModeHeader";
import GameContentManager from "@/components/admin/GameContentManager";
import MissionOverviewGrid from "@/components/admin/MissionOverviewGrid";
import { CardType } from "@/types/cards";
import { log } from "@/utils/logging";

const ContentManager = () => {
  const [activeSection, setActiveSection] = React.useState<"cards" | "missions">("cards");

  // Log page visit for analytics
  useEffect(() => {
    log.info("Content Manager page accessed", {
      activeSection,
      timestamp: new Date().toISOString()
    });
  }, []);

  // Log section changes
  const handleSectionChange = (value: string) => {
    const newSection = value as "cards" | "missions";
    log.info("Content Manager section changed", {
      from: activeSection,
      to: newSection
    });
    setActiveSection(newSection);
  };

  return (
    <div className="container py-6">
      <FileBasedModeHeader />

      <Tabs value={activeSection} onValueChange={handleSectionChange}>
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
