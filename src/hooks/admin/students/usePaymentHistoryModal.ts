import { useMemo, useState } from "react";
import { useStudentPaymentHistory } from "@/hooks/admin/students/queries/useStudentPaymentHistory";
import { PaymentHistoryRow } from "@/data/admin/paymentHistoryColumns";

interface UsePaymentHistoryModalParams {
  studentId: string;
}

export function usePaymentHistoryModal({
  studentId,
}: UsePaymentHistoryModalParams) {
  const [open, setOpen] = useState(false);
  const { data } = useStudentPaymentHistory(studentId);

  const student = data?.student;
  const summary = data?.summary;

  const tableData = useMemo(
    () => ({
      nodes: (data?.records ?? []).map(
        (r): PaymentHistoryRow => ({
          ...r,
          id: `${r.semester}-${r.academic_year}`,
        }),
      ),
    }),
    [data],
  );

  const recordsCount = tableData.nodes.length;

  return {
    open,
    setOpen,
    student,
    summary,
    tableData,
    recordsCount,
  };
}
