"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getFacultyColumns } from "@/data/admin/facultyColumns";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useAdminFaculty } from "@/hooks/admin/faculty/queries/useAdminFaculty";
import { useDepartments } from "@/hooks/shared/useDepartments";
import { useTableFilters } from "@/hooks/shared/useTableFilters";
import { buildFacultyFilters } from "@/lib/utils/admin/buildFacultyFilters";
import { handleExportFaculty } from "@/lib/utils/admin/handleExportFaculty";
import { useAuthStore } from "@/stores/authStore";
import { AdminFaculty } from "@/types";

type FacultyFilters = {
  department: string;
  status: string;
  rank: string;
};

const initialFilters: FacultyFilters = {
  department: "",
  status: "",
  rank: "",
};

export function useFacultyTable() {
  const router = useRouter();
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/admin";

  const {
    filters,
    page,
    search,
    setPage,
    handleFilterChange,
    handleFilterClear,
    handleSearchChange,
  } = useTableFilters(initialFilters);

  const [selectedMap, setSelectedMap] = useState<Map<string, AdminFaculty>>(
    new Map(),
  );

  const { data: departments, isPending: isDepartmentsPending } =
    useDepartments("courses");

  const filterConfig = useMemo(
    () => buildFacultyFilters(departments),
    [departments],
  );

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

  const columns = useMemo(
    () => getFacultyColumns((id) => router.push(`${base}/faculty/${id}`)),
    [router, base],
  );

  const totalPages = facultyData?.total_pages ?? 1;

  const tableData = useMemo(
    () => ({
      nodes: (facultyData?.data ?? []).map((f) => ({ ...f, id: f.id })),
    }),
    [facultyData],
  );

  function onExport(selectedNodes: AdminFaculty[]) {
    handleExportFaculty({ nodes: selectedNodes });
  }

  return {
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
  };
}