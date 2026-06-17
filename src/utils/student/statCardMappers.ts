import { StudentDashboard } from "@/types"; 
import {
  PiBookOpenText,
  PiMedal,
  PiClipboardText,
  PiCalendarCheck,
} from "react-icons/pi";

export function mapToStudentStats(data?: StudentDashboard) {
  return [
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
      label: "Pending Tasks",
      value: data?.pending_tasks ?? 0,
      icon: PiClipboardText,
    },
    {
      label: "Upcoming Exams",
      value: data?.upcoming_exams ?? 0,
      icon: PiCalendarCheck,
    },
  ];
}