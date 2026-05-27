import { useQuery } from "@tanstack/react-query";
import { searchUniversity } from "@/lib/services/admin/search";

// Fetches search results; skips the query until term is at least 2 chars
export function useSearch(term: string) {
  return useQuery({
    queryKey: ["search", term],
    queryFn: () => searchUniversity(term),
    enabled: term.trim().length >= 2, // avoid querying on empty/short input
    staleTime: 1000 * 30, // cache results for 30s
  });
}
