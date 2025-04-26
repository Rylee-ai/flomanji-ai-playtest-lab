
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CardFormValues } from "@/types/forms/card-form";

interface MissionBasicInfoProps {
  form: UseFormReturn<CardFormValues>;
}

export const MissionBasicInfo = ({ form }: MissionBasicInfoProps) => {
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
    </div>
  );
};
