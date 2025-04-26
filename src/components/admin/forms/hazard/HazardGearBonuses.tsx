
import React from "react";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";
import { GearBonusItem } from "./GearBonusItem";

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
        <GearBonusItem
          key={index}
          form={form}
          index={index}
          onRemove={() => removeGearBonus(index)}
        />
      ))}
    </div>
  );
};
