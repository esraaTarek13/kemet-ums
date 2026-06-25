import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFacultySubmissions,
  gradeSubmission,
} from "@/lib/services/faculty/submissions";

export function useFacultySubmissions(assignmentId: string) {
  return useQuery({
    queryKey: ["faculty-submissions", assignmentId],
    queryFn: () => getFacultySubmissions(assignmentId),
    enabled: !!assignmentId,
    staleTime: 1000 * 60 * 2,
  });
}

export function useGradeSubmission(assignmentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      grade,
      feedback,
    }: {
      submissionId: string;
      grade: string;
      feedback?: string;
    }) => gradeSubmission(submissionId, grade, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faculty-submissions", assignmentId],
      });
    },
  });
}
