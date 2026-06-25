import { searchStudent } from "@/lib/services/student/search";
import { useQuery } from "@tanstack/react-query";

export function useStudentSearch(term: string) {
  return useQuery({
    queryKey: ["student-search", term],
    queryFn: () => searchStudent(term),
    enabled: term.trim().length >= 2,
    staleTime: 1000 * 30,
  });
}