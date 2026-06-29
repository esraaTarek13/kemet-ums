"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import { useStudentDueSoon } from "@/hooks/student/useDashboard";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import DueSoonItem from "./DueSoonItem";

export default function DueSoonList() {
  const { data: tasks, isPending, isError } = useStudentDueSoon();
  
  if (isPending)
    return (
      <div className="lg:w-90">
        <CardSkeleton />
      </div>
    );
  if (isError) return <ErrorMessage content="Failed to load due soon tasks." />;

  return (
    <section
      aria-label="Due soon tasks"
      className="space-y-5 lg:space-y-6 lg:min-w-70 lg:w-fit"
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="title">Due Soon!</h3>
        {/* shortcut to the full assignments page */}
        <Link
          href="/student/assignments"
          aria-label="View all my assignments"
          className="group flex gap-2 items-center text-text-secondary transition duration-200 px-2"
        >
          <span className="text-xs md:text-sm">View All</span>
          <FaArrowRight
            aria-hidden="true"
            className="text-sm shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* no upcoming tasks */}
      {!tasks?.length ? (
        <p
          role="status"
          aria-live="polite"
          className="text-text-muted text-center py-10"
        >
          No upcoming tasks.
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <DueSoonItem key={task.assignment_id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}
