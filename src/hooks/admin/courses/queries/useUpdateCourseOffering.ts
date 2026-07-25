import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCourseOffering } from "@/lib/services/admin/courseOfferingMutations";
import { adminCoursesKeys } from "./queryKeys";

export function useUpdateCourseOffering() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourseOffering,
    onSuccess: (_, variables) => {
      toast.success("Course offering updated successfully");
      queryClient.invalidateQueries({ queryKey: adminCoursesKeys.all });
      queryClient.invalidateQueries({
        queryKey: adminCoursesKeys.detail(variables.offeringId),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
