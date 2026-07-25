export const facultyAssignmentsKeys = {
    all: ["faculty", "assignments"] as const,
    list: (userId?: string, search?: string) =>
        [...facultyAssignmentsKeys.all, userId, search] as const,
    submissions: (assignmentId?: string) =>
        ["faculty", "assignment-submissions", assignmentId] as const,
};