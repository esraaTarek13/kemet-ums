import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import FilterBar from "@/components/ui/shared/FilterBar/FilterBar";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Large";
import { FACULTY_COLUMNS } from "@/data/admin/facultyColumns";
import { useAdminFaculty } from "@/hooks/admin/useAdminFaculty";
import { useDepartments } from "@/hooks/shared/useDepartments";
import { buildFacultyFilters } from "@/lib/utils/admin/buildFacultyFilters";
import { handleExportFaculty } from "@/lib/utils/admin/handleExportFaculty";
import { AdminFaculty } from "@/types";
import { useMemo, useState } from "react";

type FacultyFilters = {
  department: string;
  status: string;
  rank: string;
};

const initialFilters = {
  department: "",
  status: "",
  rank: "",
};

export default function FacultyTableInner() {
  const [filters, setFilters] = useState<FacultyFilters>(initialFilters);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedMap, setSelectedMap] = useState<Map<string, AdminFaculty>>(
    new Map(),
  );

  const { data: departments, isPending: isDepartmentsPending } = useDepartments("faculty");

  const filterConfig = useMemo(
    () => buildFacultyFilters(departments),
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
    data: facultyData,
    isPending,
    isError,
  } = useAdminFaculty({
    department: filters.department || undefined,
    status: filters.status || undefined,
    rank: filters.rank || undefined,
    page: page + 1,
    pageSize: 5,
    search: search || undefined,
  });

  const totalPages = facultyData?.total_pages ?? 1;

  const tableData = useMemo(
    () => ({
      nodes: (facultyData?.data ?? []).map((f) => ({ ...f, id: f.id })),
    }),
    [facultyData],
  );

  if(isDepartmentsPending) return <TableSkeleton />;

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
        <ErrorMessage content="Failed to load Faculty." />
      ) : tableData.nodes.length === 0 ? (
        <p className="text-center text-text-subtle py-8">
          {search
            ? `No results found for "${search}"`
            : "No Faculty members yet."}
        </p>
      ) : (
        <Table
          tableData={tableData}
          columns={FACULTY_COLUMNS}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onExport={(selectedNodes) =>
            handleExportFaculty({ nodes: selectedNodes })
          }
          selectedMap={selectedMap}
          onSelectedMapChange={setSelectedMap}
        />
      )}
    </>
  );
}
