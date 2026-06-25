import {
  MdDashboard,
  MdPeople,
  MdAssignment,
  MdGrade,
  MdCalendarMonth,
  MdMessage,
  MdBook,
  MdBarChart,
  MdCampaign,
  MdAdminPanelSettings,
} from "react-icons/md";
import { PiChalkboardTeacher } from "react-icons/pi";

// ─── Student Nav ──────────────────────────────────────────────────────────────
export const STUDENT_NAV = [
  { label: "Dashboard", href: "/student/dashboard", icon: MdDashboard },
  { label: "My Courses", href: "/student/courses", icon: MdBook },
  { label: "Assignments", href: "/student/assignments", icon: MdAssignment },
  { label: "Grades", href: "/student/grades", icon: MdGrade },
  { label: "Schedule", href: "/student/schedule", icon: MdCalendarMonth },
  { label: "Announcements", href: "/student/announcements", icon: MdCampaign },
  { label: "Messages", href: "/student/messages", icon: MdMessage },
];

// ─── Faculty Nav ──────────────────────────────────────────────────────────────
export const FACULTY_NAV = [
  { label: "Dashboard", href: "/faculty/dashboard", icon: MdDashboard },
  { label: "My Courses", href: "/faculty/courses", icon: MdBook },
  { label: "Students", href: "/faculty/students", icon: MdPeople },
  { label: "Assignments", href: "/faculty/assignments", icon: MdAssignment },
  { label: "Grades", href: "/faculty/grades", icon: MdGrade },
  { label: "Schedule", href: "/faculty/schedule", icon: MdCalendarMonth },
  { label: "Messages", href: "/faculty/messages", icon: MdMessage },
];

// ─── Admin Nav ────────────────────────────────────────────────────────────────
export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: MdDashboard },
  { label: "Students", href: "/admin/students", icon: MdPeople },
  { label: "Faculty", href: "/admin/faculty", icon: PiChalkboardTeacher },
  { label: "Courses", href: "/admin/courses", icon: MdBook },
  { label: "Reports", href: "/admin/reports", icon: MdBarChart },
  { label: "Announcements", href: "/admin/announcements", icon: MdCampaign },
];

// ─── Super Admin Nav ────────────────────────────────────────────────────────────────
export const SUPER_ADMIN_NAV = [
  { label: "Dashboard", href: "/super-admin/dashboard", icon: MdDashboard },
  { label: "Admins", href: "/super-admin/admins", icon: MdAdminPanelSettings },
  { label: "Students", href: "/super-admin/students", icon: MdPeople },
  { label: "Faculty", href: "/super-admin/faculty", icon: PiChalkboardTeacher },
  { label: "Courses", href: "/super-admin/courses", icon: MdBook },
  { label: "Reports", href: "/super-admin/reports", icon: MdBarChart },
  {
    label: "Announcements",
    href: "/super-admin/announcements",
    icon: MdCampaign,
  },
];
