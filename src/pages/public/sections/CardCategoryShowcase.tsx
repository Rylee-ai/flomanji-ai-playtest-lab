
import React from "react";

interface CardCategoryShowcaseProps {
  bgImage: string;
  icon: React.ReactNode;
  category: string;
  count: number;
  description: string;
  className?: string;
}

export const CardCategoryShowcase: React.FC<CardCategoryShowcaseProps> = ({
  bgImage,
  icon,
  category,
  count,
  description,
  className = "",
}) => (
  <div className={`rounded-2xl border-2 border-[#393A3F] bg-[#191A1E] shadow-lg flex flex-col p-0 transition-all min-h-[450px] aspect-card ${className}`}>
    {/* Card Face */}
    <div className="relative rounded-t-2xl overflow-hidden" style={{ height: "260px", background: "#191A1E" }}>
      <img
        src={bgImage}
        alt="Flomanji card art"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0.36, filter: "brightness(0.92)" }}
        draggable={false}
      />
      {/* Optional: place a faint 'FLOMANJI' or symbol overlays here */}
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

