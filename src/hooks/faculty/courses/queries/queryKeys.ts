export const facultyCoursesKeys = {
    all: ["faculty", "courses"] as const,
    list: (userId?: string, semester?: string, academicYear?: string) =>
        [...facultyCoursesKeys.all, userId, semester, academicYear] as const,
    detailAll: ["faculty", "course-detail"] as const,
    detail: (userId?: string, offeringId?: string) =>
        [...facultyCoursesKeys.detailAll, userId, offeringId] as const,
};