import { useMemo } from "react";
import { useStudentGrades } from "@/hooks/student/grades/queries/useStudentGrades";

export function useGradesTable() {
  const { data, isPending, isError } = useStudentGrades();

  const tableData = useMemo(() => {
    const grades = data?.courses ?? [];

    return {
      nodes: grades
        .slice()
        .sort((a, b) => {
          if (a.status === "active" && b.status !== "active") return -1;
          if (a.status !== "active" && b.status === "active") return 1;
          return 0;
        })
        .map((g) => ({ ...g, id: g.enrollment_id })),
    };
  }, [data]);

  return {
    isPending,
    isError,
    tableData,
  };
}