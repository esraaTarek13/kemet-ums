import { FacultyProfileStats } from "@/types";
import {
  PiBookOpen,
  PiBriefcase,
  PiChartLineUp,
  PiStudent,
} from "react-icons/pi";

export function mapToAdminFacultyProfileStats(data?: FacultyProfileStats) {
  return [
    {
      label: "Courses",
      value: data?.courses_count ?? 0,
      icon: PiBookOpen,
    },
    {
      label: "Total Students",
      value: data?.total_students ?? 0,
      icon: PiStudent,
    },
    {
      label: "Experience",
      value: data?.experience_years ?? 0,
      icon: PiBriefcase,
    },
    {
      label: "Pass Rate",
      value: `${data?.pass_rate ?? 0}%`,
      icon: PiChartLineUp,
    },
  ];
}
