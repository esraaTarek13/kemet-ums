import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/validation/auth.schema";
import { useResetPassword } from "@/hooks/auth/queries/useResetPassword";

export function useResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  const onSubmit = handleSubmit((data) => resetPassword(data));

  return {
    register,
    errors,
    isPending,
    onSubmit,
  };
}
