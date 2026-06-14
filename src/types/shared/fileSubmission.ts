import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface SubmitFormValues {
  file: FileList;
}

export interface FileSubmissionProps {
  register: UseFormRegister<SubmitFormValues>;
  errors: FieldErrors<SubmitFormValues>;
  watch: UseFormWatch<SubmitFormValues>;
  isPending: boolean;
}