import { useQuery } from "@tanstack/react-query";
import { adminFacultyKeys } from "./queryKeys";
import { getAssignableOfferings } from "@/lib/services/admin/facultyProfile";

export function useAssignableOfferings(department: string, facultyId: string) {
  return useQuery({
    queryKey: adminFacultyKeys.assignableOfferings(department, facultyId),
    queryFn: () => getAssignableOfferings(department, facultyId),
    enabled: Boolean(department && facultyId),
  });
}
