import ConfirmDialog from "@/components/ui/shared/ConfirmDialog";
import { useDeleteCourseOffering } from "@/hooks/admin/courses/queries/useDeleteCourseOffering";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

interface DeleteCourseProps {
  offeringId: string;
}

export default function DeleteCourse({ offeringId }: DeleteCourseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useDeleteCourseOffering();

  function handleConfirm() {
    mutate(offeringId, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-danger-bg px-3 rounded-md border border-border text-danger text-lg md:text-xl shrink-0 cursor-pointer btn-light"
      >
        <FaTrashCan aria-hidden="true" />
      </button>

      <ConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={handleConfirm}
        isLoading={isPending}
        title="Are you sure?"
        description="This will permanently delete this course offering. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />
    </>
  );
}
