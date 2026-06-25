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

export const addMaterialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Please select a file")
    .refine((files) => files?.[0]?.size <= MAX_SIZE, "Max file size is 25MB")
    .refine(
      (files) => ACCEPTED_TYPES.includes(files?.[0]?.type),
      "Only PDF, DOC, DOCX files are accepted",
    ),
});

export type AddMaterialFormValues = z.infer<typeof addMaterialSchema>;

export const addAssignmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  maxGrade: z
    .number({ message: "Max grade must be a number" })
    .min(5, "Max grade must be at least 5"),
});

export type AddAssignmentFormValues = z.infer<typeof addAssignmentSchema>;
