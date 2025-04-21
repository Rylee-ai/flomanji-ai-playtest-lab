
import React from "react";
import { Badge } from "@/components/ui/badge";

interface SectionBadgeProps {
  number: string | number;
  color: "amber" | "blue" | "emerald" | string;
}

export const SectionBadge = ({ number, color }: SectionBadgeProps) => {
  // Map color names to their respective tailwind classes
  const colorMap = {
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      glow: "bg-amber-500/20",
      hover: "group-hover:bg-amber-500/30"
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      glow: "bg-blue-500/20",
      hover: "group-hover:bg-blue-500/30"
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      glow: "bg-emerald-500/20",
      hover: "group-hover:bg-emerald-500/30"
    }
  };

  const colors = colorMap[color as keyof typeof colorMap] || colorMap.amber;

  return (
    <div className="relative group animate-fade-in">
      <div className={`absolute inset-0 rounded-full ${colors.glow} blur-lg ${colors.hover} transition-colors`} />
      <Badge
        variant="outline"
        className={`relative z-10 h-10 w-10 text-xl flex items-center justify-center p-0 font-bold ${colors.border} ${colors.bg} ${colors.text} shadow-lg group-hover:scale-110 transition-transform`}
      >
        {number}
      </Badge>
    </div>
  );
};
