import { useQuery } from "@tanstack/react-query";
import { searchUniversity } from "@/lib/services/admin/search";

// Skips query until term is at least 2 characters
export function useSearch(term: string) {
  return useQuery({
    queryKey: ["search", term],
    queryFn: () => searchUniversity(term),
    enabled: term.trim().length >= 2,
    staleTime: 1000 * 30, // 30s
  });
}
