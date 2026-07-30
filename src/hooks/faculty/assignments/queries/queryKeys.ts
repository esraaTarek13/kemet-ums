export const facultyAssignmentsKeys = {
  all: ["faculty", "assignments"] as const,
  list: (userId?: string, search?: string) =>
    [...facultyAssignmentsKeys.all, "list", userId, search] as const,
  submissions: (assignmentId?: string) =>
    [...facultyAssignmentsKeys.all, "submissions", assignmentId] as const,
};