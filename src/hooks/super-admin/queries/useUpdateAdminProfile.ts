import { updateAdminProfile } from "@/lib/services/super-admin/adminProfile";
import { UpdateAdminByAdminPayload } from "@/validation/updateAdminByAdmin.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { superAdminAdminsKeys } from "./queryKeys";

export function useUpdateAdminProfile(adminId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAdminByAdminPayload) =>
      updateAdminProfile(adminId, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(superAdminAdminsKeys.detail(adminId), data);
      queryClient.invalidateQueries({ queryKey: superAdminAdminsKeys.all });
      toast.success("Admin profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
