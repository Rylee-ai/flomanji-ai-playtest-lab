import React from "react";

interface CardCategoryShowcaseProps {
  icon: React.ReactNode;
  category: string;
  count: number | string;
  description: string;
  className?: string;
}

export const CardCategoryShowcase: React.FC<CardCategoryShowcaseProps> = ({
  icon,
  category,
  count,
  description,
  className = "",
}) => (
  <div className={`rounded-2xl border-2 border-[#393A3F] bg-[#191A1E] shadow-lg flex flex-col p-0 transition-all min-h-[340px] aspect-card ${className}`}>
    {/* Card Face Placeholder */}
    <div className="relative rounded-t-2xl bg-[#242429] h-[175px] flex items-center justify-center">
      {/* Empty placeholder for future card art */}
      {/* This area intentionally left blank, matching reference screenshot */}
    </div>
    {/* Info Footer */}
    <div className="flex flex-col justify-between px-5 pt-5 pb-6 h-full">
      <div className="flex items-center gap-2 text-gray-100">
        {icon}
        <span className="font-semibold tracking-wide uppercase text-xs">{category}</span>
        <span className="flex-grow"></span>
        <span className="font-bold text-2xl text-white">{count}</span>
      </div>
      <div className="mt-2 text-gray-400 text-sm leading-snug">{description}</div>
    </div>
  </div>
);
