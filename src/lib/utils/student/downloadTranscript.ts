import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { StudentGrades } from "@/types";

export const downloadTranscript = (data: StudentGrades) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // ── Header ──
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Official Academic Transcript", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
    pageWidth / 2,
    28,
    { align: "center" }
  );

  // ── Summary ──
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Academic Summary", 14, 42);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const summary = [
    ["Cumulative GPA", `${data.cumulative_gpa.toFixed(2)}`],
    ["Semester GPA", `${data.semester_gpa.toFixed(2)}`],
    ["Total Credits", `${data.total_credits}`],
    ["Academic Standing", data.standing],
  ];
  summary.forEach(([label, value], i) => {
    doc.text(label, 14, 50 + i * 7);
    doc.text(value, 80, 50 + i * 7);
  });

  // ── Completed Courses ──
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Completed Courses", 14, 90);

  const completed = data.courses.filter((c) => c.status === "completed");

  autoTable(doc, {
    startY: 95,
    showHead: "firstPage",
    head: [["Code", "Course Name", "Credits", "Quiz", "Final", "Grade"]],
    body: completed.map((c) => [
      c.course_code,
      c.course_name,
      c.credits,
      c.quiz ?? "—",
      c.final ?? "—",
      c.grade ?? "—",
    ]),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [80, 30, 40], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 244, 238] },
  });

  // ── Active Courses (New Page) ──
  doc.addPage();

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Current Courses", 14, 14);

  const active = data.courses.filter((c) => c.status === "active");

  autoTable(doc, {
    startY: 20,
    showHead: "firstPage",
    head: [["Code", "Course Name", "Credits", "Quiz", "Instructor"]],
    body: active.map((c) => [
      c.course_code,
      c.course_name,
      c.credits,
      c.quiz ?? "—",
      c.faculty_name,
    ]),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [100, 100, 100], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 244, 238] },
  });

  doc.save("transcript.pdf");
};