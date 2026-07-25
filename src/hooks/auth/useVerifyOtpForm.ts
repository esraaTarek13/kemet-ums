import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OtpSchema } from "@/validation/auth.schema";
import {
  useResendOtp,
  useVerifyOtp,
} from "@/hooks/auth/queries/useForgotPassword";

export function useVerifyOtpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
  });

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resend, isPending: isResending } = useResendOtp();

  const onSubmit = handleSubmit((data) => verifyOtp(data));

  return {
    control,
    errors,
    isVerifying,
    isResending,
    onSubmit,
    resend,
  };
}
