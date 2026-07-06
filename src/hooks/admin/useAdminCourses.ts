import {
  getAdminCourses,
  getAdminCoursesStats,
} from "@/lib/services/admin/courses";
import { useQuery } from "@tanstack/react-query";

export function useAdminCoursesStats() {
  return useQuery({
    queryKey: ["admin-courses-stats"],
    queryFn: getAdminCoursesStats,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminCourses(filters?: {
  department?: string;
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ["admin-courses", filters],
    queryFn: () => getAdminCourses(filters),
    staleTime: 1000 * 60 * 2,
  });
}
