import { StudentDashboardStats } from "@/types"; 
import { FaMoneyBill } from "react-icons/fa6";
import {
  PiBookOpenText,
  PiMedal,
  PiCalendarCheck,
} from "react-icons/pi";

export function mapToStudentStats(data?: StudentDashboardStats) {
  return [
    {
      label: "Amount Due",
      value: data?.balance_due ?? 0,
      icon: FaMoneyBill,
    },
    {
      label: "Enrolled Courses",
      value: data?.enrolled_courses ?? 0,
      icon: PiBookOpenText,
    },
    {
      label: "Academic GPA",
      value: data?.gpa ?? 0,
      icon: PiMedal,
    },
    {
      label: "Attendance Rate",
      value: `${data?.attendance_rate ?? 0} %` ,
      icon: PiCalendarCheck,
    },
  ];
}