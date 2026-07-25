"use client";

import { TABS } from "@/data/student/assignments";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import AssignmentsCards from "./AssignmentsCards";
import { useAssignments } from "@/hooks/student/assignment/useAssignments";

export default function Assignments() {
  const {
    isPending,
    isError,
    activeTab,
    setActiveTab,
    filteredAssignments,
    statsCards,
  } = useAssignments();

  if (isPending) return <CardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load assignments." />;

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
              <h5 className="text-xs text-text-subtle uppercase pb-1">
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

      <AssignmentsCards assignments={filteredAssignments} />
    </section>
  );
}
