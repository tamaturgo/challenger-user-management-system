import React from "react";

interface GraphLegendProps {
  data: { label: string; color: string }[];
}

const GraphLegend: React.FC<GraphLegendProps> = ({ data }) => {
  return (
    <div className="flex flex-col">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: item.color }}
          ></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default GraphLegend;