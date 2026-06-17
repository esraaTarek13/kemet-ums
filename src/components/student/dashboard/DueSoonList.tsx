"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import { statusConfig, formatDate } from "@/data/student/dueSoon";
import { useStudentDashboard } from "@/hooks/student/useDashboard";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function DueSoonList() {
  const { data, isPending, isError } = useStudentDashboard();
  const tasks = data?.due_soon;

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
          {tasks.map((task) => {
            // fallback to "pending" if status not in config
            const config = statusConfig[task.status] ?? statusConfig["pending"];
            const { icon: Icon, label, textClass, bgClass } = config;

            return (
              <article
                key={task.assignment_id}
                aria-label={`${task.title} — ${label}, due ${formatDate(task.due_date)}`}
                className="card flex gap-4"
              >
                {/* status icon */}
                <div
                  aria-hidden="true"
                  className={`${bgClass} p-2 rounded-lg h-fit`}
                >
                  <Icon className={`${textClass} text-2xl shrink-0`} />
                </div>

                <div className="w-full">
                  <h5 className="font-semibold text-text-primary text-sm">
                    {task.title}
                  </h5>

                  {/* course · faculty — covered by article aria-label */}
                  <div
                    aria-hidden="true"
                    className="text-text-subtle text-xs mb-4"
                  >
                    <span>{task.course_name}</span>
                    <span className="w-1.5 h-1.5 bg-text-subtle rounded-full mx-1 align-middle inline-block" />
                    <span>{task.faculty_name}</span>
                  </div>

                  {/* status badge and due date */}
                  <div className="w-full flex items-center justify-between flex-wrap">
                    <p
                      className={`font-semibold text-xs ${textClass} ${bgClass} py-0.5 px-2 rounded-full lowercase`}
                    >
                      {label}
                    </p>
                    <p className="text-text-subtle text-xs uppercase">
                      {formatDate(task.due_date)}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
