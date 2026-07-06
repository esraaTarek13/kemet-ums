import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "@/lib/services/shared/departments";

export function useDepartments(
  entity: "courses" | "faculty" | "students" = "courses",
) {
  return useQuery({
    queryKey: ["departments", entity],
    queryFn: () => getDepartments(entity),
    staleTime: 1000 * 60 * 60,
  });
}
