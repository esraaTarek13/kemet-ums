import { createAdmin } from "@/lib/services/super-admin/adminMutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { superAdminAdminsKeys } from "./queryKeys";

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdmin,
    onSuccess: (admin) => {
      toast.success(`Admin created: ${admin.admin_code}`);
      queryClient.invalidateQueries({ queryKey: superAdminAdminsKeys.all });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
