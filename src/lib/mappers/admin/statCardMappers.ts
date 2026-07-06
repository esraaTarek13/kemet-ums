import { FaUserGroup, FaChalkboardUser } from "react-icons/fa6";
import { MdOutlineWarning, MdOutlineApartment } from "react-icons/md";
import { LuBookOpen, LuClipboardCheck } from "react-icons/lu";
import { DashboardStats } from "@/types";

export function mapToStudentStats(data?: DashboardStats) {
  return [
    {
      label: "Total Students",
      value: data?.total_students ?? null,
      icon: FaUserGroup,
      trend: "↑ +2.4%",
    },
    {
      label: "Total Faculty",
      value: data?.total_faculty ?? null,
      icon: FaChalkboardUser,
      description: "Full Capacity",
      descriptionColor: "default" as const,
    },
    {
      label: "Active Courses",
      value: data?.active_courses ?? null,
      icon: LuBookOpen,
      description: "Q4 Term",
      descriptionColor: "default" as const,
    },
    {
      label: "Departments",
      value: data?.departments ?? null,
      icon: MdOutlineApartment,
      description: "3 Divisions",
      descriptionColor: "default" as const,
    },
    {
      label: "Pending Approvals",
      value: data?.pending_announcements ?? null,
      icon: LuClipboardCheck,
      description: "Action Required",
      descriptionColor: "warning" as const,
    },
    {
      label: "System Alerts",
      value: data?.at_risk_students ?? null,
      icon: MdOutlineWarning,
      description: "Minor Issues",
      descriptionColor: "danger" as const,
    },
  ];
}
