import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudentsColumns } from "@/data/admin/studentsColumns";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useAdminStudents } from "@/hooks/admin/students/queries/useAdminStudents";
import { useDepartments } from "@/hooks/shared/useDepartments";
import { useTableFilters } from "@/hooks/shared/useTableFilters";
import { buildStudentFilters } from "@/lib/utils/admin/buildStudentFilters";
import { handleExportStudents } from "@/lib/utils/admin/handleExportStudents";
import { useAuthStore } from "@/stores/authStore";
import { AdminStudent } from "@/types";

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

export function useStudentsTable() {
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

  const [selectedMap, setSelectedMap] = useState<Map<string, AdminStudent>>(
    new Map(),
  );

  const { data: departments, isPending: isDepartmentsPending } =
    useDepartments("courses");

  const filterConfig = useMemo(
    () => buildStudentFilters(departments),
    [departments],
  );

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

  const columns = useMemo(
    () => getStudentsColumns((id) => router.push(`${base}/students/${id}`)),
    [router, base],
  );

  const totalPages = students?.total_pages ?? 1;

  const tableData = useMemo(
    () => ({
      nodes: (students?.data ?? []).map((s) => ({ ...s, id: s.id })),
    }),
    [students],
  );

  function onExport(selectedNodes: AdminStudent[]) {
    handleExportStudents({ nodes: selectedNodes });
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