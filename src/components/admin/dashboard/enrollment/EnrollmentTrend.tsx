"use client";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { useEnrollmentTrend } from "@/hooks/admin/useDashboard";
import { EnrollmentSkeleton } from "@/components/ui/skeletons/EnrollmentSkeleton";
import { usePagination } from "@/hooks/admin/useEnrollmentPagination";
import { getDateRange } from "@/lib/utils/admin/dashboardEnrollment";
import EnrollmentChart from "./EnrollmentChart";

export default function EnrollmentTrend() {
  const { page, goNext, goPrev } = usePagination({
    hasNext: false,
    hasPrev: false,
  });

  const { data: res, isError, isPending } = useEnrollmentTrend(page);

  const hasNext = res?.has_next ?? false;
  const hasPrev = res?.has_prev ?? false;
  const dateRange = getDateRange(res?.data);

  if (isPending) return <EnrollmentSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load enrollment data." />;

  return (
    <section
      aria-labelledby="enrollment-title"
      className="w-full min-h-50 md:min-h-62 lg:min-h-75 card space-y-4 lg:space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 id="enrollment-title" className="title">
          Enrollment Overview
        </h3>

        {/* Pagination controls */}
        <div
          role="group"
          aria-label="Enrollment date navigation"
          className="flex items-center gap-1 text-text-primary"
        >
          <button
            type="button"
            onClick={goPrev}
            disabled={!hasPrev}
            aria-label="Go to previous date range"
            className="bg-bg-filter p-1 rounded-full cursor-pointer disabled:opacity-40"
          >
            <IoIosArrowBack aria-hidden="true" />
          </button>

          <p
            aria-live="polite"
            aria-label={`Showing enrollment data for ${dateRange}`}
            className="bg-bg-filter py-1 px-2 md:px-3 rounded-full text-[10px] md:text-xs uppercase"
          >
            {dateRange}
          </p>

          <button
            type="button"
            onClick={goNext}
            disabled={!hasNext}
            aria-label="Go to next date range"
            className="bg-bg-filter p-1 rounded-full cursor-pointer disabled:opacity-40"
          >
            <IoIosArrowForward aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Delegated to separate component for clarity */}
      <EnrollmentChart data={res?.data} />
    </section>
  );
}
