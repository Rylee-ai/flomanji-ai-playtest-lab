
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GearCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const GearCardForm = ({ form }: GearCardFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gear category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="consumable">Consumable</SelectItem>
                <SelectItem value="tool">Tool</SelectItem>
                <SelectItem value="weapon">Weapon</SelectItem>
                <SelectItem value="vehicle">Vehicle</SelectItem>
                <SelectItem value="supply">Supply</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="actionCost"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Action Cost</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Number of actions to use" 
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
        name="consumable"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Consumable</FormLabel>
              <FormDescription>
                Is this item consumed on use?
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
        name="uses"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Uses</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Number of uses" 
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
        name="passive"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Passive Effect</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Passive bonus or effect" 
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
