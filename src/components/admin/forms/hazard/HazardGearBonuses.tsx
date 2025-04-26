
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
import { Plus, Minus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";

interface HazardGearBonusesProps {
  form: UseFormReturn<CardFormValues>;
}

export const HazardGearBonuses = ({ form }: HazardGearBonusesProps) => {
  const gearBonuses = form.watch("gearBonuses") || [];

  const addGearBonus = () => {
    const currentBonuses = form.getValues("gearBonuses") || [];
    form.setValue("gearBonuses", [...currentBonuses, { itemName: "", effect: "bonus", bonusValue: 1 }]);
  };

  const removeGearBonus = (index: number) => {
    const currentBonuses = form.getValues("gearBonuses") || [];
    form.setValue("gearBonuses", currentBonuses.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>Gear Bonuses</FormLabel>
        <Button type="button" variant="outline" size="sm" onClick={addGearBonus}>
          <Plus className="h-4 w-4 mr-1" />
          Add Gear Bonus
        </Button>
      </div>

      {gearBonuses.map((_, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-md">
          <div className="flex justify-end">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={() => removeGearBonus(index)}
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
      ))}
    </div>
  );
};
