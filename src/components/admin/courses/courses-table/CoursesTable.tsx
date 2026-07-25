"use client";

import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import FilterBar from "@/components/ui/shared/FilterBar/FilterBar";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Large";
import { useCoursesTable } from "@/hooks/admin/courses/useCoursesTable";

export default function CoursesTable() {
  const {
    isDepartmentsPending,
    isPending,
    isError,
    filterConfig,
    filters,
    search,
    tableData,
    columns,
    page,
    totalPages,
    selectedMap,
    handleFilterChange,
    handleFilterClear,
    handleSearchChange,
    setPage,
    setSelectedMap,
    onExport,
  } = useCoursesTable();

  if (isDepartmentsPending) return <TableSkeleton />;

  return (
    <section
      aria-label="Courses"
      className="flex flex-col gap-5 md:gap-6 min-w-full w-0"
    >
      <FilterBar
        filters={filterConfig}
        selectedValues={filters}
        onChange={handleFilterChange}
        onClear={handleFilterClear}
        searchValue={search}
        onSearchChange={handleSearchChange}
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
          columns={columns}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onExport={onExport}
          selectedMap={selectedMap}
          onSelectedMapChange={setSelectedMap}
        />
      )}
    </section>
  );
}