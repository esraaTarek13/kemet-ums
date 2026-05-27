import { PiWarningFill, PiClipboardText } from "react-icons/pi";
import { DueSoonItem } from "@/types";

export const statusConfig: Record<
  DueSoonItem["status"],
  {
    icon: React.ElementType;
    label: string;
    textClass: string;
    bgClass: string;
  }
> = {
  not_submitted: {
    icon: PiWarningFill,
    label: "Not Submitted",
    textClass: "text-danger",
    bgClass: "bg-danger-bg",
  },
  pending: {
    icon: PiClipboardText,
    label: "Pending",
    textClass: "text-warning",
    bgClass: "bg-warning-bg",
  },
  graded: {
    icon: PiClipboardText,
    label: "Graded",
    textClass: "text-success",
    bgClass: "bg-success-bg",
  },
  late: {
    icon: PiWarningFill,
    label: "Late",
    textClass: "text-danger",
    bgClass: "bg-danger-bg",
  },
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};