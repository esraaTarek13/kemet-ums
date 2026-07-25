import { getAdminCourses } from "@/lib/services/admin/courses";
import { useQuery } from "@tanstack/react-query";
import { adminCoursesKeys } from "./queryKeys";

export function useAdminCourses(filters?: {
  department?: string;
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: adminCoursesKeys.list(filters),
    queryFn: () => getAdminCourses(filters),
    staleTime: 1000 * 60 * 2,
  });
}
