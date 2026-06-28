import { getFacultyAllStudents } from "@/lib/services/faculty/students";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export function useFacultyAllStudents() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-all-students", user?.id],
    queryFn: () => getFacultyAllStudents(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}