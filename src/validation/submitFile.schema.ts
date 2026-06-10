import { z } from "zod";

const MAX_SIZE = 25 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const submitAssignmentSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Please select a file")
    .refine((files) => files?.[0]?.size <= MAX_SIZE, "Max file size is 25MB")
    .refine(
      (files) => ACCEPTED_TYPES.includes(files?.[0]?.type),
      "Only PDF, DOC, DOCX files are accepted",
    ),
});

export type SubmitFormValues = z.infer<typeof submitAssignmentSchema>;
