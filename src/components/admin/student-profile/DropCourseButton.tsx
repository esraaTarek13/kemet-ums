"use client";
import ConfirmDialog from "@/components/ui/shared/ConfirmDialog";
import { useDropEnrollment } from "@/hooks/admin/students/queries/useDropEnrollment";
import { useState } from "react";
import { MdRemoveCircleOutline } from "react-icons/md";

interface DropCourseButtonProps {
  enrollmentId: string;
  studentId: string;
  courseName: string;
  hasGrade: boolean;
}

export default function DropCourseButton({
  enrollmentId,
  studentId,
  courseName,
  hasGrade,
}: DropCourseButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useDropEnrollment(studentId);

  function handleConfirm() {
    if (hasGrade) {
      setIsOpen(false);
      return;
    }
    mutate(enrollmentId, {
      onSuccess: () => setIsOpen(false),
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Drop ${courseName}`}
        className="text-danger hover:text-danger/80 cursor-pointer"
      >
        <MdRemoveCircleOutline aria-hidden="true" size={18} />
      </button>

      <ConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={handleConfirm}
        isLoading={isPending}
        title={hasGrade ? "Cannot Drop Course" : "Drop this course?"}
        description={
          hasGrade
            ? `A grade has already been recorded for ${courseName}, so it can't be dropped.`
            : `This will drop the student from ${courseName}. This action cannot be undone.`
        }
        confirmLabel={hasGrade ? "OK" : "Drop Course"}
        cancelLabel={hasGrade ? undefined : "Cancel"}
        variant={hasGrade ? "warning" : "danger"}
      />
    </>
  );
}
