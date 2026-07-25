"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import ProgressBar from "@/components/ui/shared/ProgressBar";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import { useStudentCourseDetails } from "@/hooks/student/courses/useStudentCourseDetails";
import { LuFileCheck } from "react-icons/lu";
import { TbUserCheck } from "react-icons/tb";

export default function MyPerformanceCard({ courseId }: { courseId: string }) {
  const { data, isPending, isError } = useStudentCourseDetails(courseId);

  if (isPending) return <CourseCardSkeleton length={1} />;
  if (isError)
    return <ErrorMessage content="Failed to load Performance data." />;

  const { course, grade, assignments, attendance } = data ?? {};
  const completion = course?.completion_percentage;

  return (
    <section
      aria-label="My performance"
      className="card-top-border space-y-5 md:space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="title">My Performance</h3>
        {/* grade badge */}
        <div
          aria-label={`Current grade: ${grade?.grade ?? "not available"}`}
          className="bg-bg-subtle border border-primary/10 rounded-sm py-2 px-2 md:px-4 w-fit h-fit"
        >
          <p
            aria-hidden="true"
            className="font-bold text-accent text-sm md:text-base"
          >
            Current Grade: {grade?.grade ?? "—"}
          </p>
        </div>
      </div>

      {/* aria-label gives screen readers context */}
      <div className="relative">
        <p
          aria-hidden="true"
          className="text-text-primary font-bold text-xs sm:text-sm absolute -top-1"
        >
          Completion
        </p>
        <ProgressBar
          value={completion ?? 0}
          aria-label={`Course completion: ${completion ?? 0}%`}
          textClass="text-accent"
          progressClass="bg-accent"
        />
      </div>

      <div className="flex flex-wrap gap-2 md:gap-4 w-full">
        <div
          aria-label={`Assignments: ${assignments?.completed} of ${assignments?.total} completed`}
          className="bg-bg-navbar p-2 md:p-4 rounded-sm flex gap-2 md:gap-4 items-center grow"
        >
          <div
            aria-hidden="true"
            className="bg-bg-card rounded-xl px-2 md:px-3 py-1.5 md:py-2.5"
          >
            <LuFileCheck className="text-accent shrink-0 text-xl md:text-2xl lg:text-3xl" />
          </div>
          <div aria-hidden="true">
            <p className="font-bold text-text-subtle text-[10px] sm:text-xs uppercase">
              assignments
            </p>
            <p className="font-bold text-accent text-base md:text-lg">
              {assignments?.completed} of {assignments?.total} Completed
            </p>
          </div>
        </div>

        <div
          aria-label={`Attendance: ${attendance?.rate}% presence`}
          className="bg-bg-navbar p-2 md:p-4 rounded-sm flex gap-2 md:gap-4 items-center grow"
        >
          <div
            aria-hidden="true"
            className="bg-bg-card rounded-xl px-2 md:px-3 py-1.5 md:py-2.5"
          >
            <TbUserCheck className="text-success shrink-0 text-xl md:text-2xl lg:text-3xl" />
          </div>
          <div aria-hidden="true">
            <p className="font-bold text-text-subtle text-[10px] sm:text-xs uppercase">
              attendance
            </p>
            <p className="font-bold text-accent text-base md:text-lg">
              {attendance?.rate ?? 0}% Presence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
