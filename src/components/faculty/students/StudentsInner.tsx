"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import FilterBar from "@/components/ui/shared/FilterBar/FilterBar";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Large";
import { getStudentsColumns } from "@/data/faculty/studentsColumns";
import {
  useFacultyAllStudents,
  useFacultyOfferingList,
} from "@/hooks/faculty/useFacultyStudents";
import { buildStudentFilters } from "@/lib/utils/faculty/buildStudentFilters";
import { handleExport } from "@/lib/utils/faculty/handleExport";
import { FacultyStudent } from "@/types";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type StudentFilters = {
  course: string;
  status: string;
};

const initialFilters: StudentFilters = {
  course: "",
  status: "",
};

export default function StudentsInner() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<StudentFilters>(initialFilters);
  const [selectedMap, setSelectedMap] = useState<
    Map<string, FacultyStudent & { id: string }>
  >(new Map());

  const { data: offerings } = useFacultyOfferingList();

  const filterConfigs = useMemo(
    () => buildStudentFilters(offerings),
    [offerings],
  );

  function handleFilterChange(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }

  function handleClearAll() {
    setFilters(initialFilters);
    setPage(0);
  }

  const {
    data: studentsData,
    isPending,
    isError,
  } = useFacultyAllStudents({
    offeringId: filters.course || undefined,
    status: filters.status || undefined,
    page: page + 1,
    pageSize: 5,
    search: search || undefined,
  });

  const students = useMemo(() => studentsData?.data ?? [], [studentsData]);
  const totalPages = studentsData?.total_pages ?? 1;

   const columns = useMemo(
    () =>
      getStudentsColumns((id) => {
        router.push(`/faculty/students/${id}`);
      }),
    [router],
  );

  const tableData = useMemo(
    () => ({
      nodes: students.map((s) => ({ ...s, id: s.enrollment_id })),
    }),
    [students],
  );

  return (
    <>
      <h3 id="students-heading" className="title">
        My Students
      </h3>

      <FilterBar
        filters={filterConfigs}
        selectedValues={filters}
        onChange={handleFilterChange}
        onClear={handleClearAll}
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
          columns={columns}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onExport={(selectedNodes) => handleExport({ nodes: selectedNodes })}
          selectedMap={selectedMap}
          onSelectedMapChange={setSelectedMap}
        />
      )}
    </>
  );
}
