import { useQuery } from "@tanstack/react-query";
import { getFacultyProfileDetail } from "@/lib/services/admin/facultyProfile";
import { adminFacultyKeys } from "./queryKeys";

export function useFacultyProfileDetail(facultyId: string) {
  return useQuery({
    queryKey: adminFacultyKeys.profileDetail(facultyId),
    queryFn: () => getFacultyProfileDetail(facultyId),
    enabled: Boolean(facultyId),
  });
}
