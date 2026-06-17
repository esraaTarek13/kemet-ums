"use client";

import StatCard from "@/components/ui/dashboard/StatCard";
import { FaUserGroup, FaChalkboardUser } from "react-icons/fa6";
import { MdOutlineWarning, MdOutlineApartment } from "react-icons/md";
import { LuBookOpen, LuClipboardCheck } from "react-icons/lu";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { useDashboardStats } from "@/hooks/admin/useDashboard";

export default function StatCards() {
  const { data, isPending, isError } = useDashboardStats();

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;

  // Map API response to card configs
  const cards = [
    {
      label: "Total Students",
      value: data?.total_students,
      icon: FaUserGroup,
      trend: "↑ +2.4%",
    },
    {
      label: "Total Faculty",
      value: data?.total_faculty,
      icon: FaChalkboardUser,
      description: "Full Capacity",
      descriptionColor: "default" as const,
    },
    {
      label: "Active Courses",
      value: data?.active_courses,
      icon: LuBookOpen,
      description: "Q4 Term",
      descriptionColor: "default" as const,
    },
    {
      label: "Departments",
      value: data?.departments,
      icon: MdOutlineApartment,
      description: "3 Divisions",
      descriptionColor: "default" as const,
    },
    {
      label: "Pending Approvals",
      value: data?.pending_announcements,
      icon: LuClipboardCheck,
      description: "Action Required",
      descriptionColor: "warning" as const,
    },
    {
      label: "System Alerts",
      value: data?.at_risk_students,
      icon: MdOutlineWarning,
      description: "Minor Issues",
      descriptionColor: "danger" as const,
    },
  ];

  return (
    // Responsive grid: 1 → 2 → 3 columns
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </section>
  );
}
