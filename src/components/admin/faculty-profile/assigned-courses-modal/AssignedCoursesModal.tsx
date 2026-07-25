"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useAssignCourseForm } from "@/hooks/admin/faculty/useAssignCourseForm";
import AssignCourseFields from "./AssignCourseFields";

interface AssignedCoursesModalProps {
  facultyId: string;
  facultyName: string;
  department: string;
}

export default function AssignedCoursesModal({
  facultyId,
  facultyName,
  department,
}: AssignedCoursesModalProps) {
  const [open, setOpen] = useState(false);
  const { control, errors, isPending, onSubmit } = useAssignCourseForm({
    facultyId,
    onSuccess: () => setOpen(false),
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 text-text-secondary cursor-pointer"
        >
          <FiPlus aria-hidden="true" className="text-sm md:text-lg shrink-0" />
          <span className="font-semibold text-sm md:text-base">
            Assign Course
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />
        
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between pb-5 border-b border-border shrink-0">
            <Dialog.Title className="title">Assign Course</Dialog.Title>
            {/* a11y: real description read by screen readers instead of suppressing the warning */}
            <Dialog.Description className="sr-only">
              Select one or more courses to assign to {facultyName}
            </Dialog.Description>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close modal"
                className="text-text-subtle text-2xl cursor-pointer"
              >
                <IoClose aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <p className="text-xs md:text-sm text-text-secondary py-3">
            <span>Select a course to assign to</span>
            <span className="font-bold text-accent pl-1.5">{facultyName}</span>
          </p>

          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="w-full mb-2 space-y-1 overflow-y-auto flex-1 pr-2 max-h-96">
              <AssignCourseFields
                department={department}
                facultyId={facultyId}
                control={control}
                errors={errors}
              />
            </div>

            <div className="pt-6 border-t border-border mt-6 text-end">
              <button
                type="submit"
                disabled={isPending}
                className="btn-dark btn py-2 disabled:opacity-50"
              >
                {isPending ? "Assigning..." : "Assign Course"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
