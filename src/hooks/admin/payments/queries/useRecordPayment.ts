import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { recordStudentPayment } from "@/lib/services/admin/payments";
import { adminPaymentsKeys } from "./queryKeys";
import { RecordPaymentParams } from "@/types";

export function useRecordPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RecordPaymentParams) => recordStudentPayment(params),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        adminPaymentsKeys.summary(
          variables.studentId,
          variables.semester,
          variables.academicYear,
        ),
        data,
      );
      toast.success("Payment recorded successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to record payment");
    },
  });
}
