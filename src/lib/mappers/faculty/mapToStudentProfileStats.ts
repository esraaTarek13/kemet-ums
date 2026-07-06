import { FacultyStudentProfile } from "@/types";
import { PiBookOpenText } from "react-icons/pi";
import { FaChartLine, FaAward, FaUserCheck } from "react-icons/fa";

export function mapToStudentProfileStats(data?: FacultyStudentProfile) {
  return [
    {
      label: "GPA",
      value: data?.overall_gpa ?? 0,
      icon: FaAward,
    },
    {
      label: "Attendance",
      value: data?.overall_attendance ? `${data.overall_attendance}%` : "0%",
      icon: FaChartLine,
    },
    {
      label: "Courses",
      value: data?.courses?.length ?? 0,
      icon: PiBookOpenText,
    },
    {
      label: "Status",
      value: data?.status ?? "—",
      icon: FaUserCheck,
    },
  ];
}