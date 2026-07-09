import { useGradeSubmission } from "@/hooks/faculty/useSubmissions";
import {
  SubmissionGradeFormValues,
  getSubmissionGradeSchema,
} from "@/validation/submissionGrade.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

interface UseGradeSubmissionFormProps {
  assignmentId: string;
  submissionId: string;
  maxGrade: number;
  grade: number | null;
  feedback: string | null;
  onSaved?: () => void;
}

export function useGradeSubmissionForm({
  assignmentId,
  submissionId,
  maxGrade,
  grade,
  feedback,
  onSaved,
}: UseGradeSubmissionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmissionGradeFormValues>({
    resolver: zodResolver(getSubmissionGradeSchema(maxGrade)),
    defaultValues: {
      grade: grade ?? undefined,
      feedback: feedback ?? "",
    },
  });

  const { mutate, isPending } = useGradeSubmission(assignmentId);

  const onSubmit = useCallback(
    (values: SubmissionGradeFormValues) => {
      mutate(
        {
          submissionId,
          grade: values.grade,
          feedback: values.feedback ?? "",
        },
        {
          onSuccess: () => onSaved?.(),
        },
      );
    },
    [mutate, submissionId, onSaved],
  );

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  };
}
