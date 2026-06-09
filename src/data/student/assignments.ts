import { Assignment } from "@/types";
import { PiWarningFill, PiClipboardText } from "react-icons/pi";
import { RiFileCheckLine } from "react-icons/ri";

export const STATS_CONFIG = [
  { title: "Overdue", color: "text-danger", border: "border-danger" },
  {
    title: "Not Submitted",
    color: "text-text-secondary",
    border: "border-text-secondary",
  },
  { title: "Pending", color: "text-pending", border: "border-pending" },
  { title: "Graded", color: "text-accent", border: "border-accent" },
];

export const TABS = ["All", "Not Submitted", "Overdue", "Pending", "Graded"];

export const LABELS = {
  LATE: "Late",
  NOT_SUBMITTED: "Not Submitted",
} as const;

export const statusConfig: Record<
  Assignment["status"],
  {
    icon: React.ElementType;
    label: string;
    textClass: string;
    bgClass: string;
  }
> = {
  not_submitted: {
    icon: PiClipboardText,
    label: LABELS.NOT_SUBMITTED,
    textClass: "text-text-secondary",
    bgClass: "bg-bg-subtle",
  },
  pending: {
    icon: PiClipboardText,
    label: "Pending",
    textClass: "text-pending",
    bgClass: "bg-pending-bg/20",
  },
  graded: {
    icon: RiFileCheckLine,
    label: "Graded",
    textClass: "text-text-white",
    bgClass: "bg-accent",
  },
  overdue: {
    icon: PiWarningFill,
    label: LABELS.LATE,
    textClass: "text-danger",
    bgClass: "bg-danger-bg",
  },
};
