export const facultyMessagesKeys = {
    all: ["faculty", "messages"] as const,
    list: (userId?: string) => [...facultyMessagesKeys.all, userId] as const,
    course: (courseId?: string) =>
        [...facultyMessagesKeys.all, "course", courseId] as const,
};