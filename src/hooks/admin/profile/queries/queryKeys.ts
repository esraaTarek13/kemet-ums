export const adminProfileKeys = {
  all: ["admin", "profile"] as const,
  detail: (userId?: string) => [...adminProfileKeys.all, userId] as const,
};
