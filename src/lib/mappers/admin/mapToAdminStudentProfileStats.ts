import { StudentProfileStats } from "@/types";
import {
  PiCheckCircle,
  PiExam,
  PiListChecks,
  PiChartLineUp,
} from "react-icons/pi";

export function mapToAdminStudentProfileStats(data?: StudentProfileStats) {
  return [
    {
      label: "Credits Required",
      value: data?.credits_required ?? 0,
      icon: PiListChecks,
    },
    {
      label: "Credits Completed",
      value: data?.credits_completed ?? 0,
      icon: PiCheckCircle,
    },
    {
      label: "GPA",
      value: data?.gpa ?? 0,
      icon: PiExam,
    },
    {
      label: "Progress",
      value: `${data?.progress_pct ?? 0}%`,
      icon: PiChartLineUp,
    },
  ];
}
