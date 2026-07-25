"use client";

import { useQuery } from "@tanstack/react-query";
import { getAcademicYears } from "@/lib/services/shared/academicYears";

export function useAcademicYears() {
  return useQuery({
    queryKey: ["shared", "academic-years"],
    queryFn: getAcademicYears,
  });
}
