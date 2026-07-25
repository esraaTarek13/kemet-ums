import Input from "@/components/ui/shared/Input";
import TextareaInput from "@/components/ui/shared/TextareaInput";
import { useRecordPaymentForm } from "@/hooks/admin/payments/useRecordPaymentForm";
import { useStudentFinancialSummary } from "@/hooks/admin/payments/queries/useStudentFinancialSummary";
import { StudentSearchResult } from "@/types";
import { formatEGP } from "@/lib/utils/shared/currency";

interface PaymentFormProps {
  selectedStudent: StudentSearchResult | null;
  semester: string;
  academicYear: string;
  onPaymentSuccess?: () => void;
}

export default function PaymentForm({
  selectedStudent,
  semester,
  academicYear,
  onPaymentSuccess,
}: PaymentFormProps) {
  const canSubmit = Boolean(selectedStudent && semester && academicYear);

  const { data: summary } = useStudentFinancialSummary({
    studentId: selectedStudent?.id ?? "",
    semester,
    academicYear,
  });

  const { register, errors, isPending, onSubmit } = useRecordPaymentForm({
    studentId: selectedStudent?.id ?? "",
    semester,
    academicYear,
    onSuccess: () => {
      onPaymentSuccess?.();
    },
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 border-t border-border-card pt-5 md:pt-6"
    >
      {summary && (
        <div className="flex justify-between text-xs md:text-sm rounded-lg bg-bg-filter px-4 py-2.5">
          <span className="text-text-secondary font-medium">
            Remaining balance
          </span>
          <span className="font-bold text-accent">
            {formatEGP(summary.remaining)}
          </span>
        </div>
      )}

      <Input
        label="Amount (EGP)"
        type="text"
        placeholder="0.00"
        error={errors.amount?.message}
        {...register("amount")}
      />

      <TextareaInput
        label="Notes (optional)"
        placeholder="e.g. Paid at finance office"
        {...register("notes")}
      />

      <div className="flex justify-between items-center pt-5 border-t border-border">
        {!canSubmit && (
          <p className="text-text-secondary text-xs md:text-sm">
            Select a student, semester, and academic year first
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit || isPending}
          className="btn-dark btn py-2 disabled:opacity-60 ms-auto"
        >
          {isPending ? "Recording..." : "Record Payment"}
        </button>
      </div>
    </form>
  );
}
