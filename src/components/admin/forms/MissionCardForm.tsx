import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CardFormValues } from "@/types/forms/card-form";
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface MissionCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const MissionCardForm = ({ form }: MissionCardFormProps) => {
  const objectives = form.watch("objectives") || [];
  
  const addObjective = () => {
    const currentObjectives = form.getValues("objectives") || [];
    form.setValue("objectives", [...currentObjectives, { 
      description: "", 
      required: true,
      reward: "",
      completionCheck: "",
      difficultyLevel: 1
    }]);
  };

  const removeObjective = (index: number) => {
    const currentObjectives = form.getValues("objectives") || [];
    form.setValue("objectives", currentObjectives.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="hook"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mission Hook</FormLabel>
            <FormControl>
              <Textarea placeholder="The initial setup for the mission" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="mapLayout"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Map Layout</FormLabel>
            <FormControl>
              <Textarea placeholder="Description of the map layout" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="startingHeat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Starting Heat</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Initial heat level" 
                {...field}
                value={field.value || ""}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="extractionRegion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Extraction Region</FormLabel>
            <FormControl>
              <Input placeholder="Where players must go to complete the mission" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel>Mission Objectives</FormLabel>
          <Button type="button" variant="outline" size="sm" onClick={addObjective}>
            <Plus className="h-4 w-4 mr-1" />
            Add Objective
          </Button>
        </div>

        {objectives.map((objective, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-md">
            <div className="flex justify-end">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeObjective(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>

            <FormField
              control={form.control}
              name={`objectives.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Objective description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`objectives.${index}.required`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Required</FormLabel>
                    <FormDescription>
                      Is this objective required to complete the mission?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`objectives.${index}.reward`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reward</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Reward for completing this objective" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`objectives.${index}.difficultyLevel`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level (1-5)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1}
                      max={5}
                      placeholder="Difficulty level" 
                      {...field}
                      value={field.value || 1}
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
      
      <FormField
        control={form.control}
        name="scaling.small"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Small Group Scaling</FormLabel>
            <FormControl>
              <Textarea placeholder="Adjustments for 1-2 players" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="scaling.large"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Large Group Scaling</FormLabel>
            <FormControl>
              <Textarea placeholder="Adjustments for 4+ players" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="recommendedPlayerCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recommended Player Count</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 2-4" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="estimatedDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estimated Duration (rounds)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Expected number of rounds" 
                {...field}
                value={field.value || ""}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="difficultyRating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Difficulty Rating (1-10)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min={1}
                max={10}
                placeholder="Overall difficulty" 
                {...field}
                value={field.value || ""}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
