import { useQuery } from "@tanstack/react-query";
import {
  getAdminStudentsStats,
  getAdminStudents,
} from "@/lib/services/admin/students";

export function useAdminStudentsStats() {
  return useQuery({
    queryKey: ["admin-students-stats"],
    queryFn: getAdminStudentsStats,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminStudents(filters?: {
  department?: string;
  status?: string;
  year?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ["admin-students", filters],
    queryFn: () => getAdminStudents(filters),
    staleTime: 1000 * 60 * 2,
  });
}
