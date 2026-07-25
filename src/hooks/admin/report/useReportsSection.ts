import { useState } from "react";
import { extractAcademicYear } from "@/lib/utils/shared/semester";
import { useExportAllReports } from "@/hooks/admin/report/queries/useExportAllReports";

export function useReportsSection() {
  const [semester, setSemester] = useState("");
  const academicYear = semester ? extractAcademicYear(semester) : "";

  const { mutate: exportAll, isPending: isExporting } = useExportAllReports();

  // Guard: export is disabled until a semester is selected
  const handleExport = () => {
    if (!semester) return;
    exportAll({ semester, academicYear });
  };

  return {
    semester,
    setSemester,
    academicYear,
    isExporting,
    handleExport,
  };
}
