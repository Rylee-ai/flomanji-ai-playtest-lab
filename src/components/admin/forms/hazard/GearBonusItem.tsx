
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";

interface GearBonusItemProps {
  form: UseFormReturn<CardFormValues>;
  index: number;
  onRemove: () => void;
}

export const GearBonusItem = ({ form, index, onRemove }: GearBonusItemProps) => {
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
        name={`gearBonuses.${index}.itemName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Item Name</FormLabel>
            <FormControl>
              <Input placeholder="Gear name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`gearBonuses.${index}.effect`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Effect Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select effect" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="autoSuccess">Auto Success</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch(`gearBonuses.${index}.effect`) === "bonus" && (
        <FormField
          control={form.control}
          name={`gearBonuses.${index}.bonusValue`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bonus Value</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Bonus amount" 
                  {...field}
                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : 1)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
