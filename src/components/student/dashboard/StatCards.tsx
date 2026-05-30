"use client";
import { useMemo } from "react";
import StatCard from "@/components/ui/dashboard/StatCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import { useStudentDashboard } from "@/hooks/student/useDashboard";
import {
  PiBookOpenText,
  PiMedal,
  PiClipboardText,
  PiCalendarCheck,
} from "react-icons/pi";

export default function StatCards() {
  const { data, isPending, isError } = useStudentDashboard();

  // map API fields to stat card config — fallback to 0 if value missing
  const stats = useMemo(
    () => [
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
    ],
    [data],
  );

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;

  return (
    <section
      aria-label="Student statistics"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
