"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import AddStudentForm from "./AddStudentForm";
import { useState } from "react";
import { useCreateStudentForm } from "@/hooks/admin/students/useCreateStudentForm";

export default function AddStudentModal() {
  const [open, setOpen] = useState(false);
  const { register, control, errors, isPending, onSubmit, departmentOptions } =
    useCreateStudentForm(() => setOpen(false));

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="btn btn-dark flex items-center gap-2 py-2"
        >
          <FiPlus className="text-sm md:text-xl shrink-0" />
          <span className="text-sm md:text-base hidden sm:block">
            Add New Student
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg max-h-[90vh] flex flex-col"
        >
          <div className="flex items-center justify-between pb-5 border-b border-border shrink-0">
            <Dialog.Title className="title">Add New Student</Dialog.Title>
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

          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="w-full my-6 space-y-5 overflow-y-auto flex-1 pr-2">
              <AddStudentForm
                register={register}
                control={control}
                errors={errors}
                departmentOptions={departmentOptions}
              />
            </div>

            <div className="pt-6 border-t border-border mt-6 text-end">
              <button
                type="submit"
                disabled={isPending}
                className="btn-dark btn py-2 disabled:opacity-50"
              >
                {isPending ? "Adding..." : "Add Student"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
