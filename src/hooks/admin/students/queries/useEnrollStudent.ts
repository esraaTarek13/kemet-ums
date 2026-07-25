import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminStudentsKeys } from "./queryKeys";
import { enrollStudentInOfferings } from "@/lib/services/admin/studentMutations";

export function useEnrollStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollStudentInOfferings,
    onSuccess: (_, variables) => {
      toast.success("Student enrolled successfully");
      queryClient.invalidateQueries({
        queryKey: adminStudentsKeys.profileDetail(variables.studentId),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
