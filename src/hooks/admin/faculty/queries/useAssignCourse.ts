import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminFacultyKeys } from "./queryKeys";
import { adminCoursesKeys } from "@/hooks/admin/courses/queries/queryKeys";
import { assignCoursesToFaculty } from "@/lib/services/admin/facultyMutations";

export function useAssignCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      offeringIds,
      facultyId,
    }: {
      offeringIds: string[];
      facultyId: string;
    }) => assignCoursesToFaculty(facultyId, offeringIds),
    onSuccess: (result) => {
      if (result.failed_count > 0) {
        toast.warning(
          `${result.assigned_count} course(s) assigned, ${result.failed_count} failed`,
        );
      } else {
        toast.success(
          `${result.assigned_count} course(s) assigned successfully`,
        );
      }
      queryClient.invalidateQueries({ queryKey: adminFacultyKeys.all });
      queryClient.invalidateQueries({ queryKey: adminCoursesKeys.all });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
