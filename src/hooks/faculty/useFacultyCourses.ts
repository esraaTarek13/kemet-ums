import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFacultyCourses,
  getFacultyCourseDetail,
  updateCourseCompletion,
} from "@/lib/services/faculty/courses";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

export function useFacultyCourses() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-courses", user?.id],
    queryFn: () => getFacultyCourses(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFacultyCourseDetail(offeringId: string) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-course-detail", user?.id, offeringId],
    queryFn: () => getFacultyCourseDetail(user?.id ?? "", offeringId),
    enabled: !!user?.id && !!offeringId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateCourseCompletion() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      offeringId,
      completion,
    }: {
      offeringId: string;
      completion: number;
    }) => updateCourseCompletion(offeringId, completion),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faculty-courses", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["faculty-course-detail", user?.id],
      });
      toast.success("Course completion updated");
    },
    onError: (err: Error) =>
      toast.error(err.message ?? "Failed to update completion"),
  });
}
