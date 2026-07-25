import { getAdminFaculty } from "@/lib/services/admin/faculty";
import { useQuery } from "@tanstack/react-query";
import { adminFacultyKeys } from "./queryKeys";

export function useAdminFaculty(filters?: {
  department?: string;
  status?: string;
  rank?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: adminFacultyKeys.list(filters),
    queryFn: () => getAdminFaculty(filters),
    staleTime: 1000 * 60 * 2,
  });
}