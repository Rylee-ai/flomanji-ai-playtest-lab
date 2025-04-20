
import React from "react";
import ApiKeySettings from "@/components/settings/ApiKeySettings";
import { ModelSettings } from "@/components/settings/ModelSettings";
import { AboutSection } from "@/components/settings/AboutSection";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      
      <ApiKeySettings />
      <ModelSettings />
      <AboutSection />
    </div>
  );
};

export default Settings;
