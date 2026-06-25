"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import ProgressBar from "@/components/ui/shared/ProgressBar";
import AttendanceSkeletons from "@/components/ui/skeletons/AttendanceSkeletons";
import { useFacultyPerformanceIndex } from "@/hooks/faculty/useDashboard";

export default function Performance() {
  const { data, isPending, isError } = useFacultyPerformanceIndex();

  if (isPending) return <AttendanceSkeletons />;
  if (isError)
    return <ErrorMessage content="Failed to load Performance Index." />;

  const metrics = [
    {
      label: "Student Performance",
      value: data?.student_performance || 0,
      textClass: "text-success",
      progressClass: "bg-success",
    },
    {
      label: "Assignment Completion",
      value: data?.assignment_completion || 0,
      textClass: "text-accent",
      progressClass: "bg-accent",
    },
  ];

  return (
    <section className="w-full lg:min-w-80 card space-y-5 md:space-y-6">
      <h3 className="title">Performance Index</h3>
      {metrics.map(({ label, value, textClass, progressClass }) => (
        <div key={label} className="relative">
          <p className="text-text-primary font-bold text-xs md:text-sm absolute bottom-3">
            {label}
          </p>
          <ProgressBar
            value={value}
            textClass={textClass}
            progressClass={progressClass}
          />
        </div>
      ))}
    </section>
  );
}
