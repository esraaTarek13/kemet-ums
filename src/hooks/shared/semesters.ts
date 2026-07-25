"use client";

import { useQuery } from "@tanstack/react-query";
import { getSemesters } from "@/lib/services/shared/semesters";

export function useSemesters() {
  return useQuery({
    queryKey: ["shared", "semesters"],
    queryFn: getSemesters,
  });
}
