import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import SearchInput from "@/components/ui/shared/FilterBar/search/SearchInput";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Large";
import { ADMINS_COLUMNS } from "@/data/super-admin/adminsColumns";
import { useAdminAdmins } from "@/hooks/super-admin/useAdmins";
import { handleExportAdmins } from "@/lib/utils/super-admin/handleExportAdmins";
import { AdminUser } from "@/types";
import { useMemo, useState } from "react";

export default function AdminsTableInner() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedMap, setSelectedMap] = useState<
    Map<string, AdminUser & { id: string }>
  >(new Map());

  const {
    data: admins,
    isPending,
    isError,
  } = useAdminAdmins({ page: page + 1, pageSize: 5, search });

  const totalPages = admins?.total_pages ?? 1;

  const tableData = useMemo(
    () => ({
      nodes: (admins?.data || []).map((admin) => ({ ...admin, id: admin.id })),
    }),
    [admins],
  );

  return (
    <>
      <SearchInput
        bgColor="bg-bg-filter"
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(0);
        }}
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
          columns={ADMINS_COLUMNS}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onExport={(selectedNodes) =>
            handleExportAdmins({ nodes: selectedNodes })
          }
          selectedMap={selectedMap}
          onSelectedMapChange={setSelectedMap}
        />
      )}
    </>
  );
}
