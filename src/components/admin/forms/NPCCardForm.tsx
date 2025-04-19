
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "../CardForm";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface NPCCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const NPCCardForm = ({ form }: NPCCardFormProps) => {
  const actions = form.watch("actions") || [];

  const addAction = () => {
    const currentActions = form.getValues("actions") || [];
    form.setValue("actions", [...currentActions, { description: "", cost: 1, effect: "" }]);
  };

  const removeAction = (index: number) => {
    const currentActions = form.getValues("actions") || [];
    form.setValue("actions", currentActions.filter((_, i) => i !== index));
  };

  return (
    <>
      <FormField
        control={form.control}
        name="checkDC"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Base Check DC</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Difficulty Check" 
                {...field}
                value={field.value || ""}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel>NPC Actions</FormLabel>
          <Button type="button" variant="outline" size="sm" onClick={addAction}>
            <Plus className="h-4 w-4 mr-1" />
            Add Action
          </Button>
        </div>

        {actions.map((action, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-md">
            <div className="flex justify-end">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeAction(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>

            <FormField
              control={form.control}
              name={`actions.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Action description" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`actions.${index}.cost`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action Cost</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Number of actions required" 
                      {...field}
                      value={field.value || 1}
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`actions.${index}.effect`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effect</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What happens when this action is taken" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </>
  );
};
