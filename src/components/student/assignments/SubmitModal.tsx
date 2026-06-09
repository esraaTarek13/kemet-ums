import FileSubmission from "@/components/ui/FileSubmission";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />

        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-full max-w-lg"
        >
          <div className="flex items-center justify-between pb-5 border-b border-border">
            <Dialog.Title className="title">Submit Assignment</Dialog.Title>

            {/* Dialog.Close handles closing + accessibility — no need for manual onClick */}
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

          <FileSubmission />

          <div className="flex items-center justify-between gap-2 flex-wrap pt-6 border-t border-border mt-6 text-end">
            <span className="font-bold text-[10px] md:text-xs text-text-muted uppercase">Max File Size: 25MB</span>
            <button
              type="submit"
              className="btn-dark bg-accent border border-accent rounded-md font-semibold text-text-white text-sm md:text-base py-2 px-5 md:px-8 cursor-pointer disabled:opacity-50"
            >
              Submit Assignment
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
