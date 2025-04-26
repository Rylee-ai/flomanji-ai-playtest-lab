
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";

interface HazardBasicInfoProps {
  form: UseFormReturn<CardFormValues>;
}

export const HazardBasicInfo = ({ form }: HazardBasicInfoProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="subType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sub Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select hazard subtype" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="creature">Creature</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="weird">Weird</SelectItem>
              </SelectContent>
            </Select>
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
              <FormMessage>
                Is this a boss level hazard?
              </FormMessage>
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
