import { IconType } from "react-icons";

export interface StatCardProps {
  label: string;
  value: number | string | null;
  icon: IconType;
  description?: string;
  descriptionColor?: "default" | "success" | "warning" | "danger";
  trend?: string;
}