import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createStudent } from "@/lib/services/admin/studentMutations";
import { adminStudentsKeys } from "./queryKeys";

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,
    onSuccess: (student) => {
      toast.success(`Student created: ${student.student_code}`);
      queryClient.invalidateQueries({ queryKey: adminStudentsKeys.all });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
