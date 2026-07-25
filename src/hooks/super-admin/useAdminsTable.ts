"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminsColumns } from "@/data/super-admin/adminsColumns";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useAdminAdmins } from "@/hooks/super-admin/queries/useAdmins";
import { handleExportAdmins } from "@/lib/utils/super-admin/handleExportAdmins";
import { useAuthStore } from "@/stores/authStore";
import { AdminUser } from "@/types";

export function useAdminsTable() {
  const router = useRouter();
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/super-admin";

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

  const columns = useMemo(
    () => getAdminsColumns((id) => router.push(`${base}/admins/${id}`)),
    [router, base],
  );

  const totalPages = admins?.total_pages ?? 1;

  const tableData = useMemo(
    () => ({
      nodes: (admins?.data ?? []).map((admin) => ({ ...admin, id: admin.id })),
    }),
    [admins],
  );

  function updateSearch(value: string) {
    setSearch(value);
    setPage(0);
  }

  function exportSelected(selectedNodes: AdminUser[]) {
    handleExportAdmins({ nodes: selectedNodes });
  }

  return {
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
  };
}
