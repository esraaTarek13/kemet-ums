import {
  getFacultyAllStudents,
  getFacultyOfferingList,
  getFacultyStudentProfile,
} from "@/lib/services/faculty/students";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export function useFacultyAllStudents(filters?: {
  offeringId?: string;
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-all-students", user?.id, filters],
    queryFn: () => getFacultyAllStudents(user?.id ?? "", filters),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFacultyOfferingList() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-offering-list", user?.id],
    queryFn: () => getFacultyOfferingList(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 10,
  });
}

export function useFacultyStudentProfile(studentId: string) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-student-profile", user?.id, studentId],
    queryFn: () => getFacultyStudentProfile(user?.id ?? "", studentId),
    enabled: !!user?.id && !!studentId,
    staleTime: 1000 * 60 * 5,
  });
}
