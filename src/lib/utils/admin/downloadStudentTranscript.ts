import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { StudentTranscript } from "@/types";

export const downloadTranscript = (data: StudentTranscript) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // ── Header ──
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Official Academic Transcript", pageWidth / 2, 20, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
    pageWidth / 2,
    28,
    { align: "center" },
  );

  // ── Student Info ──
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Student Information", 14, 42);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const info = [
    ["Full Name", data.header.full_name],
    ["Student Code", data.header.student_code],
    ["Department", data.header.department],
    [
      "Enrollment Date",
      data.header.enrollment_date
        ? new Date(data.header.enrollment_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
    ],
    [
      "Cumulative GPA",
      data.overall_gpa !== null ? data.overall_gpa.toFixed(2) : "PENDING",
    ],
  ];
  info.forEach(([label, value], i) => {
    doc.text(label, 14, 50 + i * 7);
    doc.text(value, 80, 50 + i * 7);
  });

  let cursorY = 50 + info.length * 7 + 10;

  // ── Semesters (each with its own header bar + table) ──
  data.semesters.forEach((semester) => {
    const credits = semester.courses.reduce((sum, c) => sum + c.credits, 0);
    const gpaLabel =
      semester.semester_gpa !== null
        ? semester.semester_gpa.toFixed(2)
        : "PENDING";

    // Page-break check before drawing a semester block
    if (cursorY > pageHeight - 40) {
      doc.addPage();
      cursorY = 20;
    }

    // Semester title bar
    doc.setFillColor(107, 39, 55); // accent
    doc.rect(14, cursorY, pageWidth - 28, 9, "F");

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(
      `${semester.semester} ${semester.academic_year}`,
      18,
      cursorY + 6.3,
    );

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(
      `GPA: ${gpaLabel}   Credits: ${credits}`,
      pageWidth - 18,
      cursorY + 6.3,
      { align: "right" },
    );

    doc.setTextColor(0, 0, 0);
    cursorY += 12;

    autoTable(doc, {
      startY: cursorY,
      showHead: "firstPage",
      head: [["Code", "Course Name", "Credits", "Grade", "Status"]],
      body: semester.courses.map((c) => [
        c.course_code,
        c.course_name,
        c.credits,
        c.grade ?? "—",
        c.status,
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: {
        fillColor: [74, 27, 38],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [248, 244, 238] },
      margin: { left: 14, right: 14 },
    });

    cursorY =
      (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY + 14;
  });

  doc.save(`${data.header.student_code}_transcript.pdf`);
};
