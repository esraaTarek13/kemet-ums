"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import FilterBar from "@/components/ui/shared/FilterBar/FilterBar";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Large";
import { STUDENTS_COLUMNS } from "@/data/faculty/studentsColumns";
import { useFacultyAllStudents } from "@/hooks/faculty/useFacultyStudents";
import { mapToStudentFilters } from "@/lib/mappers/faculty/mapToStudentFilters";
import { useMemo, useState } from "react";

export default function StudentsInner() {
  const { data: students, isPending, isError } = useFacultyAllStudents();
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});

  function handleFilterChange(key: string, value: string) {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleClearAll() {
    setSelectedFilters({});
  }

  // count unique students and active courses from raw data
  const { uniqueStudents, activeCourses } = useMemo(
    () => ({
      uniqueStudents: students
        ? new Set(students.map((s) => s.student_id)).size
        : 0,
      activeCourses: students
        ? new Set(students.map((s) => s.course_code)).size
        : 0,
    }),
    [students],
  );

  // build filter options dynamically from data
  const filterConfigs = useMemo(
    () => mapToStudentFilters(students),
    [students],
  );

  // filter and sort: active students first
  const filteredStudents = useMemo(() => {
    if (!students) return [];
    return students
      .filter((s) => {
        const courseMatch =
          !selectedFilters.course || s.course_code === selectedFilters.course;
        const gradeMatch =
          !selectedFilters.grade || s.grade === selectedFilters.grade;
        return courseMatch && gradeMatch;
      })
      .sort((a, b) => {
        if (a.enrollment_status === b.enrollment_status) return 0;
        return a.enrollment_status === "active" ? -1 : 1;
      });
  }, [students, selectedFilters]);

  // add unique id required by the table library
  const tableData = useMemo(
    () => ({
      nodes: filteredStudents.map((s, index) => ({
        ...s,
        id: `${s.enrollment_id}-${index}`,
      })),
    }),
    [filteredStudents],
  );

  if (isPending) return <TableSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load Students." />;

  return (
    <>
      <section aria-labelledby="students-heading">
        <h3 id="students-heading" className="title">
          My Students
        </h3>
        <p className="text-text-secondary text-sm md:text-base lg:text-lg">
          <span aria-live="polite">
            {uniqueStudents} students across {activeCourses} active courses
          </span>
        </p>
      </section>

      <FilterBar
        filters={filterConfigs}
        selectedValues={selectedFilters}
        onChange={handleFilterChange}
        onClear={handleClearAll}
      />

      <Table tableData={tableData} columns={STUDENTS_COLUMNS} />
    </>
  );
}
