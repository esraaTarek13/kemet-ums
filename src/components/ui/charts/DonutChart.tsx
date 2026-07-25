"use client";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

export interface DonutChartDatum {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutChartDatum[];
  centerValue: string;
  centerLabel: string;
  startAngle?: number;
  endAngle?: number;
}

export default function DonutChart({
  data,
  centerValue,
  centerLabel,
  startAngle,
  endAngle,
}: DonutChartProps) {
  return (
    <div className="relative h-40 sm:h-48 md:h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="65%"
            outerRadius="85%"
            startAngle={startAngle}
            endAngle={endAngle}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-lg md:text-xl lg:text-2xl font-bold text-accent">{centerValue}</p>
        <p className="text-[10px] uppercase text-text-subtle tracking-wide">
          {centerLabel}
        </p>
      </div>
    </div>
  );
}
