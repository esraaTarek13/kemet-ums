import { searchFaculty } from "@/lib/services/faculty/search";
import { useQuery } from "@tanstack/react-query";

export function useSearch(term: string) {
  return useQuery({
    queryKey: ["search", term],
    queryFn: () => searchFaculty(term),
    enabled: term.trim().length >= 2, // skip until 2+ chars
    staleTime: 1000 * 30,
  });
}