
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import RulesViewer from "@/components/rules/RulesViewer";
import RulesEditor from "@/components/rules/RulesEditor";
import RulesUsage from "@/components/rules/RulesUsage";
import RulesQuickReference from "@/components/rules/RulesQuickReference";
import { getExampleRules } from "@/lib/api";

const Rules = () => {
  const [rules, setRules] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedRules, setEditedRules] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load rules from localStorage or use default
    const loadRules = async () => {
      setIsLoading(true);
      try {
        const savedRules = localStorage.getItem("flonaki-rules");
        if (savedRules) {
          setRules(savedRules);
        } else {
          // Use the complete rules from API
          const exampleRules = await getExampleRules();
          setRules(exampleRules);
        }
      } catch (error) {
        console.error("Error loading rules:", error);
        toast.error("Failed to load rules");
      } finally {
        setIsLoading(false);
      }
    };

    loadRules();
  }, []);

  const handleEditClick = () => {
    setEditedRules(rules);
    setEditMode(true);
  };

  const handleSaveRules = () => {
    try {
      localStorage.setItem("flonaki-rules", editedRules);
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
        <h1 className="text-3xl font-bold tracking-tight">Flonaki Rules</h1>
        {!editMode && !isLoading && (
          <Button onClick={handleEditClick}>
            Edit Rules
          </Button>
        )}
      </div>
      
      {isLoading ? (
        <Card className="p-6">
          <div className="flex justify-center">
            <p className="text-muted-foreground">Loading rules...</p>
          </div>
        </Card>
      ) : editMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Flonaki Rules</CardTitle>
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
            <TabsTrigger value="reference">Quick Reference</TabsTrigger>
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
                  Understanding how the AI agents interpret and apply these rules during simulations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RulesUsage />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reference">
            <RulesQuickReference />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Rules;
