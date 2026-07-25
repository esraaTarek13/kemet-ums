export const facultyStudentsKeys = {
    all: ["faculty", "students"] as const,
    list: (
        userId?: string,
        filters?: {
            offeringId?: string;
            status?: string;
            search?: string;
            page?: number;
            pageSize?: number;
        },
    ) => [...facultyStudentsKeys.all, userId, filters] as const,
    offeringList: (userId?: string) =>
        [...facultyStudentsKeys.all, "offering-list", userId] as const,
    profile: (userId?: string, studentId?: string) =>
        [...facultyStudentsKeys.all, "profile", userId, studentId] as const,
};