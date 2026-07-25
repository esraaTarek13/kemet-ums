"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { PAYMENT_HISTORY_COLUMNS } from "@/data/admin/paymentHistoryColumns";
import Table from "@/components/ui/tables/Table.Small";
import { usePaymentHistoryModal } from "@/hooks/admin/students/usePaymentHistoryModal";

interface PaymentHistoryModalProps {
  studentId: string;
}

export default function PaymentHistoryModal({
  studentId,
}: PaymentHistoryModalProps) {
  const { open, setOpen, student, summary, tableData, recordsCount } =
    usePaymentHistoryModal({ studentId });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="text-xs md:text-sm font-bold text-accent cursor-pointer"
        >
          View Full Payment History
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-xl max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between pb-5 border-b border-border shrink-0">
            <div>
              <Dialog.Title className="title">Payment History</Dialog.Title>
              <Dialog.Description className="text-xs md:text-sm text-text-muted">
                {student?.full_name} — {student?.student_code}
              </Dialog.Description>
            </div>

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

          <div className="grid grid-cols-2 gap-4 py-5 shrink-0">
            <div className="bg-bg-navbar border border-border-card rounded-lg p-3 md:p-4">
              <p className="text-[10px] md:text-xs uppercase text-text-secondary">
                Total Paid
              </p>
              <p className="font-bold text-base md:text-lg text-text-primary">
                ${summary?.total_paid?.toLocaleString() ?? 0}
              </p>
            </div>

            <div className="bg-bg-navbar border border-border-card rounded-lg p-3 md:p-4">
              <p className="text-[10px] md:text-xs uppercase text-text-secondary">
                Semesters Paid
              </p>
              <p className="font-bold text-base md:text-lg text-text-primary">
                {summary?.semesters_paid ?? 0}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="card rounded-lg p-0 overflow-hidden">
              {recordsCount === 0 ? (
                <p className="text-center text-xs md:text-sm text-text-subtle py-8">
                  No payment records yet.
                </p>
              ) : (
                <Table
                  tableData={tableData}
                  columns={PAYMENT_HISTORY_COLUMNS}
                />
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
