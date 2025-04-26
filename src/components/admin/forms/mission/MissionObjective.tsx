
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Minus } from 'lucide-react';
import { CardFormValues } from "@/types/forms/card-form";

interface MissionObjectiveProps {
  form: UseFormReturn<CardFormValues>;
  index: number;
  onRemove: () => void;
}

export const MissionObjective = ({ form, index, onRemove }: MissionObjectiveProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-md">
      <div className="flex justify-end">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={onRemove}
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
  );
};
