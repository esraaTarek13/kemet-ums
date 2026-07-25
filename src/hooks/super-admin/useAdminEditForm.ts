import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminProfileDetail } from "@/types";
import { useUpdateAdminProfile } from "./queries/useUpdateAdminProfile";
import {
  UpdateAdminByAdminFormValues,
  UpdateAdminByAdminPayload,
  updateAdminByAdminSchema,
} from "@/validation/updateAdminByAdmin.schema";

interface UseAdminEditFormParams {
  admin: AdminProfileDetail;
  onSuccess?: () => void;
}

export function useAdminEditForm({ admin, onSuccess }: UseAdminEditFormParams) {
  const { mutate, isPending } = useUpdateAdminProfile(admin.id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAdminByAdminFormValues, unknown, UpdateAdminByAdminPayload>(
    {
      resolver: zodResolver(updateAdminByAdminSchema),
      defaultValues: {
        full_name: admin.full_name,
        phone: admin.phone ?? "",
        nationality: admin.nationality ?? "",
        address: admin.address ?? "",
        status: admin.status,
      },
    },
  );

  const onSubmit = handleSubmit((payload) => {
    mutate(payload, {
      onSuccess: () => onSuccess?.(),
    });
  });

  return { register, control, errors, isPending, onSubmit };
}
