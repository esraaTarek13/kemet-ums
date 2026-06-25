import { FieldErrors, UseFormRegister, UseFormWatch, FieldValues } from "react-hook-form";

export interface FileSubmissionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  isPending: boolean;
}