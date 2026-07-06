"use client";

import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import FilterBar from "@/components/ui/shared/FilterBar/FilterBar";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Large";
import { COURSES_COLUMNS } from "@/data/admin/coursesColumns";
import { useAdminCourses } from "@/hooks/admin/useAdminCourses";
import { useDepartments } from "@/hooks/shared/useDepartments";
import { buildCourseFilters } from "@/lib/utils/admin/buildCourseFilters";
import { handleExportCourses } from "@/lib/utils/admin/handleExportCourses";
import { AdminCourse } from "@/types";
import { useMemo, useState } from "react";

type FacultyFilters = {
  department: string;
  status: string;
};

const initialFilters = {
  department: "",
  status: "",
};

export default function CoursesTableInner() {
  const [filters, setFilters] = useState<FacultyFilters>(initialFilters);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedMap, setSelectedMap] = useState<
    Map<string, AdminCourse & { id: string }>
  >(new Map());

  const { data: departments, isPending: isDepartmentsPending } =
    useDepartments("courses");

  const filterConfig = useMemo(
    () => buildCourseFilters(departments),
    [departments],
  );

  function handleChange(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }

  function handleClear() {
    setFilters(initialFilters);
    setPage(0);
  }

  const {
    data: coursesData,
    isPending,
    isError,
  } = useAdminCourses({
    department: filters.department || undefined,
    status: filters.status || undefined,
    page: page + 1,
    pageSize: 5,
    search: search || undefined,
  });

  const totalPages = coursesData?.total_pages ?? 1;

  const tableData = useMemo(
    () => ({
      nodes: (coursesData?.data ?? []).map((c) => ({
        ...c,
        id: c.course_id,
      })),
    }),
    [coursesData],
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
        <ErrorMessage content="Failed to load Courses." />
      ) : tableData.nodes.length === 0 ? (
        <p className="text-center text-text-subtle py-8">
          {search ? `No results found for "${search}"` : "No Courses found."}
        </p>
      ) : (
        <Table
          tableData={tableData}
          columns={COURSES_COLUMNS}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onExport={(selectedNodes) =>
            handleExportCourses({ nodes: selectedNodes })
          }
          selectedMap={selectedMap}
          onSelectedMapChange={setSelectedMap}
        />
      )}
    </>
  );
}
