import { STATS_CONFIG } from "@/data/student/assignments";
import { StudentAssignments } from "@/types";

export function filterAssignmentsByTab(
  data: StudentAssignments | undefined,
  activeTab: string,
) {
  const { all, graded, overdue, pending, not_submitted } = data ?? {};
  return (
    ({
      All: all,
      Overdue: overdue,
      Pending: pending,
      "Not Submitted": not_submitted,
      Graded: graded,
    })[activeTab] ?? []
  );
}

export function mapToAssignmentStats(data: StudentAssignments | undefined) {
  const { graded, overdue, pending, not_submitted } = data ?? {};
  const counts: Record<string, number> = {
    Overdue: overdue?.length ?? 0,
    "Not Submitted": not_submitted?.length ?? 0,
    Pending: pending?.length ?? 0,
    Graded: graded?.length ?? 0,
  };
  return STATS_CONFIG.map((s) => ({ ...s, value: counts[s.title] }));
}