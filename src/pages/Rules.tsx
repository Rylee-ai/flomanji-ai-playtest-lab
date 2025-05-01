
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import RulesViewer from "@/components/rules/RulesViewer";
import RulesEditor from "@/components/rules/RulesEditor";
import RulesUsage from "@/components/rules/RulesUsage";
import RulesQuickReference from "@/components/rules/RulesQuickReference";
import { getExampleRules } from "@/lib/api";

const Rules = () => {
  const [rules, setRules] = useState("");
  const [aiUsage, setAiUsage] = useState("");
  const [quickRef, setQuickRef] = useState("");
  const [editMode, setEditMode] = useState<"rules" | "usage" | "reference" | null>(null);
  const [editedContent, setEditedContent] = useState("");
  
  useEffect(() => {
    // Load content from localStorage or use defaults
    const savedRules = localStorage.getItem("flomanji-rules");
    const savedUsage = localStorage.getItem("flomanji-ai-usage");
    const savedRef = localStorage.getItem("flomanji-quick-reference");
    
    setRules(savedRules || getExampleRules());
    setAiUsage(savedUsage || "");
    setQuickRef(savedRef || "Default Quick Reference Content");
  }, []);

  const handleEditClick = (section: "rules" | "usage" | "reference") => {
    switch (section) {
      case "rules":
        setEditedContent(rules);
        break;
      case "usage":
        setEditedContent(aiUsage);
        break;
      case "reference":
        setEditedContent(quickRef);
        break;
    }
    setEditMode(section);
  };

  const handleSaveContent = () => {
    try {
      switch (editMode) {
        case "rules":
          localStorage.setItem("flomanji-rules", editedContent);
          setRules(editedContent);
          break;
        case "usage":
          localStorage.setItem("flomanji-ai-usage", editedContent);
          setAiUsage(editedContent);
          break;
        case "reference":
          localStorage.setItem("flomanji-quick-reference", editedContent);
          setQuickRef(editedContent);
          break;
      }
      setEditMode(null);
      toast.success("Content saved successfully");
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedContent("");
  };

  const renderEditButton = (section: "rules" | "usage" | "reference") => {
    if (editMode) return null;
    return (
      <Button onClick={() => handleEditClick(section)}>
        Edit {section.charAt(0).toUpperCase() + section.slice(1)}
      </Button>
    );
  };

  return (
    <div className="container py-6 mx-auto max-w-[90rem] space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Flomanji Rules</h1>
      </div>
      
      {editMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit {editMode.charAt(0).toUpperCase() + editMode.slice(1)}</CardTitle>
            <CardDescription>
              Use Markdown formatting to edit the content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RulesEditor 
              editedRules={editedContent}
              setEditedRules={setEditedContent}
              onSave={handleSaveContent}
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
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Rules</CardTitle>
                {renderEditButton("rules")}
              </CardHeader>
              <CardContent className="py-6">
                <RulesViewer rules={rules} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>How Rules Are Used</CardTitle>
                  <CardDescription>
                    Understanding how the AI agents interpret and apply these rules during simulations
                  </CardDescription>
                </div>
                {renderEditButton("usage")}
              </CardHeader>
              <CardContent>
                {aiUsage ? (
                  <RulesViewer rules={aiUsage} />
                ) : (
                  <RulesUsage />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reference">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Quick Reference</CardTitle>
                {renderEditButton("reference")}
              </CardHeader>
              <CardContent>
                <RulesViewer rules={quickRef} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Rules;
