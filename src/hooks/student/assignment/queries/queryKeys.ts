export const studentAssignmentsKeys = {
  all: ["student", "assignments"] as const,
  list: (userId?: string) => [...studentAssignmentsKeys.all, userId] as const,
};
