
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
              <Input placeholder="Hazard Subtype" {...field} />
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
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};
