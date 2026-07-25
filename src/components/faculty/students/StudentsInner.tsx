"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import FilterBar from "@/components/ui/shared/FilterBar/FilterBar";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Large";
import { useStudentsTable } from "@/hooks/faculty/students/useStudentsTable";

export default function StudentsInner() {
  const {
    page,
    setPage,
    search,
    updateSearch,
    filterConfigs,
    filters,
    updateFilter,
    clearFilters,
    selectedMap,
    setSelectedMap,
    isPending,
    isError,
    totalPages,
    columns,
    tableData,
    exportSelected,
  } = useStudentsTable();

  return (
    <>
      <h3 id="students-heading" className="title">
        My Students
      </h3>

      <FilterBar
        filters={filterConfigs}
        selectedValues={filters}
        onChange={updateFilter}
        onClear={clearFilters}
        searchValue={search}
        onSearchChange={updateSearch}
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
          onExport={exportSelected}
          selectedMap={selectedMap}
          onSelectedMapChange={setSelectedMap}
        />
      )}
    </>
  );
}
