"use client";
import { useMemo, useState } from "react";
import FilterBar from "@/components/ui/shared/FilterBar/FilterBar";
import { useAdminStudents } from "@/hooks/admin/useAdminStudents";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import Table from "@/components/ui/tables/Table.Large";
import { STUDENTS_COLUMNS } from "@/data/admin/studentsColumns";
import { handleExportStudents } from "@/lib/utils/admin/handleExportStudents";
import { AdminStudent } from "@/types";
import { useDepartments } from "@/hooks/shared/useDepartments";
import { buildStudentFilters } from "@/lib/utils/admin/buildStudentFilters";

type StudentFilters = {
  department: string;
  status: string;
  year: string;
};

const initialFilters: StudentFilters = {
  department: "",
  status: "",
  year: "",
};

export default function StudentsTableInner() {
  const [filters, setFilters] = useState<StudentFilters>(initialFilters);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedMap, setSelectedMap] = useState<Map<string, AdminStudent>>(
    new Map(),
  );

  const { data: departments, isPending: isDepartmentsPending } =
    useDepartments("students");

  const filterConfig = useMemo(
    () => buildStudentFilters(departments),
    [departments],
  );

  // Reset to first page when filters change
  function handleChange(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }

  function handleClear() {
    setFilters(initialFilters);
    setPage(0);
  }

  const {
    data: students,
    isPending,
    isError,
  } = useAdminStudents({
    department: filters.department || undefined,
    status: filters.status || undefined,
    year: filters.year ? Number(filters.year) : undefined,
    page: page + 1,
    pageSize: 5,
    search: search || undefined,
  });

  const totalPages = students?.total_pages ?? 1;

  const tableData = useMemo(
    () => ({
      nodes: (students?.data ?? []).map((s) => ({ ...s, id: s.id })),
    }),
    [students],
  );

  if (isDepartmentsPending) return <TableSkeleton />;

  return (
    <>
      <FilterBar
        filters={filterConfig}
        selectedValues={filters}
        onChange={handleChange}
        onClear={handleClear}
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(0);
        }}
      />

      {isPending ? (
        <TableSkeleton />
      ) : isError ? (
        <ErrorMessage content="Failed to load Students." />
      ) : tableData.nodes.length === 0 ? (
        <p className="text-center text-text-subtle py-8">
          {search ? `No results found for "${search}"` : "No Students yet."}
        </p>
      ) : (
        <Table
          tableData={tableData}
          columns={STUDENTS_COLUMNS}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onExport={(selectedNodes) =>
            handleExportStudents({ nodes: selectedNodes })
          }
          selectedMap={selectedMap}
          onSelectedMapChange={setSelectedMap}
        />
      )}
    </>
  );
}
