"use client";
import { useCreateCourse as useCreateCourseMutation } from "./queries/useCreateCourse";
import {
  CreateCourseFormValues,
  CreateCoursePayload,
  createCourseSchema,
} from "@/validation/createCourse.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useDepartments } from "@/hooks/shared/useDepartments";
import { useAcademicYears } from "@/hooks/shared/useAcademicYears";
import { useFacultyByDepartment } from "./queries/useFacultyByDepartment";
import { SEMESTER_TERM_OPTIONS } from "@/data/admin/SemesterOptions";

export function useCreateCourseForm(onSuccess?: () => void) {
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCourseFormValues, unknown, CreateCoursePayload>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: { day_of_week: [] },
  });

  const { mutate: createCourse, isPending } = useCreateCourseMutation();

  const { data: departments = [] } = useDepartments("courses");
  const departmentOptions = departments.map((dept) => ({
    label: dept,
    value: dept,
  }));

  const selectedDepartment = useWatch({ control, name: "department" });
  const { data: facultyOptions = [] } = useFacultyByDepartment(
    selectedDepartment ?? "",
  );

  const { data: academicYears = [] } = useAcademicYears();

  const onSubmit = handleSubmit((data) => {
    createCourse(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  });

  return {
    register,
    control,
    errors,
    isPending,
    onSubmit,
    departmentOptions,
    facultyOptions,
    academicYearOptions: academicYears,
    termOptions: SEMESTER_TERM_OPTIONS,
  };
}
