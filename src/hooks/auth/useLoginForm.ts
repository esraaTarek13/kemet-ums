import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginRole } from "@/types/shared/auth";
import { loginSchema, LoginSchema } from "@/validation/auth.schema";
import { useLogin } from "@/hooks/auth/queries/useLogin";

export function useLoginForm() {
  const [selectedRole, setSelectedRole] = useState<LoginRole>("student");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "student" },
  });

  const { mutate: login, isPending } = useLogin();

  function selectRole(role: LoginRole) {
    setSelectedRole(role);
    setValue("role", role);
  }

  const onSubmit = handleSubmit((data) => login(data));

  return {
    register,
    errors,
    selectedRole,
    selectRole,
    isPending,
    onSubmit,
  };
}
