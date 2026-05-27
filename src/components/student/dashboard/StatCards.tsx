"use client";
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

  const stats = data
    ? [
        {
          label: "Enrolled Courses",
          value: data.enrolled_courses,
          icon: PiBookOpenText,
        },
        {
          label: "Academic GPA",
          value: data.gpa,
          icon: PiMedal,
        },
        {
          label: "Pending Tasks",
          value: data.pending_tasks,
          icon: PiClipboardText,
        },
        {
          label: "Upcoming Exams",
          value: data.upcoming_exams,
          icon: PiCalendarCheck,
        },
      ]
    : [];

  if (isError) return <ErrorMessage content="Failed to load statistics." />;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {isPending ? (
        <StatCardSkeleton length={4} />
      ) : (
        stats.map((stat) => <StatCard key={stat.label} {...stat} />)
      )}
    </section>
  );
}
