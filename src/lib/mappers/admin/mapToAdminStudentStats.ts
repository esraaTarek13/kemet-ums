import { AdminStudentsStats } from "@/types";
import {
  PiUsers,
  PiCheckCircle,
  PiGraduationCap,
  PiProhibit,
} from "react-icons/pi";

export function mapToAdminStudentStats(data?: AdminStudentsStats) {
  return [
    {
      label: "Total Students",
      value: data?.total_students ?? 0,
      icon: PiUsers,
    },
    {
      label: "Active",
      value: data?.active ?? 0,
      icon: PiCheckCircle,
    },
    {
      label: "Graduated",
      value: data?.graduated ?? 0,
      icon: PiGraduationCap,
    },
    {
      label: "Suspended",
      value: data?.suspended ?? 0,
      icon: PiProhibit,
    },
  ];
}