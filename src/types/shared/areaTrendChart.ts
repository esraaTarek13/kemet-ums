import type { ComponentProps } from "react";
import type { Tooltip } from "recharts";

export type TooltipFormatter = ComponentProps<typeof Tooltip>["formatter"];
export type TooltipLabelFormatter = ComponentProps<
  typeof Tooltip
>["labelFormatter"];

export interface AreaTrendChartProps<T> {
  data: T[] | undefined;
  xAxisKey: string;
  dataKey: string;
  gradientId?: string;
  strokeWidth?: number;
  xAxisTickFormatter?: (value: string) => string;
  tooltipFormatter?: TooltipFormatter;
  tooltipLabelFormatter?: TooltipLabelFormatter;
}