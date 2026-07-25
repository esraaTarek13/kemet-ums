export const studentMessagesKeys = {
  all: ["student", "messages"] as const,
  list: (userId?: string) => [...studentMessagesKeys.all, userId] as const,
  course: (courseId?: string) =>
    [...studentMessagesKeys.all, "course", courseId] as const,
};