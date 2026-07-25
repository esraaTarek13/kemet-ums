import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/validation/auth.schema";
import { useForgotPassword } from "@/hooks/auth/queries/useForgotPassword";

export function useForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate: sendOtp, isPending } = useForgotPassword();

  const onSubmit = handleSubmit((data) => sendOtp(data));

  return {
    register,
    errors,
    isPending,
    onSubmit,
  };
}
