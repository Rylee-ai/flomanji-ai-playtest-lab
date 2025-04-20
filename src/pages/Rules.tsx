
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import RulesViewer from "@/components/rules/RulesViewer";
import RulesEditor from "@/components/rules/RulesEditor";
import RulesUsage from "@/components/rules/RulesUsage";
import { getExampleRules } from "@/lib/api";

const Rules = () => {
  const [rules, setRules] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedRules, setEditedRules] = useState("");
  
  useEffect(() => {
    // Load rules from localStorage or use default
    const savedRules = localStorage.getItem("flomanji-rules");
    if (savedRules) {
      setRules(savedRules);
    } else {
      // Use the complete rules from API
      setRules(getExampleRules());
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
            <RulesEditor 
              editedRules={editedRules}
              setEditedRules={setEditedRules}
              onSave={handleSaveRules}
              onCancel={handleCancelEdit}
            />
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
              <CardContent className="py-6">
                <RulesViewer rules={rules} />
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
              <CardContent>
                <RulesUsage />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Rules;
