import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCourseOffering } from "@/lib/services/admin/courseOfferingMutations";
import { adminCoursesKeys } from "./queryKeys";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";

export function useDeleteCourseOffering() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/admin";

  return useMutation({
    mutationFn: deleteCourseOffering,
    onSuccess: () => {
      toast.success("Course offering deleted successfully");
      queryClient.invalidateQueries({ queryKey: adminCoursesKeys.all });
      router.push(`${base}/courses`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
