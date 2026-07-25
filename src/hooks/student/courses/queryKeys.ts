import { FilterStatus } from "@/types";

export const studentCoursesKeys = {
  all: ["student", "courses"] as const,
  list: (userId?: string, filter?: FilterStatus) =>
    [...studentCoursesKeys.all, userId ?? "", filter] as const,
  details: (userId?: string, courseId?: string) =>
    [...studentCoursesKeys.all, "details", userId ?? "", courseId] as const,
};
