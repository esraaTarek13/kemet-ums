"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import CourseAssignmentItem from "./CourseAssignmentItem";
import AddAssignmentModal from "./AddAssignmentModal";
import { useState } from "react";
import { useDeleteAssignment } from "@/hooks/faculty/courses/queries/useDeleteAssignment";
import { useFacultyCourseDetail } from "@/hooks/faculty/courses/queries/useFacultyCourseDetail";

interface CourseAssignmentsCardProps {
  courseId: string;
}

export default function CourseAssignmentsCard({
  courseId,
}: CourseAssignmentsCardProps) {
  const { data, isPending, isError } = useFacultyCourseDetail(courseId);
  const { mutate: deleteAssignment } = useDeleteAssignment();
  const [addAssignmentOpen, setAddAssignmentOpen] = useState(false);

  if (isPending) return <CourseCardSkeleton length={1} />;
  if (isError) return <ErrorMessage content="Failed to load assignments." />;

  const courseAssignments = data?.assignments ?? [];

  return (
    <section
      aria-label="Course assignments"
      className="card-top-border space-y-5 md:space-y-6 px-0"
    >
      <div className="flex justify-between items-center gap-2 flex-wrap border-b border-border pb-4 px-4">
        <h3 className="title">Course Assignments</h3>
        <button
          type="button"
          aria-label="Add new assignment"
          onClick={() => setAddAssignmentOpen(true)}
          className="btn btn-dark py-2"
        >
          Add Assignment
        </button>
      </div>

      {courseAssignments.length > 0 ? (
        <ul className="px-4 space-y-5 md:space-y-6">
          {courseAssignments.map((assignment) => (
            <CourseAssignmentItem
              key={assignment.id}
              assignment={assignment}
              onDelete={() => deleteAssignment(assignment.id)}
            />
          ))}
        </ul>
      ) : (
        <p
          role="status"
          className="text-text-muted col-span-full text-center py-10"
        >
          No assignments yet.
        </p>
      )}

      <AddAssignmentModal
        offeringId={courseId}
        isOpen={addAssignmentOpen}
        onClose={() => setAddAssignmentOpen(false)}
      />
    </section>
  );
}
