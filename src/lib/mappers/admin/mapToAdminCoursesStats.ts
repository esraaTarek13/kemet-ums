import { AdminCoursesStats } from "@/types";
import {
  PiBooks,
  PiChalkboardTeacher,
  PiUserList,
} from "react-icons/pi";

export function mapToAdminCoursesStats(data?: AdminCoursesStats) {
  return [
    {
      label: "Total Courses",
      value: data?.total_courses ?? 0,
      icon: PiBooks,
    },
    {
      label: "Active Enrollment",
      value: data?.active_enrollment ?? 0,
      icon: PiChalkboardTeacher,
    },
    {
      label: "Total Enrollments",
      value: data?.total_enrollments ?? 0,
      icon: PiUserList,
    },
  ];
}