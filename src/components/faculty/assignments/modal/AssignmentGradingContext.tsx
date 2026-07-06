"use client";

import { createContext, useContext, ReactNode } from "react";

interface AssignmentGradingContextValue {
  assignmentId: string;
  maxGrade: number;
}
interface AssignmentGradingProviderProps extends AssignmentGradingContextValue {
  children: ReactNode;
}

const AssignmentGradingContext =
  createContext<AssignmentGradingContextValue | null>(null);

export function AssignmentGradingProvider({
  assignmentId,
  maxGrade,
  children,
}: AssignmentGradingProviderProps) {
  return (
    <AssignmentGradingContext.Provider value={{ assignmentId, maxGrade }}>
      {children}
    </AssignmentGradingContext.Provider>
  );
}

export function useAssignmentGradingContext() {
  const ctx = useContext(AssignmentGradingContext);
  if (!ctx)
    throw new Error(
      "useAssignmentGradingContext must be used within an AssignmentGradingProvider",
    );
  return ctx;
}
