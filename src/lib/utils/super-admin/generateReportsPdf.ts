import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  AdminReportsResponse,
  FinancialReportsSummary,
  DepartmentPayment,
  PaymentStatusBreakdown,
} from "@/types";

interface GenerateReportsPdfParams {
  semester: string;
  academicYear: string;
  adminReports: AdminReportsResponse;
  financialSummary: FinancialReportsSummary;
  departmentPayments: DepartmentPayment[];
  paymentStatus: PaymentStatusBreakdown;
}

const HEAD_FILL: [number, number, number] = [80, 30, 40];
const ALT_ROW_FILL: [number, number, number] = [248, 244, 238];

function sectionTitle(doc: jsPDF, title: string, y: number): number {
  if (y > 265) {
    doc.addPage();
    y = 14;
  }
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(title, 14, y);
  return y;
}

function finalY(doc: jsPDF): number {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (doc as any).lastAutoTable.finalY + 12;
}

export function generateReportsPdf({
  semester,
  academicYear,
  adminReports,
  financialSummary,
  departmentPayments,
  paymentStatus,
}: GenerateReportsPdfParams) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // ── Header ──
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Reports & Analytics", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Semester: ${semester} | Academic Year: ${academicYear}`,
    pageWidth / 2,
    28,
    { align: "center" },
  );
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    pageWidth / 2,
    34,
    { align: "center" },
  );

  // ── Overview Stats ──
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Overview Stats", 14, 46);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const overview = [
    ["Total Enrollment", String(adminReports.stats.total_enrollment)],
    ["Average GPA", adminReports.stats.avg_gpa.toFixed(2)],
    ["Completion Rate", `${adminReports.stats.completion_rate}%`],
    ["Faculty/Student Ratio", adminReports.stats.faculty_student_ratio],
    ["Attendance Rate", `${adminReports.stats.attendance_rate}%`],
    ["Graduation Rate", `${adminReports.stats.graduation_rate}%`],
  ];
  overview.forEach(([label, value], i) => {
    doc.text(label, 14, 54 + i * 7);
    doc.text(value, 80, 54 + i * 7);
  });

  let y = 54 + overview.length * 7 + 8;

  // ── Enrollment Trend ──
  if (adminReports.enrollment_trend.length > 0) {
    y = sectionTitle(doc, "Enrollment Trend", y);
    autoTable(doc, {
      startY: y + 5,
      showHead: "firstPage",
      head: [["Semester", "Academic Year", "Count"]],
      body: adminReports.enrollment_trend.map((item) => [
        item.semester,
        item.academic_year,
        String(item.count),
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: HEAD_FILL, textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: ALT_ROW_FILL },
    });
    y = finalY(doc);
  }

  // ── GPA Distribution ──
  y = sectionTitle(doc, "GPA Distribution", y);
  autoTable(doc, {
    startY: y + 5,
    showHead: "firstPage",
    head: [["Range", "Students"]],
    body: [
      ["Below 2.0", String(adminReports.gpa_distribution.below_2)],
      ["2.0 - 2.5", String(adminReports.gpa_distribution["2_to_2_5"])],
      ["2.5 - 3.0", String(adminReports.gpa_distribution["2_5_to_3"])],
      ["3.0 - 3.5", String(adminReports.gpa_distribution["3_to_3_5"])],
      ["3.5 - 4.0", String(adminReports.gpa_distribution["3_5_to_4"])],
    ],
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: HEAD_FILL, textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: ALT_ROW_FILL },
  });
  y = finalY(doc);

  // ── Department Performance ──
  if (adminReports.department_performance.length > 0) {
    y = sectionTitle(doc, "Department Performance", y);
    autoTable(doc, {
      startY: y + 5,
      showHead: "firstPage",
      head: [
        ["Department", "Students", "Avg GPA", "Pass Rate", "Completion Rate"],
      ],
      body: adminReports.department_performance.map((dep) => [
        dep.department,
        String(dep.students),
        dep.avg_gpa.toFixed(2),
        `${dep.pass_rate}%`,
        `${dep.completion_rate}%`,
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: HEAD_FILL, textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: ALT_ROW_FILL },
    });
    y = finalY(doc);
  }

  // ── Financial Summary (New Page) ──
  doc.addPage();

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Financial Summary", 14, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const financial = [
    [
      "Total Collected",
      `$${financialSummary.total_collected.toLocaleString()}`,
    ],
    ["Students With Dues", String(financialSummary.students_with_dues)],
    ["Pending Payments", String(financialSummary.pending_payments)],
    ["Overdue Accounts", String(financialSummary.overdue_accounts)],
  ];
  financial.forEach(([label, value], i) => {
    doc.text(label, 14, 22 + i * 7);
    doc.text(value, 80, 22 + i * 7);
  });

  y = 22 + financial.length * 7 + 8;

  // ── Payments by Department ──
  if (departmentPayments.length > 0) {
    y = sectionTitle(doc, "Payments by Department", y);
    autoTable(doc, {
      startY: y + 5,
      showHead: "firstPage",
      head: [["Department", "Total Collected"]],
      body: departmentPayments.map((dep) => [
        dep.department,
        `$${dep.total_collected.toLocaleString()}`,
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: HEAD_FILL, textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: ALT_ROW_FILL },
    });
    y = finalY(doc);
  }

  // ── Payment Status Breakdown ──
  y = sectionTitle(doc, "Payment Status Breakdown", y);
  autoTable(doc, {
    startY: y + 5,
    showHead: "firstPage",
    head: [["Status", "Percentage"]],
    body: [
      ["Paid", `${paymentStatus.paid_pct}%`],
      ["Pending", `${paymentStatus.pending_pct}%`],
      ["Overdue", `${paymentStatus.overdue_pct}%`],
    ],
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: HEAD_FILL, textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: ALT_ROW_FILL },
  });

  const fileSafeSemester = semester.replace(/\s+/g, "_");
  doc.save(`Reports_${fileSafeSemester}.pdf`);
}