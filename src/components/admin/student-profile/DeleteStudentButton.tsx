"use client";
import ConfirmDialog from "@/components/ui/shared/ConfirmDialog";
import { useDeleteStudent } from "@/hooks/admin/students/queries/useDeleteStudent";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

interface DeleteStudentButtonProps {
  studentId: string;
  hasActiveCourses: boolean;
}

export default function DeleteStudentButton({
  studentId,
  hasActiveCourses,
}: DeleteStudentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useDeleteStudent();

  function handleConfirm() {
    if (hasActiveCourses) {
      setIsOpen(false);
      return;
    }
    mutate(studentId, {
      onSuccess: () => setIsOpen(false),
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Delete student"
        className="bg-danger-bg px-3 rounded-md border border-border text-danger text-lg md:text-xl shrink-0 cursor-pointer btn-light"
      >
        <FaTrashCan aria-hidden="true" />
      </button>

      <ConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={handleConfirm}
        isLoading={isPending}
        title={hasActiveCourses ? "Cannot Delete" : "Are you sure?"}
        description={
          hasActiveCourses
            ? "This student has active course assignments and cannot be deleted. Please reassign or remove their courses first."
            : "This will permanently delete this student's account. This action cannot be undone."
        }
        confirmLabel={hasActiveCourses ? "OK" : "Delete"}
        cancelLabel={hasActiveCourses ? undefined : "Cancel"}
        variant={hasActiveCourses ? "warning" : "danger"}
      />
    </>
  );
}
