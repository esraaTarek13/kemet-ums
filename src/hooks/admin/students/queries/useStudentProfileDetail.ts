import { useQuery } from "@tanstack/react-query";
import { getStudentProfileDetail } from "@/lib/services/admin/studentProfile";
import { adminStudentsKeys } from "./queryKeys";

export function useStudentProfileDetail(studentId: string) {
  return useQuery({
    queryKey: adminStudentsKeys.profileDetail(studentId),
    queryFn: () => getStudentProfileDetail(studentId),
    enabled: Boolean(studentId),
  });
}
