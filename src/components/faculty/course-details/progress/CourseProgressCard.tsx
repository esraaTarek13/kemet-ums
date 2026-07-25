"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import ProgressBar from "@/components/ui/shared/ProgressBar";
import AttendanceSkeletons from "@/components/ui/skeletons/AttendanceSkeletons";
import { useState } from "react";
import EditProgressModal from "./EditProgressModal";
import { useFacultyCourseDetail } from "@/hooks/faculty/courses/queries/useFacultyCourseDetail";

interface CourseProgressCardProps {
  courseId: string;
}

export default function CourseProgressCard({
  courseId,
}: CourseProgressCardProps) {
  const { data, isPending, isError } = useFacultyCourseDetail(courseId);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isPending) return <AttendanceSkeletons />;
  if (isError)
    return <ErrorMessage content="Failed to load course completion" />;

  const completionPercentage = data?.course.completion_percentage;

  return (
    <section aria-label="Course completion" className="card space-y-4">
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <h3 className="title">Course Completion</h3>
        <button
          type="button"
          aria-label="Edit course completion"
          className="btn btn-dark py-1"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </button>
      </div>

      <ProgressBar
        value={completionPercentage}
        textClass="text-text-secondary"
        progressClass="bg-accent"
      />

      <EditProgressModal
        offeringId={courseId}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </section>
  );
}
