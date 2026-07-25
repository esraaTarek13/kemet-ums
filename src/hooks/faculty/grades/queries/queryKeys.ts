export const facultyGradesKeys = {
    all: ["faculty", "grades"] as const,
    list: (userId?: string, offeringId?: string) =>
        [...facultyGradesKeys.all, userId, offeringId] as const,
};