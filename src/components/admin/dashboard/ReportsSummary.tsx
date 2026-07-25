"use client";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import ProgressBar from "@/components/ui/shared/ProgressBar";
import { FaArrowRight } from "react-icons/fa";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import { useReportsSummary } from "@/hooks/admin/dashboard/queries/useReportsSummary";
import { mapToReportsSummary } from "@/lib/mappers/student/mapToReportsSummary";

export default function ReportsSummary() {
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/";
  const { data: res, isPending, isError } = useReportsSummary();

  if (isPending)
    return (
      <div className="w-full lg:w-70">
        <CardSkeleton />
      </div>
    );

  if (isError) <ErrorMessage content="Failed to load Reports Summary." />;

  if (!res)
    return (
      <p className="text-text-muted text-center py-10">No reports available.</p>
    );

  const reports = mapToReportsSummary(res);

  return (
    <section aria-labelledby="reports-summary-title" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 id="reports-summary-title" className="title pl-2">
          Reports Summary
        </h3>
        <Link
          href={`${base}/reports`}
          aria-label="View all reports"
          className="group flex gap-2 items-center text-text-secondary transition duration-200 px-2"
        >
          <span className="text-xs md:text-sm">View All</span>
          <FaArrowRight
            aria-hidden="true"
            className="text-sm shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.key}
            role="region"
            aria-label={report.label}
            className="bg-bg-card rounded-xl p-4 lg:p-5 border-l-4 border-accent space-y-3 md:space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-accent text-sm md:text-base font-bold">
                  {report.label}
                </h4>
                <report.icon
                  aria-hidden="true"
                  className={`text-xl shrink-0 ${report.iconClass}`}
                />
              </div>
              <p className="text-text-subtle text-xs md:text-sm uppercase">
                {report.subtitle}
              </p>
            </div>

            <ProgressBar
              value={report.value}
              progressClass={report.progressClass}
              textClass={report.textClass}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
