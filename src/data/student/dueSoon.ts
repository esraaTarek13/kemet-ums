import { PiWarningFill, PiClipboardText } from "react-icons/pi";
import { RiFileCheckLine } from "react-icons/ri";
import { DueSoonItem } from "@/types";
import { format } from "date-fns";

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
    icon: PiClipboardText,
    label: "Not Submitted",
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
    icon: RiFileCheckLine ,
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
  return format(new Date(dateStr), "MMM d");
};