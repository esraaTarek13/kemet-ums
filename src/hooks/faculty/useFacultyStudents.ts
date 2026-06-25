import { useQuery } from "@tanstack/react-query";
import { getFacultyStudents } from "@/lib/services/faculty/students";

export function useFacultyStudents(offeringId: string) {
  return useQuery({
    queryKey: ["faculty-students", offeringId],
    queryFn: () => getFacultyStudents(offeringId),
    enabled: !!offeringId,
    staleTime: 1000 * 60 * 5,
  });
}