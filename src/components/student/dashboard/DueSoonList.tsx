"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import DueSoonSkeleton from "../skeletons/DueSoonSkeleton";
import { statusConfig, formatDate } from "@/data/student/dueSoon";
import { useStudentDashboard } from "@/hooks/student/useDashboard";

export default function DueSoonList() {
  const { data, isPending, isError } = useStudentDashboard();
  const tasks = data?.due_soon;

  if (isPending)
    return (
      <div className="w-full lg:w-60 space-y-4">
        <DueSoonSkeleton length={3} />
      </div>
    );

  if (isError)
    return (
      <ErrorMessage content="Failed to load due soon tasks." />
    );

  return (
    <section className="space-y-5 lg:space-y-6">
      <h3 className="title">Due Soon!</h3>

      {!tasks?.length ? (
        <p className="text-text-muted text-center py-10">No upcoming tasks.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => {
            const {
              icon: Icon,
              label,
              textClass,
              bgClass,
            } = statusConfig[task.status];
            return (
              <div key={task.assignment_id} className="card flex gap-4">
                <div className={`${bgClass} p-2 rounded-lg h-fit`}>
                  <Icon
                    aria-hidden="true"
                    className={`${textClass} text-2xl shrink-0`}
                  />
                </div>
                <div className="w-full">
                  <h5 className="font-semibold text-text-primary text-sm">
                    {task.title}
                  </h5>
                  <div className="text-text-subtle text-xs mb-4">
                    <span>{task.course_name}</span>
                    <span className="w-1.5 h-1.5 bg-text-subtle rounded-full mx-1 align-middle inline-block" />
                    <span>{task.faculty_name}</span>
                  </div>
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
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
