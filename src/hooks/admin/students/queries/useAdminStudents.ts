import { getAdminStudents } from "@/lib/services/admin/students";
import { useQuery } from "@tanstack/react-query";
import { adminStudentsKeys } from "./queryKeys";

export function useAdminStudents(filters?: {
  department?: string;
  status?: string;
  year?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: adminStudentsKeys.list(filters),
    queryFn: () => getAdminStudents(filters),
    staleTime: 1000 * 60 * 2,
  });
}
