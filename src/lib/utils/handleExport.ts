import { FacultyStudent } from "@/types";

export function handleExport(tableData: { nodes: (FacultyStudent & { id: string })[] }) {
  const headers = ["Student Name", "ID", "Course", "Attendance", "Grade", "Status"];
  
  const rows = tableData.nodes.map((s) => [
    s.full_name ?? "—",
    s.student_code ?? "—",
    s.course_code ?? "—",
    s.attendance_rate != null ? `${s.attendance_rate}%` : "—",
    s.grade ?? "—",
    s.enrollment_status ?? "—",
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.csv";
  a.click();
  URL.revokeObjectURL(url);
}