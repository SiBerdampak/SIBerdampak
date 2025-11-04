"use client";
import React from "react";

interface ProgressBarProps {
  value: number; // current progress
  max?: number; // total progress value, defaults to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100 }) => {
  const percentage = Math.min((value / max) * 100, 100); // cap at 100%

  return (
    <div className="flex items-center mt-1 mb-5">
      <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
        <div
          className="h-full bg-[#CBFF08] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="ml-3 font-semibold text-white">{max}</span>
    </div>
  );
};

export default ProgressBar;
