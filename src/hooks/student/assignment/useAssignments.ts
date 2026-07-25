import { useMemo, useState } from "react";
import {
  filterAssignmentsByTab,
  mapToAssignmentStats,
} from "@/lib/mappers/student/assignmentsMappers";
import { useStudentAssignments } from "./queries/useStudentAssignments";

export function useAssignments() {
  const { data, isPending, isError } = useStudentAssignments();
  const [activeTab, setActiveTab] = useState("All");

  const filteredAssignments = useMemo(
    () => filterAssignmentsByTab(data, activeTab),
    [data, activeTab],
  );

  const statsCards = useMemo(() => mapToAssignmentStats(data), [data]);

  return {
    isPending,
    isError,
    activeTab,
    setActiveTab,
    filteredAssignments,
    statsCards,
  };
}
