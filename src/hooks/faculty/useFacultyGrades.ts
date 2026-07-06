import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import {
  getFacultyGrades,
  updateStudentGrade,
} from "@/lib/services/faculty/grades";
import { UpdateGradeData } from "@/types/faculty/grades";

export function useFacultyGrades(offeringId: string) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-grades", user?.id, offeringId],
    queryFn: () => getFacultyGrades(user?.id ?? "", offeringId),
    enabled: !!user?.id && !!offeringId,
    staleTime: 1000 * 60 * 2,
  });
}

export function useUpdateStudentGrade() {
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (data: UpdateGradeData) =>
      updateStudentGrade(user?.id ?? "", data.enrollmentId, {
        quiz: data.quiz,
        midterm: data.midterm,
        final: data.final,
      }),
  });
}
