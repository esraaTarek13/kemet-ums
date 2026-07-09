import { ReportsStats } from "@/types";
import {
  PiChartLineUp,
  PiGraduationCap,
  PiCheckCircle,
  PiUsersThree,
  PiStudent,
  PiCalendarCheck,
} from "react-icons/pi";

export function mapToAdminReportStats(data?: ReportsStats) {
  return [
    {
      label: "Total Enrollment",
      value: data?.total_enrollment ?? 0,
      icon: PiUsersThree,
    },
    {
      label: "Attendance Rate",
      value: `${data?.attendance_rate ?? 0}%`,
      icon: PiCalendarCheck,
    },
    {
      label: "Average GPA",
      value: data?.avg_gpa ?? 0,
      icon: PiChartLineUp,
    },
    {
      label: "Completion Rate",
      value: `${data?.completion_rate ?? 0}%`,
      icon: PiCheckCircle,
    },
    {
      label: "Graduation Rate",
      value: `${data?.graduation_rate ?? 0}%`,
      icon: PiGraduationCap,
    },
    {
      label: "Faculty : Student Ratio",
      value: data?.faculty_student_ratio ?? "0:0",
      icon: PiStudent,
    },
  ];
}