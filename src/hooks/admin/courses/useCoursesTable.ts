"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCoursesColumns } from "@/data/admin/coursesColumns";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useAdminCourses } from "@/hooks/admin/courses/queries/useAdminCourses";
import { useDepartments } from "@/hooks/shared/useDepartments";
import { useTableFilters } from "@/hooks/shared/useTableFilters";
import { buildCourseFilters } from "@/lib/utils/admin/buildCourseFilters";
import { handleExportCourses } from "@/lib/utils/admin/handleExportCourses";
import { useAuthStore } from "@/stores/authStore";
import { AdminCourse } from "@/types";

type CourseFilters = {
  department: string;
  status: string;
};

const initialFilters: CourseFilters = {
  department: "",
  status: "",
};

export function useCoursesTable() {
  const router = useRouter();
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/admin";
  const [selectedMap, setSelectedMap] = useState<
    Map<string, AdminCourse & { id: string }>
  >(new Map());
  
  const {
    filters,
    page,
    search,
    setPage,
    handleFilterChange,
    handleFilterClear,
    handleSearchChange,
  } = useTableFilters<CourseFilters>(initialFilters);

  const { data: departments, isPending: isDepartmentsPending } =
    useDepartments("courses");

  const filterConfig = useMemo(
    () => buildCourseFilters(departments),
    [departments],
  );

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

  const columns = useMemo(
    () => getCoursesColumns((id) => router.push(`${base}/courses/${id}`)),
    [router, base],
  );

  const tableData = useMemo(
    () => ({
      nodes: (coursesData?.data ?? []).map((c) => ({
        ...c,
        id: c.offering_id,
      })),
    }),
    [coursesData],
  );

  function onExport(selectedNodes: (AdminCourse & { id: string })[]) {
    handleExportCourses({ nodes: selectedNodes });
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
