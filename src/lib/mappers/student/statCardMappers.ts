import { StudentDashboardStats } from "@/types"; 
import {
  PiBookOpenText,
  PiMedal,
  PiClipboardText,
  PiCalendarCheck,
} from "react-icons/pi";

export function mapToStudentStats(data?: StudentDashboardStats) {
  return [
    {
      label: "Enrolled Courses",
      value: data?.enrolled_courses?? 0,
      icon: PiBookOpenText,
    },
    {
      label: "Academic GPA",
      value: data?.gpa ?? 0,
      icon: PiMedal,
    },
    {
      label: "Pending Tasks",
      value: data?.pending_tasks ?? 0,
      icon: PiClipboardText,
    },
    {
      label: "Attendance Rate",
      value: `${data?.attendance_rate ?? 0} %` ,
      icon: PiCalendarCheck,
    },
  ];
}