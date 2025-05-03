
import React from "react";
import { TransformFileSelector } from "./card-transformer/TransformFileSelector";
import { CardTransformResults } from "./card-transformer/CardTransformResults";
import { ProgressIndicator } from "./card-transformer/ProgressIndicator";
import { useCardTransform } from "./card-transformer/useCardTransform";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";

interface CardDataTransformerProps {
  onTransformed: (cards: CardFormValues[], results: CardImportResult) => void;
}

export const CardDataTransformer = ({ onTransformed }: CardDataTransformerProps) => {
  const {
    cardType,
    setCardType,
    isProcessing,
    processProgress,
    transformedCards,
    showResults,
    setShowResults,
    validationErrors,
    handleFileUpload,
    handleCompleteTransform
  } = useCardTransform({ onTransformed });

  return (
    <div className="flex flex-col">
      <TransformFileSelector 
        cardType={cardType}
        setCardType={setCardType}
        isProcessing={isProcessing}
        onFileSelected={handleFileUpload}
      />
      
      <ProgressIndicator 
        isProcessing={isProcessing} 
        progress={processProgress} 
      />
      
      <CardTransformResults 
        showResults={showResults}
        setShowResults={setShowResults}
        transformedCards={transformedCards}
        validationErrors={validationErrors}
        cardType={cardType}
        onCompleteTransform={handleCompleteTransform}
      />
    </div>
  );
};
