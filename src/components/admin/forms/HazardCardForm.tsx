
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";
import { HazardBasicInfo } from "./hazard/HazardBasicInfo";
import { HazardDifficultyClasses } from "./hazard/HazardDifficultyClasses";
import { HazardGearBonuses } from "./hazard/HazardGearBonuses";

interface HazardCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const HazardCardForm = ({ form }: HazardCardFormProps) => {
  return (
    <>
      <HazardBasicInfo form={form} />
      <HazardDifficultyClasses form={form} />
      <HazardGearBonuses form={form} />
    </>
  );
};
