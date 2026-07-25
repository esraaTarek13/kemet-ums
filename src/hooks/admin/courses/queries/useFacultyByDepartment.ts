"use client";

import { getFacultyByDepartment } from "@/lib/services/admin/getFacultyByDepartment";
import { useQuery } from "@tanstack/react-query";

export function useFacultyByDepartment(department: string) {
  return useQuery({
    queryKey: ["shared", "faculty-by-department", department],
    queryFn: () => getFacultyByDepartment(department),
    enabled: Boolean(department),
  });
}
