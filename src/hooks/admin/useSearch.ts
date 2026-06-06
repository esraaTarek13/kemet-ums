import { useQuery } from "@tanstack/react-query";
import { searchUniversity } from "@/lib/services/admin/search";

export function useSearch(term: string) {
  return useQuery({
    queryKey: ["search", term],
    queryFn: () => searchUniversity(term),
    enabled: term.trim().length >= 2, // skip until 2+ chars
    staleTime: 1000 * 30, // 30s
  });
}