
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
import { CardFormValues } from "@/types/forms/card-form";

interface TreasureCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const TreasureCardForm = ({ form }: TreasureCardFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="value"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Value</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Card Value" 
                {...field}
                value={field.value ?? ""}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="consumable"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Consumable</FormLabel>
              <FormDescription>
                Is this card consumed when used?
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
        name="passiveEffect"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Passive Effect</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Continuous effect when owned" 
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
        name="useEffect"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Use Effect</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Effect when card is used/activated" 
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
