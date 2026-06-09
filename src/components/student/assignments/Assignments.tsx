"use client";

import { STATS_CONFIG, TABS } from "@/data/student/assignments";
import { useStudentAssignments } from "@/hooks/student/useStudentAssignments";
import { useMemo, useState } from "react";
import AssignmentsCard from "./AssignmentsCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";

export default function Assignments() {
  const { data, isPending, isError } = useStudentAssignments();
  const { all, graded, overdue, pending, not_submitted } = data ?? {};
  const [activeTab, setActiveTab] = useState("All");

  // Filter assignments based on the active tab
  const filteredAssignments = useMemo(
    () =>
      ({
        All: all,
        Overdue: overdue,
        Pending: pending,
        "Not Submitted": not_submitted,
        Graded: graded,
      })[activeTab] ?? [],
    [activeTab, all, overdue, pending, not_submitted, graded],
  );

  // Map stat counts to config for rendering summary cards
  const statsCards = useMemo(() => {
    const counts: Record<string, number> = {
      Overdue: overdue?.length ?? 0,
      "Not Submitted": not_submitted?.length ?? 0,
      Pending: pending?.length ?? 0,
      Graded: graded?.length ?? 0,
    };
    return STATS_CONFIG.map((s) => ({ ...s, value: counts[s.title] }));
  }, [overdue, not_submitted, pending, graded]);

  if (isPending) return <CardSkeleton />;
  if (isError)
    return (
      <ErrorMessage content="Failed to load assignments. Please try again later." />
    );

  return (
    <section className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="header-title">Assignments</h3>

        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
          {statsCards.map((stat) => (
            <li
              key={stat.title}
              aria-label={`${stat.title}: ${stat.value} assignments`}
              className={`${stat.border} bg-bg-card border-b-3 rounded-lg py-2.5 lg:py-4 px-4 lg:px-6`}
            >
              <h5 className="text-sm text-text-subtle uppercase pb-1">
                {stat.title}
              </h5>
              <span className={`${stat.color} font-bold text-2xl`}>
                {stat.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ul
        role="tablist"
        aria-label="Filter assignments"
        className="flex flex-wrap items-center gap-4 md:gap-8 pb-2 border-b border-bg-bar"
      >
        {TABS.map((tab) => (
          <li key={tab} role="none">
            <button
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs md:text-sm lg:text-base font-semibold pb-1.5 border-b-2 transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "text-accent border-accent"
                  : "text-text-muted border-transparent"
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <AssignmentsCard assignments={filteredAssignments} />
    </section>
  );
}
