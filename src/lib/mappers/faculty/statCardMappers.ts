import { FacultyDashboardStats } from "@/types";
import {
  PiBookOpenText,
  PiClipboardText,
} from "react-icons/pi";
import { FaChartLine, FaUsers } from "react-icons/fa";

export function mapToStudentStats(data?: FacultyDashboardStats) {
  return [
    {
      label: "Active Courses",
      value: data?.total_courses ?? 0,
      icon: PiBookOpenText,
    },
    {
      label: "Total Students",
      value: data?.total_students ?? 0,
      icon: FaUsers,
    },
    {
      label: "Pending Grading",
      value: data?.pending_grading ?? 0,
      icon: PiClipboardText,
    },
    {
      label: "Average Attendance",
      value: data?.avg_attendance ? `${data.avg_attendance}%` : "0%",
      icon: FaChartLine,
    },
  ];
}
