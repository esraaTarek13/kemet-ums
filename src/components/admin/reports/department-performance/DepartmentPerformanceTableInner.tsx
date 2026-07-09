import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Small";
import { DEPARTMENT_PERFORMANCE_COLUMNS } from "@/data/admin/departmentsColumns";
import { useAdminReports } from "@/hooks/admin/useAdminReports";
import { useMemo } from "react";

export default function DepartmentPerformanceTableInner() {
  const { data, isPending, isError } = useAdminReports();
  const departments = data?.department_performance;

  const tableData = useMemo(
    () => ({
      nodes: (departments ?? []).map((d, index) => ({
        ...d,
        id: `${d.department}-${index}`,
      })),
    }),
    [departments],
  );

  if (isPending) return <TableSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load department performance." />;

  return (
    <div className="card p-0 min-w-full w-0">
      <h4 className="title p-6">Department Performance Matrix</h4>

      <Table tableData={tableData} columns={DEPARTMENT_PERFORMANCE_COLUMNS} />
    </div>
  );
}
