import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addAssignment,
  updateAssignment,
  deleteAssignment,
  getFacultyAssignments,
  getAssignmentSubmissions,
} from "@/lib/services/faculty/assignments";
import { AssignmentFormData, UpdateAssignmentData } from "@/types";
import { useAuthStore } from "@/stores/authStore";

export function useFacultyAssignments(search?: string) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-assignments", user?.id, search],
    queryFn: () => getFacultyAssignments(user?.id ?? "", search),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
  });
}

export function useAddAssignment(offeringId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssignmentFormData) => addAssignment(offeringId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-course-detail"] });
      toast.success("Assignment added successfully");
    },
    onError: (err: Error) =>
      toast.error(err.message ?? "Failed to add assignment"),
  });
}

export function useUpdateAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateAssignmentData) => updateAssignment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-course-detail"] });
      toast.success("Assignment updated successfully");
    },
    onError: (err: Error) =>
      toast.error(err.message ?? "Failed to update assignment"),
  });
}

export function useDeleteAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignmentId: string) => deleteAssignment(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-course-detail"] });
      toast.success("Assignment deleted");
    },
    onError: (err: Error) =>
      toast.error(err.message ?? "Failed to delete assignment"),
  });
}

export function useAssignmentSubmissions(assignmentId: string) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["assignment-submissions", assignmentId],
    queryFn: () => getAssignmentSubmissions(user?.id ?? "", assignmentId),
    enabled: !!user?.id && !!assignmentId,
    staleTime: 1000 * 60 * 2,
  });
}
