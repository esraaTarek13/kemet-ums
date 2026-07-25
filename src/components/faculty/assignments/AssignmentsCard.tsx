"use client";
import AssignmentItem from "./AssignmentItem";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import SearchInput from "@/components/ui/shared/FilterBar/search/SearchInput";
import { useState } from "react";
import { useFacultyAssignments } from "@/hooks/faculty/assignments/queries/useFacultyAssignments";

export default function AssignmentsCard() {
  const [search, setSearch] = useState("");
  const {
    data: assignments,
    isPending,
    isError,
  } = useFacultyAssignments(search);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 flex-wrap">
        <h1 className="title">Assignments</h1>
        <SearchInput
          placeholder="Search assignments..."
          bgColor="bg-bg-filter"
          value={search}
          onChange={setSearch}
        />
      </div>

      <div aria-live="polite" aria-busy={isPending}>
        {isPending ? (
          <CardSkeleton />
        ) : isError ? (
          <ErrorMessage content="Failed to load assignments." />
        ) : assignments?.length === 0 ? (
          <p
            role="status"
            className="text-text-muted text-xs md:text-sm col-span-full text-center py-10"
          >
            {search
              ? "No assignments match your search."
              : "No assignments found."}
          </p>
        ) : (
          <ul className="space-y-5 md:space-y-6">
            {assignments?.map((assignment) => (
              <AssignmentItem
                key={assignment.assignment_id}
                assignment={assignment}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
