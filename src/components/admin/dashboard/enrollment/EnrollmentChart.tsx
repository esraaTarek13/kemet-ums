"use client";
import { EnrollmentTrend } from "@/types";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: EnrollmentTrend[] | undefined;
}

export default function EnrollmentChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ right: 10, left: -30, bottom: 0 }}>
        {/* Gradient definition for area fill */}
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

        {/* X-axis showing month labels */}
        <XAxis
          dataKey="month"
          tick={{ fontSize: 10, fill: "var(--color-text-subtle)" }}
          tickLine={false}
          axisLine={{ stroke: "var(--color-border, #e5e5e5)" }}
          tickFormatter={(value) => value.toUpperCase()}
          tickMargin={10}
        />

        {/* Themed tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />

        {/* Enrollment count area line */}
        <Area
          type="monotone"
          dataKey="count"
          stroke="var(--color-accent)"
          strokeWidth={3}
          fill="url(#enrollGradient)"
          fillOpacity={1}
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
