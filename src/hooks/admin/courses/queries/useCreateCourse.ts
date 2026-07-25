import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCourse } from "@/lib/services/admin/courseMutations";
import { adminCoursesKeys } from "./queryKeys";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success("Course created successfully");
      queryClient.invalidateQueries({ queryKey: adminCoursesKeys.all });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
