import { useStudentGrades } from "./queries/useStudentGrades";

export function useGpaCard() {
  const { data, isPending, isError } = useStudentGrades();

  const gpa = data?.cumulative_gpa ?? 0;
  const cohortPercentile = data?.cohort_percentile ?? 0;

  // Guard against unexpected percentile values from the API
  const topPercent =
    cohortPercentile > 0 ? Math.max(0, 100 - cohortPercentile) : null;

  return {
    isPending,
    isError,
    gpa,
    topPercent,
  };
}
