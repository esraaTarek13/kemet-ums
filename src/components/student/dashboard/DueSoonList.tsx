"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import { statusConfig, formatDate } from "@/data/student/dueSoon";
import { useStudentDashboard } from "@/hooks/student/useDashboard";

export default function DueSoonList() {
  const { data, isPending, isError } = useStudentDashboard();
  const tasks = data?.due_soon;

  if (isPending) return <CardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load due soon tasks." />;

  return (
    <section aria-label="Due soon tasks" className="space-y-5 lg:space-y-6">
      <h3 className="title">Due Soon!</h3>

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
