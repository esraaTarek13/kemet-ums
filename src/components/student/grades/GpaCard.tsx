"use client";
import { useStudentGrades } from "@/hooks/student/useStudentGrades";
import { IoStarSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import GpaCardSkeleton from "@/components/ui/skeletons/GpaCardSkeleton";

export default function GpaCard() {
  const { data, isPending, isError } = useStudentGrades();
  const gpa = data?.cumulative_gpa ?? 0;
  const cohortPercentile = data?.cohort_percentile ?? 0;

  // Guard against unexpected percentile values from the API
  const topPercent =
    cohortPercentile > 0 ? Math.max(0, 100 - cohortPercentile) : null;

  if (isPending) return <GpaCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load GPA." />;

  return (
    <section className="h-full lg:h-fit w-full lg:w-65 p-4 md:p-6 flex flex-col gap-3 md:gap-4 items-center justify-center bg-accent rounded-xl relative">
      <div className="flex flex-col gap-1 items-center">
        <IoStarSharp
          aria-hidden="true"
          className="text-[#C4A882] text-4xl md:text-5xl "
        />
        <p className="text-text-white/80 text-xs md:text-sm">Cumulative GPA</p>
      </div>
      <p className="font-bold text-4xl md:text-5xl text-text-white">
        {gpa.toFixed(1)}
      </p>
      <p className="flex items-center gap-3 bg-bg-card/10 rounded-full py-1 px-3">
        <FaCircle aria-hidden="true" className="text-[#4ADE80] text-sm" />
        <span className="text-text-white text-xs font-medium">
          {topPercent !== null
            ? `Top ${topPercent}% of Cohort`
            : "Cohort rank unavailable"}
        </span>
      </p>
    </section>
  );
}
