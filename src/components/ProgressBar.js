import React from "react";

const ProgressBar = ({ pct }) => {
  return (
    <div className="w-full bg-gray-200 l h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue h-2.5 rounded-full dark:bg-gray-300"
        style={{
          width: `${pct}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
