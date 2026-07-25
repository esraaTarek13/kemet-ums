import { useStudentPaymentStatus } from "@/hooks/admin/students/queries/useStudentPaymentStatus";
import { mapToPaymentStatusDetails } from "@/lib/mappers/admin/mapToPaymentStatusDetails";
import { BadgeStatus } from "@/components/ui/shared/StatusBadge";

interface UsePaymentStatusCardParams {
  studentId: string;
}

export function usePaymentStatusCard({
  studentId,
}: UsePaymentStatusCardParams) {
  const { data } = useStudentPaymentStatus(studentId);

  const totalDue = Number(data?.total_due ?? 0);
  const totalPaid = Number(data?.total_paid ?? 0);
  const remaining = Number(data?.remaining ?? 0);

  const progressValue =
    totalDue > 0 ? Math.round((totalPaid / totalDue) * 100) : 0;

  const paymentStatus: BadgeStatus =
    totalPaid <= 0 ? "unpaid" : remaining <= 0 ? "paid" : "partial";

  const isFullyPaid = paymentStatus === "paid";

  const paymentDetails = mapToPaymentStatusDetails(data);

  return {
    semester: data?.semester,
    totalDue,
    totalPaid,
    remaining,
    progressValue,
    paymentStatus,
    isFullyPaid,
    paymentDetails,
  };
}
