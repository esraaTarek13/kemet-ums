export const facultyCoursesKeys = {
    all: ["faculty", "courses"] as const,
    list: (userId?: string, semester?: string, academicYear?: string) =>
        [...facultyCoursesKeys.all, userId, semester, academicYear] as const,
    detail: (userId?: string, offeringId?: string) =>
        ["faculty", "course-detail", userId, offeringId] as const,
};