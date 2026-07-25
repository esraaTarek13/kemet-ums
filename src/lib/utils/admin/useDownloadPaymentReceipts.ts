
import { useMutation } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { StudentPaymentHistory } from "@/types/admin/studentPayments";

function buildPaymentReceiptsPdf(history: StudentPaymentHistory): jsPDF {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Payment History", 14, 18);

  doc.setFontSize(11);
  doc.text(
    `${history.student.full_name} — ${history.student.student_number}`,
    14,
    26,
  );

  doc.setFontSize(10);
  doc.text(`Total Paid: $${history.summary.total_paid.toLocaleString()}`, 14, 34);
  doc.text(`Semesters Paid: ${history.summary.semesters_paid}`, 14, 40);

  autoTable(doc, {
    startY: 48,
    head: [["Semester", "Date", "Amount", "Notes", "Status"]],
    body: history.records.map((record) => [
      `${record.semester} ${record.academic_year}`,
      record.payment_date ?? "—",
      `$${record.amount.toLocaleString()}`,
      record.notes ?? "—",
      record.status.toUpperCase(),
    ]),
    theme: "striped",
    headStyles: { fillColor: [90, 15, 30] },
  });

  return doc;
}

export function useDownloadPaymentReceipts() {
  return useMutation({
    mutationFn: async (history: StudentPaymentHistory) => {
      const doc = buildPaymentReceiptsPdf(history);
      const fileName = `payment-history-${history.student.student_number}.pdf`;
      doc.save(fileName);
      return fileName;
    },
  });
}