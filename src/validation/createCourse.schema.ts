import { z } from "zod";

const DAY_OPTIONS = ["SU", "MO", "TU", "WE", "TH"] as const;

export const createCourseSchema = z.object({
  course_code: z.string().min(1, "Course code is required"),
  course_name: z.string().min(1, "Course name is required"),
  department: z.string().min(1, "Department is required"),
  course_type: z.string().min(1, "Course type is required"),
  credits: z
    .string()
    .min(1, "Credits is required")
    .transform((val) => Number(val))
    .pipe(z.number().positive("Credits must be greater than zero")),
  price: z
    .string()
    .min(1, "Price is required")
    .transform((val) => Number(val))
    .pipe(z.number().min(0, "Price cannot be negative")),
  description: z.string().optional(),

  // Offering fields — required so a course is never left without an offering
  faculty_id: z.string().min(1, "Faculty is required"),
  term: z.string().min(1, "Term is required"),
  academic_year: z.string().min(1, "Academic year is required"),
  day_of_week: z.array(z.enum(DAY_OPTIONS)).min(1, "Select at least one day"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  room: z.string().min(1, "Room is required"),
  max_students: z
    .string()
    .min(1, "Max students is required")
    .transform((val) => Number(val))
    .pipe(z.number().positive("Max students must be greater than zero")),
});

export type CreateCourseFormValues = z.input<typeof createCourseSchema>;
export type CreateCoursePayload = z.output<typeof createCourseSchema>;
