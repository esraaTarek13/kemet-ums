import { getAdminFaculty, getAdminFacultyStats } from "@/lib/services/admin/faculty";
import { useQuery } from "@tanstack/react-query";

export function useAdminFacultyStats() {
  return useQuery({
    queryKey: ["admin-faculty-stats"],
    queryFn: getAdminFacultyStats,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminFaculty(filters?: {
  department?: string;
  status?: string;
  rank?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ["admin-faculty", filters],
    queryFn: () => getAdminFaculty(filters),
    staleTime: 1000 * 60 * 2,
  });
}