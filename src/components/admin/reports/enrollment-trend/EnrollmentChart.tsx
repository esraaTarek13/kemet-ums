"use client";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";

interface ChartDataItem {
  label: string;
  fullLabel: string;
  count: number;
}

interface Props {
  data: ChartDataItem[];
}

export default function EnrollmentChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 10, left: -30, bottom: 0 }}
      >
        <defs>
          <linearGradient id="enrollGradient" x1="0" y1="0" x2="0" y2="1">
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
          dataKey="label"
          axisLine={{ stroke: "var(--color-border, #e5e5e5)" }}
          tickLine={false}
          tick={{ fontSize: 11, fill: "var(--color-text-subtle, #999)" }}
        />

        <Tooltip
          formatter={(value) => [`${value} students`, "Enrollment"]}
          labelFormatter={(_, payload) =>
            payload?.[0]?.payload?.fullLabel ?? ""
          }
          contentStyle={{
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />

        <Area
          type="monotone"
          dataKey="count"
          stroke="var(--color-accent)"
          strokeWidth={2}
          fill="url(#enrollGradient)"
          dot={{
            r: 4,
            fill: "var(--color-text-secondary)",
            strokeWidth: 0,
          }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
