"use client";

import { AreaTrendChartProps } from "@/types/shared/areaTrendChart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AreaTrendChart<T>({
  data,
  xAxisKey,
  dataKey,
  gradientId = "areaTrendGradient",
  strokeWidth = 3,
  xAxisTickFormatter,
  tooltipFormatter,
  tooltipLabelFormatter,
}: AreaTrendChartProps<T>) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 10, left: -30, bottom: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="20%"
              stopColor="var(--color-accent)"
              stopOpacity={0.2}
            />
            <stop
              offset="95%"
              stopColor="var(--color-accent)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <XAxis
          dataKey={xAxisKey}
          tick={{ fontSize: 10, fill: "var(--color-text-subtle)" }}
          tickLine={false}
          axisLine={{ stroke: "var(--color-border, #e5e5e5)" }}
          tickFormatter={xAxisTickFormatter}
          tickMargin={10}
        />

        <YAxis domain={[0, "dataMax"]} hide />

        <Tooltip
          formatter={tooltipFormatter}
          labelFormatter={tooltipLabelFormatter}
          contentStyle={{
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />

        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="var(--color-accent)"
          strokeWidth={strokeWidth}
          fill={`url(#${gradientId})`}
          fillOpacity={1}
          dot={{ r: 4, fill: "var(--color-text-secondary)", strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
