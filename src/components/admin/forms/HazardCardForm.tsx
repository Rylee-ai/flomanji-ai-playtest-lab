
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "../CardForm";

interface HazardCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const HazardCardForm = ({ form }: HazardCardFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="subType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sub Type</FormLabel>
            <FormControl>
              <Input 
                placeholder="environmental, creature, social, weird" 
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="difficultyClasses.fight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fight DC</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Fight DC" 
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
        name="difficultyClasses.flee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Flee DC</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Flee DC" 
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
        name="difficultyClasses.negotiate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Negotiate DC</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Negotiate DC" 
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
        name="difficultyClasses.outsmart"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Outsmart DC</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Outsmart DC" 
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
        name="onFailure"
        render={({ field }) => (
          <FormItem>
            <FormLabel>On Failure</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Consequence on failing the check" 
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="onSuccess"
        render={({ field }) => (
          <FormItem>
            <FormLabel>On Success</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Rewards on successful check" 
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="bossHazard"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Boss Hazard</FormLabel>
              <FormDescription>
                Is this a boss level hazard?
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
    </>
  );
};
