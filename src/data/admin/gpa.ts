import { GpaDistribution } from "@/types";

export const GPA_RANGES: { key: keyof GpaDistribution; label: string }[] = [
  { key: "below_2", label: "<2.0" },
  { key: "2_to_2_5", label: "2-2.5" },
  { key: "2_5_to_3", label: "2.5-3.0" },
  { key: "3_to_3_5", label: "3.0-3.5" },
  { key: "3_5_to_4", label: "3.5-4.0" },
];

export const GPA_BAR_COLOR = "#560E24";