"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ProgressBar from "@/components/ui/ProgressBar";
import { useStudentCourseDetails } from "@/hooks/student/useStudentCourseDetails";
import { LuFileCheck } from "react-icons/lu";
import { TbUserCheck } from "react-icons/tb";

export default function MyPerformanceCard({ courseId }: { courseId: string }) {
  const { data, isPending, isError } = useStudentCourseDetails(courseId);
  const grade = data?.grade;
  const completion = data?.course?.completion;
  const assignments = data?.assignments;
  const attendance = data?.attendance;

  if (isError)
    return <ErrorMessage content="Failed to load Performance data." />;

  return (
    <section className="card-top-border space-y-5 md:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="header-title">My Performance</h3>
        <div className="bg-bg-subtle border border-primary/10 rounded-sm py-2 px-2 md:px-4 w-fit h-fit">
          <p className="font-bold text-accent text-sm md:text-base">
            Current Grade: {grade?.grade ?? "—"}
          </p>
        </div>
      </div>

      <div className="relative">
        <p className="text-text-primary font-bold text-xs sm:text-sm absolute -top-1">
          Completion
        </p>
        <ProgressBar
          value={completion ?? 0}
          textClass="text-accent"
          progressClass="bg-accent"
        />
      </div>

      <div className="flex flex-wrap gap-2 md:gap-4 w-full">
        <div className="bg-bg-navbar p-2 md:p-4 rounded-sm flex gap-2 md:gap-4 items-center grow">
          <div className="bg-bg-card rounded-xl px-2 md:px-3 py-1.5 md:py-2.5">
            <LuFileCheck className="text-accent shrink-0 text-xl md:text-2xl lg:text-3xl" />
          </div>
          <div>
            <p className="font-bold text-text-subtle text-[10px] sm:text-xs uppercase">
              assignments
            </p>
            <p className="font-bold text-accent text-base md:text-lg">
              {assignments
                ? `${assignments.completed} of ${assignments.total} Completed`
                : "—"}
            </p>
          </div>
        </div>
        <div className="bg-bg-navbar p-2 md:p-4 rounded-sm flex gap-2 md:gap-4 items-center grow">
          <div className="bg-bg-card rounded-xl px-2 md:px-3 py-1.5 md:py-2.5">
            <TbUserCheck className="text-success shrink-0 text-xl md:text-2xl lg:text-3xl" />
          </div>
          <div>
            <p className="font-bold text-text-subtle text-[10px] sm:text-xs uppercase">
              attendance
            </p>
            <p className="font-bold text-accent text-base md:text-lg">
              {attendance?.rate != null ? `${attendance.rate}% Presence` : "—"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
