import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import SearchInput from "@/components/ui/shared/FilterBar/search/SearchInput";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Large";
import { useAdminsTable } from "@/hooks/super-admin/useAdminsTable";

export default function AdminsTable() {
  const {
    page,
    setPage,
    search,
    updateSearch,
    selectedMap,
    setSelectedMap,
    isPending,
    isError,
    totalPages,
    tableData,
    columns,
    exportSelected,
  } = useAdminsTable();

  return (
    <section
      aria-label="Admins"
      className="flex flex-col gap-5 md:gap-6 min-w-full w-0"
    >
      <SearchInput
        bgColor="bg-bg-filter"
        value={search}
        onChange={updateSearch}
      />

      {isPending ? (
        <TableSkeleton />
      ) : isError ? (
        <ErrorMessage content="Failed to load Admins." />
      ) : tableData.nodes.length === 0 ? (
        <p className="text-center text-text-subtle py-8">
          {search ? `No results found for "${search}"` : "No Admins found."}
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
    </section>
  );
}
