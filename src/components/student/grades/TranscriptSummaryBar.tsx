"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import TranscriptSummaryBarSkeleton from "@/components/ui/skeletons/TranscriptSummaryBarSkeleton";
import { useStudentGrades } from "@/hooks/student/useStudentGrades";
import { PiDownloadSimpleBold } from "react-icons/pi";

export default function TranscriptSummaryBar() {
  const { data, isPending, isError } = useStudentGrades();
  console.log(data);
  

  if (isPending) return <TranscriptSummaryBarSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load transcript summary." />;

  const items = [
    {
      label: "Total Credits",
      value: data?.total_credits ?? "0",
      valueClassName: "text-primary text-xl md:text-2xl lg:text-3xl",
    },
    {
      label: "Semester GPA",
      value: data?.semester_gpa ?? "0",
      valueClassName: "text-primary text-xl md:text-2xl lg:text-3xl",
    },
    {
      label: "Standing",
      value: data?.standing ?? "",
      valueClassName: "text-success bg-success-bg py-1 px-3",
    },
  ];

  return (
    <section className="card flex flex-col lg:flex-row justify-between items-center gap-4 p-4 md:p-6 lg:p-8 mt-auto">
      <ul className="w-full lg:w-fit flex flex-wrap justify-between items-center gap-3 lg:gap-12">
        {items.map((item) => (
          <li key={item.label} className="space-y-2">
            <p className="font-bold text-text-secondary text-xs uppercase">
              {item.label}
            </p>
            <p className={`${item.valueClassName} font-bold rounded-sm`}>
              {item.value}
            </p>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="flex gap-3 items-center justify-center btn btn-dark w-full lg:w-fit min-w-fit"
      >
        <PiDownloadSimpleBold
          aria-hidden="true"
          className="text-lg md:text-2xl shrink-0"
        />
        <span className="min-w-fit">Download Official Transcript</span>
      </button>
    </section>
  );
}
